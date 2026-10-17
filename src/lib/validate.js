const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const INSTAGRAM = /^[A-Za-z0-9._]{1,30}$/

// Accepts "name", "@name" or a profile link and returns just "name".
export function instagramHandle(text) {
  return text
    .trim()
    .replace(/^(https?:\/\/)?(www\.)?instagram\.com\//i, '')
    .replace(/[/?#].*$/, '')
    .replace(/^@/, '')
}

export function validate(fields, values) {
  const errors = {}
  for (const field of fields) {
    const value = values[field.name]

    if (field.type === 'checkbox') {
      if (field.requiredMessage && !value) errors[field.name] = field.requiredMessage
      continue
    }

    const text = (value ?? '').trim()
    if (!text) {
      if (field.requiredMessage) errors[field.name] = field.requiredMessage
      continue
    }

    if (field.type === 'email' && !EMAIL.test(text)) {
      errors[field.name] = 'That email does not look right.'
    }
    if (field.type === 'tel') {
      const digits = text.replace(/\D/g, '')
      if (digits.length < 7 || digits.length > 15 || /[^\d\s+()-]/.test(text)) {
        errors[field.name] = 'That phone number does not look right.'
      }
    }
    if (field.type === 'number') {
      const n = Number(text)
      if (!/^\d+$/.test(text) || n < (field.min ?? 0) || n > (field.max ?? Infinity)) {
        errors[field.name] = field.invalidMessage ?? 'Please enter a number.'
      }
    }
    if (field.type === 'instagram' && !INSTAGRAM.test(instagramHandle(text))) {
      errors[field.name] = 'That Instagram handle does not look right.'
    }
  }
  return errors
}

// Turns form values into { "Column header": value } for the sheet.
export function toRecord(fields, values) {
  const record = {}
  for (const field of fields) {
    const header = field.sheetLabel ?? field.label
    const value = values[field.name]
    if (field.type === 'checkbox') {
      record[header] = value ? 'Yes' : 'No'
    } else if (field.type === 'instagram') {
      const handle = instagramHandle(value ?? '')
      record[header] = handle ? `@${handle}` : ''
    } else {
      record[header] = (value ?? '').trim()
    }
  }
  return record
}
