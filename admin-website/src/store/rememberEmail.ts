const STORE_KEY = 'remember_user'

export function getRememberUser () {
  const content = localStorage.getItem(STORE_KEY)
  return content
}

export function setRememberUser (value?: string | null) {
  if (typeof value === 'string' && value) {
    localStorage.setItem(STORE_KEY, value)
  } else {
    localStorage.removeItem(STORE_KEY)
  }
}

export function hasRememberUser () {
  return !!getRememberUser()
}
