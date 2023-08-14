import { shuffle } from './shuffle'

type Digits = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type SudokuPart = Array<Set<Digits>>

const NUMBERS: Digits[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]

let digitRows: SudokuPart = []
let digitColumns: SudokuPart = []
let digitBlocks: SudokuPart = []

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
    rows: digitRows.map((set) => [...set]),
    columns: digitColumns.map((set) => [...set]),
    blocks: digitBlocks.map((set) => [...set]),
  }
}

function setFirstBlockLine() {
  let firstRowParts = splitRow(shuffle<Digits>(NUMBERS)).map<Digits[]>(shuffle)
  let secondRowParts: number[][] = []
  let thirdRowParts: number[][] = []

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

  const getThirdRow = (firstPart: number[], secondPart: number[]) =>
    NUMBERS.filter(
      (digit) => !firstPart.includes(digit) && !secondPart.includes(digit)
    )

  thirdRowParts = [
    getThirdRow(firstRowParts[0], secondRowParts[0]),
    getThirdRow(firstRowParts[1], secondRowParts[1]),
    getThirdRow(firstRowParts[2], secondRowParts[2]),
  ]

  let firstRow = firstRowParts.flat() as Digits[]
  let secondRow = secondRowParts.flat() as Digits[]
  let thirdRow = thirdRowParts.flat() as Digits[]
  const allRowsOfLine = [firstRow, secondRow, thirdRow]
  updateDigitSets(allRowsOfLine, 0)
}

function setNextBlockLine(lineNumber: 1 | 2) {
  let firstRow: Digits[] = []
  let secondRow: Digits[] = []
  let thirdRow: Digits[] = []

  let firstRowParts: Digits[][] = []
  let secondRowParts: Digits[][] = []
  let thirdRowParts: Array<Digits[] | undefined> = []

  let numbers = NUMBERS.slice()

  const generateFirstRow = () => {
    firstRow = []
    for (let column = 0; column < 9; column++) {
      firstRow.push(
        shuffle<Digits>(
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
        shuffle<Digits>(
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

  const getThirdRow = (partNumber: number) => {
    let freeDigits = NUMBERS.filter(
      (digit) =>
        !firstRowParts[partNumber].includes(digit) &&
        !secondRowParts[partNumber].includes(digit)
    )
    let combinations = getAllCombinations(shuffle<Digits>(freeDigits))
    while (combinations.length > 0) {
      let combination = combinations.splice(0, 1)[0]
      if (digitColumns[partNumber * 3].has(combination[0])) continue
      if (digitColumns[partNumber * 3 + 1].has(combination[1])) continue
      if (digitColumns[partNumber * 3 + 2].has(combination[2])) continue
      return combination
    }
  }

  for (let i = 0; i < 3; i++) {
    const part = getThirdRow(i)
    if (typeof part === 'undefined') {
      setNextBlockLine(lineNumber)
      return
    }
    thirdRow.push(...part)
  }

  const allRowsOfLine = [firstRow, secondRow, thirdRow]
  updateDigitSets(allRowsOfLine, lineNumber)
}

function updateDigitSets(allRowsOfLine: Digits[][], lineNumber: 0 | 1 | 2) {
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

function addArrayInSet(set: Set<Digits>, array: Digits[]) {
  for (const digit of array) {
    set.add(digit)
  }
}

function splitRow(row: Digits[]) {
  let parts = []
  let _row = [...row]
  while (_row.length >= 3) parts.push(_row.splice(0, 3))
  return parts
}

function getAllCombinations(array: Digits[]) {
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
