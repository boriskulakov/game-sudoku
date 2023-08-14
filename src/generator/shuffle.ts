export function shuffle<T>(array: T[]) {
  let currentIndex = array.length
  let result = array.slice()

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[result[currentIndex], result[randomIndex]] = [
      result[randomIndex],
      result[currentIndex],
    ]
  }

  return result
}
