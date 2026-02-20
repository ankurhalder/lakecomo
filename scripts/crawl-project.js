import {
  readFileSync,
  readdirSync,
  writeFileSync,
  statSync,
  existsSync,
  unlinkSync,
  copyFileSync,
} from "fs";
import { join, relative, basename, extname } from "path";
import { execSync } from "child_process";

const projectRoot = process.cwd();
const gitignorePath = join(projectRoot, ".gitignore");
const outputPath = join(projectRoot, "complete-codebase.txt");

const SKIP_EXTENSIONS = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".svg",
  ".ico",
  ".webp",
  ".bmp",
  ".tiff",
  ".pdf",
  ".zip",
  ".tar",
  ".gz",
  ".rar",
  ".7z",
  ".woff",
  ".woff2",
  ".ttf",
  ".eot",
  ".otf",
  ".mp3",
  ".mp4",
  ".wav",
  ".avi",
  ".mov",
  ".exe",
  ".dll",
  ".so",
  ".dylib",
]);

const SKIP_FILES = new Set([
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "complete-codebase.txt",
]);

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_DEPTH = 25;

function validatePrerequisites() {
  if (!existsSync(projectRoot)) {
    console.error(`❌ ERROR: Project root does not exist: ${projectRoot}`);
    process.exit(1);
  }

  if (!existsSync(gitignorePath)) {
    console.warn(`⚠️  WARNING: .gitignore not found at ${gitignorePath}`);
    console.warn("   Proceeding without gitignore patterns");
  }

  try {
    execSync("git --version", { stdio: "ignore" });
  } catch {
    console.error("❌ ERROR: Git is not available in PATH");
    process.exit(1);
  }

  try {
    execSync("git rev-parse --git-dir", { stdio: "ignore", cwd: projectRoot });
  } catch {
    console.error("❌ ERROR: Not in a git repository");
    process.exit(1);
  }
}

function parseGitignore(gitignoreFilePath) {
  if (!existsSync(gitignoreFilePath)) {
    return [];
  }

  try {
    const content = readFileSync(gitignoreFilePath, "utf8");
    const patterns = content
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith("#"));

    return patterns;
  } catch (err) {
    console.warn(`⚠️  WARNING: Failed to parse .gitignore: ${err.message}`);
    return [];
  }
}

function shouldIgnore(relativePath, patterns, isDirectory) {
  const name = basename(relativePath);

  if (name === ".git") {
    return true;
  }

  for (const pattern of patterns) {
    let cleanPattern = pattern;
    let negated = false;

    if (cleanPattern.startsWith("!")) {
      negated = true;
      cleanPattern = cleanPattern.slice(1);
    }

    const dirOnly = cleanPattern.endsWith("/");
    if (dirOnly) {
      cleanPattern = cleanPattern.slice(0, -1);
    }

    if (dirOnly && !isDirectory) {
      continue;
    }

    const isRootRelative = cleanPattern.startsWith("/");
    if (isRootRelative) {
      cleanPattern = cleanPattern.slice(1);
    }

    const regexPattern = cleanPattern
      .replace(/\./g, "\\.")
      .replace(/\*\*/g, "{{DOUBLE_STAR}}")
      .replace(/\*/g, "[^/]*")
      .replace(/{{DOUBLE_STAR}}/g, ".*")
      .replace(/\?/g, "[^/]");

    let regex;
    if (isRootRelative) {
      regex = new RegExp(`^${regexPattern}$`);
    } else {
      regex = new RegExp(`(^|/)${regexPattern}$`);
    }

    const matches = regex.test(relativePath) || regex.test(name);

    if (matches) {
      if (negated) {
        return false;
      }
      return true;
    }
  }

  return false;
}

function shouldSkipFileContent(filePath) {
  const ext = extname(filePath).toLowerCase();
  const name = basename(filePath);

  if (SKIP_EXTENSIONS.has(ext)) {
    return true;
  }

  if (SKIP_FILES.has(name)) {
    return true;
  }

  return false;
}

function buildTree(dir, patterns, prefix = "", depth = 0) {
  if (depth > MAX_DEPTH) {
    console.warn(`⚠️  WARNING: Maximum depth reached at ${dir}`);
    return [];
  }

  const items = [];

  let entries;
  try {
    entries = readdirSync(dir);
  } catch (err) {
    console.warn(`⚠️  WARNING: Cannot read directory ${dir}: ${err.message}`);
    return items;
  }

  entries.sort((a, b) => {
    const aPath = join(dir, a);
    const bPath = join(dir, b);

    let aIsDir, bIsDir;
    try {
      aIsDir = statSync(aPath).isDirectory();
      bIsDir = statSync(bPath).isDirectory();
    } catch {
      return 0;
    }

    if (aIsDir && !bIsDir) return -1;
    if (!aIsDir && bIsDir) return 1;
    return a.localeCompare(b);
  });

  const visibleEntries = entries.filter((entry) => {
    const entryPath = join(dir, entry);
    const entryRelativePath = relative(projectRoot, entryPath);

    let isDir;
    try {
      isDir = statSync(entryPath).isDirectory();
    } catch {
      return false;
    }

    return !shouldIgnore(entryRelativePath, patterns, isDir);
  });

  visibleEntries.forEach((entry, index) => {
    const entryPath = join(dir, entry);
    let isDirectory;

    try {
      isDirectory = statSync(entryPath).isDirectory();
    } catch (err) {
      console.warn(`⚠️  WARNING: Cannot stat ${entryPath}: ${err.message}`);
      return;
    }

    const isLastEntry = index === visibleEntries.length - 1;
    const connector = isLastEntry ? "└── " : "├── ";
    const extension = isLastEntry ? "    " : "│   ";

    if (isDirectory) {
      items.push(`${prefix}${connector}${entry}/`);
      const children = buildTree(
        entryPath,
        patterns,
        prefix + extension,
        depth + 1
      );
      items.push(...children);
    } else {
      items.push(`${prefix}${connector}${entry}`);
    }
  });

  return items;
}

function getFileContent(filePath) {
  if (shouldSkipFileContent(filePath)) {
    return null;
  }

  try {
    const stats = statSync(filePath);

    if (stats.size > MAX_FILE_SIZE) {
      console.warn(
        `⚠️  WARNING: Skipping large file (${(stats.size / 1024 / 1024).toFixed(2)}MB): ${filePath}`
      );
      return null;
    }

    const content = readFileSync(filePath, "utf8");
    return content;
  } catch (err) {
    console.warn(`⚠️  WARNING: Cannot read file ${filePath}: ${err.message}`);
    return null;
  }
}

function collectAllFiles(dir, patterns, depth = 0) {
  if (depth > MAX_DEPTH) {
    return [];
  }

  const files = [];

  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return files;
  }

  for (const entry of entries) {
    const entryPath = join(dir, entry);
    const entryRelativePath = relative(projectRoot, entryPath);

    let isDirectory;
    try {
      isDirectory = statSync(entryPath).isDirectory();
    } catch {
      continue;
    }

    if (shouldIgnore(entryRelativePath, patterns, isDirectory)) {
      continue;
    }

    if (isDirectory) {
      const subFiles = collectAllFiles(entryPath, patterns, depth + 1);
      files.push(...subFiles);
    } else {
      files.push(entryPath);
    }
  }

  return files;
}

function safeWriteFile(filePath, content) {
  const tempPath = `${filePath}.tmp`;
  const backupPath = `${filePath}.backup`;

  try {
    if (existsSync(filePath)) {
      copyFileSync(filePath, backupPath);
    }

    writeFileSync(tempPath, content, "utf8");

    const verification = readFileSync(tempPath, "utf8");
    if (verification !== content) {
      throw new Error("Verification failed: written content does not match");
    }

    if (existsSync(filePath)) {
      unlinkSync(filePath);
    }

    copyFileSync(tempPath, filePath);
    unlinkSync(tempPath);

    if (existsSync(backupPath)) {
      unlinkSync(backupPath);
    }

    return true;
  } catch (err) {
    console.error(`❌ ERROR: Failed to write file ${filePath}: ${err.message}`);

    if (existsSync(backupPath)) {
      try {
        copyFileSync(backupPath, filePath);
        console.warn("   Restored from backup");
      } catch (restoreErr) {
        console.error(`   Failed to restore backup: ${restoreErr.message}`);
      }
    }

    if (existsSync(tempPath)) {
      try {
        unlinkSync(tempPath);
      } catch {}
    }

    return false;
  }
}

function main() {
  console.warn("📁 Generating project tree...");

  validatePrerequisites();

  const patterns = parseGitignore(gitignorePath);
  console.warn(`   Loaded ${patterns.length} gitignore patterns`);

  const treeLines = buildTree(projectRoot, patterns);
  const treeOutput = `${basename(projectRoot)}/\n${treeLines.join("\n")}`;

  console.warn("📄 Collecting file contents...");

  const allFiles = collectAllFiles(projectRoot, patterns);
  console.warn(`   Found ${allFiles.length} files`);

  const fileContentsOutput = [];

  for (const filePath of allFiles) {
    const relativePath = relative(projectRoot, filePath);
    const content = getFileContent(filePath);

    if (content !== null) {
      fileContentsOutput.push(`\n${"=".repeat(80)}`);
      fileContentsOutput.push(`FILE: ${relativePath}`);
      fileContentsOutput.push(`${"=".repeat(80)}\n`);
      fileContentsOutput.push(content);
    }
  }

  const finalOutput = [
    "PROJECT TREE",
    "=".repeat(80),
    "",
    treeOutput,
    "",
    "",
    "FILE CONTENTS",
    "=".repeat(80),
    ...fileContentsOutput,
  ].join("\n");

  const success = safeWriteFile(outputPath, finalOutput);

  if (success) {
    console.warn(`✅ Project tree written to: ${outputPath}`);
    console.warn(
      `   Tree: ${treeLines.length} entries, Contents: ${fileContentsOutput.length / 4} files`
    );
  } else {
    console.error("❌ Failed to write project tree");
    process.exit(1);
  }
}

main();
