const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

let digitRows = []
let digitColumns = []
let digitBlocks = []

getSudokuContent()

export function getSudokuContent() {
  for (let i = 0; i < 9; i++) {
    digitRows[i] = new Set()
    digitColumns[i] = new Set()
    digitBlocks[i] = new Set()
  }

  setFirstBlockLine()
  setNextBlockLine(1)
  setNextBlockLine(2)

  return {
    rows: digitRows,
    columns: digitColumns,
    blocks: digitBlocks,
  }
}

function setFirstBlockLine() {
  let firstRowParts = splitRow(shuffle(NUMBERS)).map(shuffle)
  let secondRowParts = []
  let thirdRowParts = []

  if (Math.random() >= 0.5) {
    secondRowParts = [
      firstRowParts[2].slice(0, 2).concat(firstRowParts[1].slice(0, 1)),
      firstRowParts[2].slice(2).concat(firstRowParts[0].slice(0, 2)),
      firstRowParts[1].slice(1).concat(firstRowParts[0].slice(2)),
    ]
  } else {
    secondRowParts = [
      firstRowParts[2].slice(0, 1).concat(firstRowParts[1].slice(0, 2)),
      firstRowParts[2].slice(1).concat(firstRowParts[0].slice(0, 1)),
      firstRowParts[0].slice(1).concat(firstRowParts[1].slice(2)),
    ]
  }

  const getThirdRow = (firstPart, secondPart) =>
    NUMBERS.filter(
      (digit) => !firstPart.includes(digit) && !secondPart.includes(digit)
    )

  thirdRowParts = [
    getThirdRow(firstRowParts[0], secondRowParts[0]),
    getThirdRow(firstRowParts[1], secondRowParts[1]),
    getThirdRow(firstRowParts[2], secondRowParts[2]),
  ]

  let firstRow = firstRowParts.flat()
  let secondRow = secondRowParts.flat()
  let thirdRow = thirdRowParts.flat()
  const allRowsOfLine = [firstRow, secondRow, thirdRow]
  updateDigitSets(allRowsOfLine, 0)
}

function setNextBlockLine(lineNumber) {
  let firstRow = []
  let secondRow = []
  let thirdRow = []

  let firstRowParts = []
  let secondRowParts = []
  let thirdRowParts = []
  let numbers = NUMBERS.slice()

  const generateFirstRow = () => {
    firstRow = []
    for (let column = 0; column < 9; column++) {
      firstRow.push(
        shuffle(
          numbers.filter(
            (digit) =>
              !digitColumns[column].has(digit) && !firstRow.includes(digit)
          )
        )[0]
      )
    }
  }

  while (firstRow.filter((digit) => digit > 0).length < 9) {
    generateFirstRow()
  }
  firstRowParts = splitRow(firstRow)

  const generateSecondRow = () => {
    secondRow = []
    for (let column = 0; column < 9; column++) {
      secondRow.push(
        shuffle(
          numbers.filter(
            (digit) =>
              !digitColumns[column].has(digit) &&
              !secondRow.includes(digit) &&
              !firstRowParts[Math.floor(column / 3)].includes(digit)
          )
        )[0]
      )
    }
  }

  while (secondRow.filter((digit) => digit > 0).length < 9) {
    generateSecondRow()
  }
  secondRowParts = splitRow(secondRow)

  const getThirdRow = (partNumber) => {
    let freeDigits = NUMBERS.filter(
      (digit) =>
        !firstRowParts[partNumber].includes(digit) &&
        !secondRowParts[partNumber].includes(digit)
    )
    let combinations = getAllCombinations(shuffle(freeDigits))
    while (combinations.length > 0) {
      let combination = combinations.splice(0, 1)[0]
      if (digitColumns[partNumber * 3].has(combination[0])) continue
      if (digitColumns[partNumber * 3 + 1].has(combination[1])) continue
      if (digitColumns[partNumber * 3 + 2].has(combination[2])) continue
      return combination
    }
  }

  thirdRowParts = [getThirdRow(0), getThirdRow(1), getThirdRow(2)]
  thirdRow = thirdRowParts.flat()
  if (thirdRow.length < 9) {
    setNextBlockLine(lineNumber)
    return
  }

  const allRowsOfLine = [firstRow, secondRow, thirdRow]
  updateDigitSets(allRowsOfLine, lineNumber)
}

function updateDigitSets(allRowsOfLine, lineNumber) {
  for (let row = 0; row < 3; row++) {
    addArrayInSet(digitRows[lineNumber * 3 + row], allRowsOfLine[row])
    addArrayInSet(
      digitBlocks[lineNumber * 3 + row],
      allRowsOfLine.map((_row) => _row.slice(row * 3, (row + 1) * 3)).flat()
    )
    for (let column = 0; column < 9; column++) {
      digitColumns[column].add(allRowsOfLine[row][column])
    }
  }
}

function addArrayInSet(set, array) {
  for (const digit of array) {
    set.add(digit)
  }
}

function splitRow(row) {
  let parts = []
  let _row = [...row]
  while (_row.length >= 3) parts.push(_row.splice(0, 3))
  return parts
}

function shuffle(array) {
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

function getAllCombinations(array) {
  let combinations = []
  for (const digit of array) {
    combinations.push(
      array.filter((item) => item !== digit).concat(digit),
      array
        .filter((item) => item !== digit)
        .reverse()
        .concat(digit)
    )
  }
  return combinations
}
