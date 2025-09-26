export function getAuthorization () {
  return sessionStorage.getItem('authorization')
}

export function setAuthorization (value?: string | null) {
  if (typeof value === 'string') {
    sessionStorage.setItem('authorization', value)
  } else {
    sessionStorage.removeItem('authorization')
  }
}

export function hasAuthorization () {
  return !!sessionStorage.getItem('authorization')
}
