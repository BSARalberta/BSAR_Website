function normalizeOptionalText(value) {
  const normalized = typeof value === 'string' ? value.trim() : ''
  return normalized || null
}

export function getEmptyBoardMember() {
  return {
    role: '',
    display_order: '',
    name: '',
    email: '',
    image_url: '',
    is_acting: false,
  }
}

export function getBoardMemberFormValues(member) {
  if (!member) {
    return {
      ...getEmptyBoardMember(),
      remove_image: false,
    }
  }

  return {
    role: member.role || '',
    display_order:
      typeof member.display_order === 'number' ? String(member.display_order) : '',
    name: member.name || '',
    email: member.email || '',
    image_url: member.image_url || '',
    is_acting: Boolean(member.is_acting),
    remove_image: false,
  }
}

export function normalizeBoardMemberPayload(values) {
  return {
    role: String(values.role || '').trim(),
    display_order: Number.parseInt(values.display_order, 10),
    name: normalizeOptionalText(values.name),
    email: normalizeOptionalText(values.email),
    image_url: normalizeOptionalText(values.image_url),
    is_acting: Boolean(values.is_acting),
  }
}

export function validateBoardMember(values) {
  const errors = {}
  const role = String(values.role || '').trim()
  const email = String(values.email || '').trim()
  const displayOrder = Number.parseInt(values.display_order, 10)

  if (!role) {
    errors.role = 'Position title is required.'
  }

  if (!values.display_order || Number.isNaN(displayOrder)) {
    errors.display_order = 'Display order is required.'
  } else if (displayOrder < 1) {
    errors.display_order = 'Display order must be 1 or greater.'
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.'
  }

  return errors
}

export function sortBoardMembers(a, b) {
  return (
    (a.display_order ?? Number.MAX_SAFE_INTEGER) - (b.display_order ?? Number.MAX_SAFE_INTEGER) ||
    String(a.role || '').localeCompare(String(b.role || ''))
  )
}

export function hasBoardMemberInfo(member) {
  return Boolean(member?.name || member?.email || member?.image_url)
}
