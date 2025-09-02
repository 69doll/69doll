const castArray = function <T>(arrayLike: T | T[]) {
  return Array.isArray(arrayLike) ? arrayLike : [arrayLike]
}

export default castArray
