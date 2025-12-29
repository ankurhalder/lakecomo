export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-27'

const _dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const dataset = _dataset

const _projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'c20abca7'
export const projectId = _projectId
