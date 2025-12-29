export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-12-27'

const _dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
if (!_dataset) throw new Error('Missing env: NEXT_PUBLIC_SANITY_DATASET')
export const dataset = _dataset

const _projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (!_projectId) throw new Error('Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID')
export const projectId = _projectId
