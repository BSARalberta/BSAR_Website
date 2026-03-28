// Add optional metadata for files placed in ./files.
// Keys should match the filename exactly, including the extension.
// If a file is missing here, the documents section falls back to a title
// generated from the filename and lists it in the default "Public Documents" group.
export const publicDocumentMetadata = {
  'board-governance-overview.txt': {
    title: 'Board Governance Overview',
    description:
      'Placeholder reference file for governance-related public materials such as board summaries, organizational structure notes, or leadership information.',
    category: 'Governance',
  },
  'community-readiness-information.txt': {
    title: 'Community Readiness Information',
    description:
      'Placeholder reference file for public-facing readiness information, educational resources, or community awareness material.',
    category: 'Community Information',
  },
}
