const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

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
  }
  return errors
}

// Turns form values into { "Column header": value } for the sheet.
export function toRecord(fields, values) {
  const record = {}
  for (const field of fields) {
    const header = field.sheetLabel ?? field.label
    const value = values[field.name]
    record[header] = field.type === 'checkbox' ? (value ? 'Yes' : 'No') : (value ?? '').trim()
  }
  return record
}
