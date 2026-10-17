const ENDPOINT = import.meta.env.VITE_SHEET_URL

export const isDemoMode = !ENDPOINT

// Sends one record to the Google Apps Script web app, which appends it to the sheet.
// text/plain keeps this a "simple" CORS request, so the browser skips the preflight
// that Apps Script cannot answer.
export async function submitRecord(record, honeypot) {
  if (honeypot) return { ok: true }

  if (!ENDPOINT) {
    // A live site without the sheet URL must fail loudly instead of dropping records.
    if (import.meta.env.PROD) throw new Error('VITE_SHEET_URL is not set for this build')
    await new Promise((resolve) => setTimeout(resolve, 1100))
    console.info('[Plot Twist] Demo mode, VITE_SHEET_URL is not set. Record:', record)
    return { ok: true, demo: true }
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ data: record }),
  })
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)

  const body = await res.json()
  if (!body.ok) throw new Error(body.error || 'The sheet rejected the record')
  return body
}
