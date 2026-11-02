// All page text and form fields live here. Edit this file to change copy or questions.
// Each field's `label` becomes a column header in the Google Sheet. New fields add
// new columns automatically; renaming a label starts a new column.

import aerialInversion from './assets/cards/aerial-inversion.jpg'
import kneelingStretch from './assets/cards/kneeling-stretch.jpg'
import chairBackbend from './assets/cards/chair-backbend.jpg'
import aerialBow from './assets/cards/aerial-bow.jpg'

// Marks an itinerary item as a highlight (shown in the accent colour).
const highlight = (text) => ({ text, highlight: true })

export const site = {
  title: 'Plot Twist',
  brand: 'Shringaarika',
  fullTitle: 'Plot Twist by Shringaarika',
  cta: 'Save my spot',
  // Leave dates or price as null to hide them until they are confirmed.
  trip: {
    dates: null, // for example 'Fri 20 Nov to Mon 23 Nov 2026'
    duration: '4 days, 3 nights',
    place: 'Vyam School of Yoga, Rishikesh',
    price: null, // for example '₹18,000 per person'
  },
  hero: {
    sub: 'A yoga retreat by the Ganga: morning asana, rafting, a waterfall trek, Ayurvedic therapies and sound healing.',
  },
  // Hero photo cards, back to front.
  // `position` sets which part of the photo stays visible when it is cropped to the card.
  cards: [
    { image: aerialInversion, position: '50% 70%' },
    { image: kneelingStretch, position: '50% 60%' },
    { image: chairBackbend, position: '50% 80%' },
    { image: aerialBow, position: '50% 60%' },
  ],
  manifesto:
    'Slow mornings on the mat, the Ganga beside you, and nights that end under the stars. Four days to breathe, move and rest.',
  itinerary: {
    heading: 'Four days in Rishikesh',
    sub: 'The plan for your stay at Vyam School of Yoga.',
    days: [
      {
        title: 'Arrival & Relaxation',
        items: [
          'Pickup and check-in',
          'Welcome and refreshments',
          'Lunch',
          'Rest and relaxation',
          highlight('Pottery'),
          highlight('Kirtan'),
          'Dinner and overnight stay',
          highlight('Stargazing through a telescope'),
        ],
      },
      {
        title: 'Yoga & Adventure',
        items: [
          highlight('Morning asana class'),
          'Breakfast',
          highlight('Rafting'),
          highlight('Ganga aarti at Lakshman Jhula'),
          'Dinner and overnight stay',
        ],
      },
      {
        title: 'Nature & Healing',
        items: [
          highlight('Trekking and waterfall visit'),
          'Breakfast',
          highlight('Ayurvedic therapies'),
          'Lunch',
          'Rest and relaxation',
          highlight('Sound healing session'),
          'Dinner and overnight stay',
        ],
      },
      {
        title: 'Mindfulness & Departure',
        items: [
          highlight('Asana and meditation class'),
          'Breakfast',
          highlight('Local market and sightseeing'),
          'Checkout and departure',
        ],
      },
    ],
  },
  register: {
    heading: 'Join the retreat',
    body: 'It takes under a minute. We will get in touch to confirm your place.',
  },
  success: {
    heading: (name) => (name ? `You're on the list, ${name}.` : "You're on the list."),
    body: (email) => `We will be in touch at ${email} to confirm your place.`,
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
    requiredMessage: 'Please enter your Instagram handle.',
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
    name: 'yogaExperience',
    label: 'Yoga experience',
    type: 'radio',
    span: 'full',
    options: ['Beginner', 'Some experience', 'Regular practice'],
    requiredMessage: 'Please choose your yoga experience.',
  },
  {
    name: 'source',
    label: 'How did you hear about us?',
    type: 'select',
    span: 'full',
    options: ['Instagram', 'WhatsApp', 'A friend', 'Google search', 'Other'],
    requiredMessage: 'Please tell us how you heard about us.',
  },
  {
    name: 'message',
    label: 'Anything you want us to know?',
    type: 'textarea',
    span: 'full',
    maxLength: 1000,
    helper: 'For example health conditions, injuries or food preferences.',
  },
  {
    name: 'consent',
    label: 'I agree to be contacted about this retreat.',
    sheetLabel: 'Consent',
    type: 'checkbox',
    span: 'full',
    requiredMessage: 'Please tick this box so we can contact you.',
  },
]
