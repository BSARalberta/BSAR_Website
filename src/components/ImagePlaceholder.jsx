import { useState } from 'react'

function ImagePlaceholder({ src, alt, label, className = '', priority = false }) {
  const [hasError, setHasError] = useState(false)

  if (!src || hasError) {
    return (
      <div
        className={`image-fallback ${className}`.trim()}
        role="img"
        aria-label={alt || label}
      >
        <span>{label}</span>
      </div>
    )
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      onError={() => setHasError(true)}
    />
  )
}

export default ImagePlaceholder
