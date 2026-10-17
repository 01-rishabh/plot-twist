import { useEffect } from 'react'
import { AnimatePresence, motion, useAnimate } from 'motion/react'
import { CaretDownIcon, CheckIcon, WarningCircleIcon } from '@phosphor-icons/react'

const control =
  'w-full rounded-xl border bg-bg px-4 text-base text-ink outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:ring-4 focus:ring-accent/20'

// `copyValue` is the current value of the field named in `field.copyFrom`, used by the
// "Same as phone" shortcut.
export default function Field({ field, value, error, attempt, onChange, inputRef, copyValue }) {
  const [scope, animate] = useAnimate()
  const id = `field-${field.name}`
  const helpId = `${id}-help`
  const errorId = `${id}-error`
  const describedBy = [field.helper && !error && helpId, error && errorId].filter(Boolean).join(' ') || undefined
  const required = Boolean(field.requiredMessage)
  const border = error ? 'border-accent' : 'border-line hover:border-muted'

  // Shake an invalid field each time the visitor tries to submit.
  useEffect(() => {
    if (attempt && error && scope.current) {
      animate(scope.current, { x: [0, -7, 7, -4, 4, 0] }, { duration: 0.42 })
    }
  }, [attempt]) // eslint-disable-line react-hooks/exhaustive-deps

  const shared = {
    id,
    name: field.name,
    ref: inputRef,
    'aria-invalid': Boolean(error),
    'aria-describedby': describedBy,
    'aria-required': required,
  }

  let input
  if (field.type === 'checkbox') {
    input = (
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3">
        <input
          {...shared}
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(field.name, e.target.checked)}
          className="peer sr-only"
        />
        <span
          className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border-2 transition-colors duration-200 peer-focus-visible:ring-4 peer-focus-visible:ring-accent/30 ${
            value ? 'border-accent bg-accent text-accent-ink' : error ? 'border-accent' : 'border-line'
          }`}
        >
          <AnimatePresence>
            {value && (
              <motion.span
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              >
                <CheckIcon weight="bold" className="size-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="text-base leading-snug">{field.label}</span>
      </label>
    )
  } else if (field.type === 'radio') {
    input = (
      <fieldset aria-describedby={describedBy} className="min-w-0">
        <legend className="mb-2 text-sm font-medium">{field.label}</legend>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-3">
          {field.options.map((option, i) => {
            const checked = value === option
            return (
              <label
                key={option}
                className={`flex h-12 cursor-pointer items-center gap-3 rounded-xl border bg-bg px-4 transition-[border-color,background-color,box-shadow] duration-200 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-accent/30 ${
                  checked ? 'border-accent bg-accent/10' : border
                }`}
              >
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={checked}
                  onChange={() => onChange(field.name, option)}
                  ref={i === 0 ? inputRef : undefined}
                  aria-invalid={Boolean(error)}
                  required={required}
                  className="sr-only"
                />
                <span
                  className={`grid size-5 shrink-0 place-items-center rounded-full border-2 transition-colors duration-200 ${
                    checked ? 'border-accent' : 'border-line'
                  }`}
                >
                  <AnimatePresence>
                    {checked && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                        className="size-2.5 rounded-full bg-accent"
                      />
                    )}
                  </AnimatePresence>
                </span>
                <span className="text-base">{option}</span>
              </label>
            )
          })}
        </div>
      </fieldset>
    )
  } else if (field.type === 'select') {
    input = (
      <div className="relative">
        <select
          {...shared}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${control} ${border} h-12 cursor-pointer appearance-none pr-11 ${value ? '' : 'text-muted'}`}
        >
          <option value="">Choose one</option>
          {field.options.map((option) => (
            <option key={option} value={option} className="text-ink">
              {option}
            </option>
          ))}
        </select>
        <CaretDownIcon
          weight="bold"
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
          aria-hidden
        />
      </div>
    )
  } else if (field.type === 'textarea') {
    input = (
      <textarea
        {...shared}
        rows={4}
        maxLength={field.maxLength}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={`${control} ${border} min-h-28 resize-y py-3 leading-relaxed`}
      />
    )
  } else {
    const isHandle = field.type === 'instagram'
    input = (
      <input
        {...shared}
        type={field.type === 'email' || field.type === 'tel' ? field.type : 'text'}
        autoComplete={field.autoComplete ?? (isHandle ? 'off' : undefined)}
        inputMode={{ tel: 'tel', number: 'numeric' }[field.type]}
        maxLength={field.type === 'number' ? 3 : undefined}
        autoCapitalize={isHandle ? 'none' : undefined}
        spellCheck={isHandle ? false : undefined}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={`${control} ${border} h-12`}
      />
    )
  }

  return (
    <div ref={scope} className={`flex flex-col gap-2 ${field.span === 'full' ? 'md:col-span-2' : ''}`}>
      {field.type !== 'checkbox' && field.type !== 'radio' && (
        <div className="flex items-baseline justify-between gap-3">
          <label htmlFor={id} className="text-sm font-medium">
            {field.label}
          </label>
          {field.copyFrom && copyValue?.trim() && value !== copyValue ? (
            <button
              type="button"
              onClick={() => onChange(field.name, copyValue)}
              className="rounded text-xs font-medium text-accent underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {field.copyLabel}
            </button>
          ) : (
            !required && <span className="text-xs text-muted">Optional</span>
          )}
        </div>
      )}
      {input}
      {field.helper && !error && (
        <p id={helpId} className="text-sm text-muted">
          {field.helper}
        </p>
      )}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1.5 text-sm font-medium text-accent"
          >
            <WarningCircleIcon weight="bold" className="size-4 shrink-0" aria-hidden />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
