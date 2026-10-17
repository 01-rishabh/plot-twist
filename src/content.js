// All page text and form fields live here. Edit this file to change copy or questions.
// Each field's `label` becomes a column header in the Google Sheet. New fields add
// new columns automatically; renaming a label starts a new column.

export const site = {
  title: 'Plot Twist',
  brand: 'Shringaarika',
  fullTitle: 'Plot Twist by Shringaarika',
  cta: 'Save my spot',
  hero: {
    sub: 'Something new is coming. Leave your details and you hear about it before anyone else.',
  },
  cards: ['Setup.', 'Tension.', 'Twist.'],
  manifesto:
    'Every good story turns at a moment nobody saw coming. We are building one of those moments, and we would like you there when it happens.',
  register: {
    heading: 'Get on the list',
    body: 'It takes under a minute. We only use your details to contact you about Plot Twist.',
  },
  success: {
    heading: (name) => (name ? `You're on the list, ${name}.` : "You're on the list."),
    body: (email) => `We will reach out at ${email} as soon as there is news.`,
    again: 'Register someone else',
  },
  errors: {
    submit: 'We could not save that. Check your connection and try again.',
  },
}

export const fields = [
  {
    name: 'fullName',
    label: 'Full name',
    type: 'text',
    autoComplete: 'name',
    requiredMessage: 'Please enter your name.',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    autoComplete: 'email',
    requiredMessage: 'Please enter your email.',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    autoComplete: 'tel',
    requiredMessage: 'Please enter your phone number.',
    helper: 'Include your country code, for example +91.',
  },
  {
    name: 'city',
    label: 'City',
    type: 'text',
    autoComplete: 'address-level2',
  },
  {
    name: 'drink',
    label: 'Drink preference',
    type: 'radio',
    span: 'full',
    options: ['Alcoholic', 'Non-alcoholic'],
    requiredMessage: 'Please choose a drink preference.',
  },
  {
    name: 'source',
    label: 'How did you hear about us?',
    type: 'select',
    span: 'full',
    options: ['Instagram', 'WhatsApp', 'A friend', 'Google search', 'Other'],
  },
  {
    name: 'message',
    label: 'Anything you want us to know?',
    type: 'textarea',
    span: 'full',
    maxLength: 1000,
  },
  {
    name: 'consent',
    label: 'I agree to be contacted about Plot Twist.',
    sheetLabel: 'Consent',
    type: 'checkbox',
    span: 'full',
    requiredMessage: 'Please tick this box so we can contact you.',
  },
]
