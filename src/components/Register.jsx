import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowCounterClockwiseIcon, ArrowRightIcon, CheckCircleIcon, WarningCircleIcon } from '@phosphor-icons/react'
import { fields, site } from '../content.js'
import { toRecord, validate } from '../lib/validate.js'
import { isDemoMode, submitRecord } from '../lib/submit.js'
import Field from './Field.jsx'

const ease = [0.16, 1, 0.3, 1]
const emptyValues = () => Object.fromEntries(fields.map((f) => [f.name, f.type === 'checkbox' ? false : '']))

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease },
}

function SuccessCard({ name, email, minHeight, onReset }) {
  const headingRef = useRef(null)
  useEffect(() => headingRef.current?.focus({ preventScroll: true }), [])

  return (
    <div className="flex flex-col items-start justify-center gap-6 p-8 md:p-12" style={{ minHeight }}>
      <motion.span
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.35, type: 'spring', stiffness: 260, damping: 16 }}
        className="grid size-16 place-items-center rounded-full bg-accent text-accent-ink"
      >
        <CheckCircleIcon weight="bold" className="size-9" aria-hidden />
      </motion.span>
      <div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display text-3xl font-bold tracking-tight outline-none md:text-4xl">
          {site.success.heading(name)}
        </h3>
        <p className="mt-3 max-w-[40ch] text-lg text-muted">{site.success.body(email)}</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="inline-flex h-12 items-center gap-2 rounded-full border border-line px-6 font-medium transition-colors hover:border-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent active:scale-[0.98]"
      >
        <ArrowCounterClockwiseIcon weight="bold" className="size-4" aria-hidden />
        {site.success.again}
      </button>
    </div>
  )
}

export default function Register() {
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState('idle') // idle | submitting | error | success
  const [honeypot, setHoneypot] = useState('')
  const [cardHeight, setCardHeight] = useState()
  const inputRefs = useRef({})
  const formRef = useRef(null)

  function update(name, value) {
    const next = { ...values, [name]: value }
    setValues(next)
    if (touched) setErrors(validate(fields, next))
    if (status === 'error') setStatus('idle')
  }

  async function onSubmit(event) {
    event.preventDefault()
    if (status === 'submitting') return

    const found = validate(fields, values)
    setErrors(found)
    setTouched(true)
    const firstInvalid = fields.find((f) => found[f.name])
    if (firstInvalid) {
      setAttempt((n) => n + 1)
      inputRefs.current[firstInvalid.name]?.focus()
      return
    }

    setStatus('submitting')
    try {
      await submitRecord(toRecord(fields, values), honeypot)
      setCardHeight(formRef.current?.offsetHeight)
      setStatus('success')
    } catch (error) {
      console.error('[Plot Twist] Submit failed:', error)
      setStatus('error')
    }
  }

  function reset() {
    setValues(emptyValues())
    setErrors({})
    setTouched(false)
    setStatus('idle')
  }

  const submitting = status === 'submitting'
  const firstName = values.fullName?.trim().split(/\s+/)[0]

  return (
    <section id="register" className="scroll-mt-16 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 md:grid-cols-12 md:px-8">
        <motion.div {...reveal} className="self-start md:sticky md:top-28 md:col-span-5">
          <h2 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-6xl">
            {site.register.heading}
          </h2>
          <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-muted">{site.register.body}</p>
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.1 }} className="md:col-span-7" style={{ perspective: 1600 }}>
          <div className="overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_40px_80px_-48px_color-mix(in_srgb,var(--ink)_40%,transparent)]">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, rotateY: 80 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  transition={{ duration: 0.55, ease }}
                  aria-live="polite"
                >
                  <SuccessCard name={firstName} email={values.email.trim()} minHeight={cardHeight} onReset={reset} />
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, rotateY: -80 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -80 }}
                  transition={{ duration: 0.45, ease }}
                  className="grid gap-x-5 gap-y-6 p-6 md:grid-cols-2 md:p-10"
                >
                  {fields.map((field) => (
                    <Field
                      key={field.name}
                      field={field}
                      value={values[field.name]}
                      error={errors[field.name]}
                      attempt={attempt}
                      onChange={update}
                      copyValue={field.copyFrom && values[field.copyFrom]}
                      inputRef={(el) => (inputRefs.current[field.name] = el)}
                    />
                  ))}

                  {/* Hidden from people; bots that fill every input get a fake success. */}
                  <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                    <label>
                      Leave this empty
                      <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                    </label>
                  </div>

                  <div className="flex flex-col gap-4 md:col-span-2">
                    <AnimatePresence initial={false}>
                      {status === 'error' && (
                        <motion.p
                          role="alert"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-2 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm font-medium text-accent"
                        >
                          <WarningCircleIcon weight="bold" className="mt-px size-4 shrink-0" aria-hidden />
                          {site.errors.submit}
                        </motion.p>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={submitting ? undefined : { y: -2 }}
                      whileTap={submitting ? undefined : { scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="relative inline-flex h-14 min-w-52 items-center justify-center gap-2 self-start overflow-hidden whitespace-nowrap rounded-full bg-accent px-8 text-base font-semibold text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-wait max-md:w-full"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={submitting ? 'saving' : 'idle'}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.18 }}
                          className="inline-flex items-center gap-2"
                        >
                          {submitting ? 'Saving' : site.cta}
                          {!submitting && <ArrowRightIcon weight="bold" className="size-4" aria-hidden />}
                        </motion.span>
                      </AnimatePresence>
                      {submitting && (
                        <motion.span
                          aria-hidden
                          className="absolute bottom-0 left-0 h-1 w-1/2 bg-accent-ink/50"
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{ repeat: Infinity, duration: 1.1, ease: 'easeInOut' }}
                        />
                      )}
                    </motion.button>

                    {isDemoMode && import.meta.env.DEV && (
                      <p className="text-sm text-muted">
                        Demo mode: responses are not saved until VITE_SHEET_URL is set in .env.
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
