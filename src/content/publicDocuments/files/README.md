Place public-facing documents in this folder.

How it works:
- The Transparency page reads every file in this folder at build time.
- Each file becomes a document entry automatically.
- Optional metadata can be added in `../metadata.js` using the exact filename.

How to extend it:
- Add a new file here.
- If you want a custom title, description, or grouping, add an entry in `../metadata.js`.
- If no metadata is provided, the page falls back to the filename for the document title.
