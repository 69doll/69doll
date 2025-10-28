const SPLIT_WORDING = '//'
const STORE_KEY = 'authorization'
const EXPIRE_TIME = 18000 * 1000

export function getAuthorization () {
  const content = localStorage.getItem(STORE_KEY)
  if (!content) return
  const [date, token] = content.split(SPLIT_WORDING)
  const realDate = Number(date)
  if (!realDate || isNaN(realDate)) return
  if ((realDate + EXPIRE_TIME) <= Date.now()) return
  return token
}

export function setAuthorization (value?: string | null) {
  if (typeof value === 'string' && value) {
    const cacheContent = [Date.now(), value].join(SPLIT_WORDING)
    localStorage.setItem(STORE_KEY, cacheContent)
  } else {
    localStorage.removeItem(STORE_KEY)
  }
}

export function hasAuthorization () {
  return !!getAuthorization()
}
