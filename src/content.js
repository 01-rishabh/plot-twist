// All page text and form fields live here. Edit this file to change copy or questions.
// Each field's `label` becomes a column header in the Google Sheet. New fields add
// new columns automatically; renaming a label starts a new column.

import hostPortrait from './assets/cards/host-portrait.jpg'
import campsiteSunset from './assets/cards/campsite-sunset.jpg'
import groupTrip from './assets/cards/group-trip.jpg'

export const site = {
  title: 'Plot Twist',
  brand: 'Shringaarika',
  fullTitle: 'Plot Twist by Shringaarika',
  cta: 'Save my spot',
  hero: {
    sub: 'Something new is coming. Leave your details and you hear about it before anyone else.',
  },
  // Hero photo cards, back to front. The last card is face down at first and flips over.
  // `position` sets which part of the photo stays visible when it is cropped to the card.
  cards: [
    { image: hostPortrait, position: '50% 30%' },
    { image: campsiteSunset, position: '50% 45%' },
    { image: groupTrip, position: '50% 50%' },
  ],
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
    label: 'Phone number',
    type: 'tel',
    autoComplete: 'tel',
    requiredMessage: 'Please enter your phone number.',
    helper: 'Include your country code, for example +91.',
  },
  {
    name: 'whatsapp',
    label: 'WhatsApp number',
    type: 'tel',
    copyFrom: 'phone',
    copyLabel: 'Same as phone',
    requiredMessage: 'Please enter your WhatsApp number.',
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    min: 1,
    max: 120,
    requiredMessage: 'Please enter your age.',
    invalidMessage: 'Please enter your age in years.',
  },
  {
    name: 'instagram',
    label: 'Instagram handle',
    type: 'instagram',
    helper: 'For example @yourname',
  },
  {
    name: 'travellingFrom',
    label: 'Where are you travelling from?',
    type: 'text',
    span: 'full',
    autoComplete: 'address-level2',
    requiredMessage: 'Please tell us where you are travelling from.',
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
