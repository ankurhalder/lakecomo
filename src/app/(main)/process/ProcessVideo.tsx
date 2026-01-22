"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize, Clock } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";

interface VideoSectionData {
  enabled: boolean;
  heading: string;
  subHeading: string;
  videoFile?: {
    asset: {
      _ref: string;
      url?: string;
    };
  };
  videoUrl?: string;
  posterImage?: {
    asset: {
      _ref: string;
    };
  };
  duration?: string;
}

interface ProcessVideoProps {
  videoSection: VideoSectionData;
}

export default function ProcessVideo({ videoSection }: ProcessVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideControlsTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        await videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      const elem = videoRef.current as HTMLVideoElement & {
        requestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
        mozRequestFullScreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
      };

      if (elem.requestFullscreen) {
        elem.requestFullscreen({});
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (hideControlsTimeoutRef.current) {
      clearTimeout(hideControlsTimeoutRef.current);
    }
    if (isPlaying) {
      hideControlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setShowControls(true);
  };

  // Get video source - prioritize uploaded file, fallback to URL
  const videoSrc =
    videoSection.videoFile?.asset?.url || videoSection.videoUrl || "";
  const posterSrc = videoSection.posterImage
    ? urlFor(videoSection.posterImage).width(1920).height(1080).url()
    : undefined;

  // Check if it's a YouTube or Vimeo URL
  const isYouTube =
    videoSrc.includes("youtube.com") || videoSrc.includes("youtu.be");
  const isVimeo = videoSrc.includes("vimeo.com");

  // Convert YouTube/Vimeo URL to embed format
  const getEmbedUrl = (url: string) => {
    if (isYouTube) {
      const videoId = url.includes("youtu.be")
        ? url.split("youtu.be/")[1]?.split("?")[0]
        : url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1`;
    }
    if (isVimeo) {
      const videoId = url.split("vimeo.com/")[1]?.split("?")[0];
      return `https://player.vimeo.com/video/${videoId}?muted=1`;
    }
    return url;
  };

  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--text-primary) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 font-limelight tracking-wider"
            style={{ color: "var(--text-primary)" }}
          >
            {videoSection.heading}
          </h2>
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {videoSection.subHeading}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
          >
            {/* Aspect ratio wrapper */}
            <div className="relative aspect-video w-full">
              {isYouTube || isVimeo ? (
                // Embedded video (YouTube/Vimeo)
                <iframe
                  src={getEmbedUrl(videoSrc)}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={videoSection.heading}
                />
              ) : (
                // Native HTML5 video
                <>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    poster={posterSrc}
                    muted={isMuted}
                    playsInline
                    onEnded={handleVideoEnd}
                    onClick={handlePlayPause}
                  >
                    <source src={videoSrc} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Play overlay (shown when paused) */}
                  {!isPlaying && (
                    <motion.button
                      className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                      onClick={handlePlayPause}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                    >
                      <motion.div
                        className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.2)",
                          backdropFilter: "blur(10px)",
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 ml-1"
                          style={{ color: "white" }}
                          fill="white"
                        />
                      </motion.div>
                    </motion.button>
                  )}

                  {/* Video Controls */}
                  {showControls && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4 sm:p-6"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Play/Pause */}
                        <button
                          onClick={handlePlayPause}
                          className="p-2 rounded-full transition-all hover:bg-white/20"
                          aria-label={isPlaying ? "Pause" : "Play"}
                        >
                          {isPlaying ? (
                            <Pause
                              className="w-5 h-5 sm:w-6 sm:h-6"
                              style={{ color: "white" }}
                            />
                          ) : (
                            <Play
                              className="w-5 h-5 sm:w-6 sm:h-6"
                              style={{ color: "white" }}
                            />
                          )}
                        </button>

                        {/* Mute/Unmute */}
                        <button
                          onClick={handleMuteToggle}
                          className="p-2 rounded-full transition-all hover:bg-white/20"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <VolumeX
                              className="w-5 h-5 sm:w-6 sm:h-6"
                              style={{ color: "white" }}
                            />
                          ) : (
                            <Volume2
                              className="w-5 h-5 sm:w-6 sm:h-6"
                              style={{ color: "white" }}
                            />
                          )}
                        </button>

                        {/* Duration (if provided) */}
                        {videoSection.duration && (
                          <div className="flex items-center gap-1.5 text-white text-xs sm:text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{videoSection.duration}</span>
                          </div>
                        )}

                        <div className="flex-1" />

                        {/* Fullscreen */}
                        <button
                          onClick={handleFullscreen}
                          className="p-2 rounded-full transition-all hover:bg-white/20"
                          aria-label="Fullscreen"
                        >
                          <Maximize
                            className="w-5 h-5 sm:w-6 sm:h-6"
                            style={{ color: "white" }}
                          />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Decorative elements */}
          <div
            className="absolute -bottom-4 -right-4 w-32 h-32 sm:w-48 sm:h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: "var(--text-primary)" }}
          />
          <div
            className="absolute -top-4 -left-4 w-32 h-32 sm:w-48 sm:h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
            style={{ backgroundColor: "var(--text-primary)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
