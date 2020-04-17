const message = "sirreadymd4"

const fullBinaryNumber = binaryNumber(message)
const nodesLetters = ['A', 'B', 'C', 'D']


const nodes = prepareNodes([], fullBinaryNumber, nodesLetters)

// Introducerea
let result = `Message: ${message}

${fullBinaryNumber}

${nodesLetters.reduce((accumulator, currentValue, index) => accumulator + `${currentValue} => ${nodes[index]}\n\n`, '')}

---------------------------------------------------------------
`

main()

// const delta = 2654435769

console.log(result)
// leftBinaryMessage

function prepareNodes(nodes, binary, letters) {
  if (!binary) {
    return nodes
  }

  const nodesLetters = [...letters]
  const [firstNode, rest] = [binary.slice(0, 32), binary.slice(32)]

  nodes.push(firstNode)

  return prepareNodes(nodes, rest, nodesLetters)
}

function main() {
  const logicalShiftNumbers = [3, 7, 11, 19]

  let iteration = 0

  logicalShiftNumbers.forEach(() => {
    logicalShiftNumbers.forEach((shiftWith) => {
      result += makeAnIteration(iteration, shiftWith)
      iteration++
    })
  })

  result += `
      The Result: ${nodes[0]}${nodes[1]}${nodes[2]}${nodes[3]}
      
      `
}

function makeAnIteration(iteration, shiftWith) {
  const F = decimalNumber(binaryNumber(decimalNumber(nodes[1]) ^ decimalNumber(nodes[2]) ^ decimalNumber(nodes[3])))
  const P2 = (decimalNumber(nodes[0]) + F) % 2 ** 32
  const P3 = P2 + iteration % 2 ** 32
  const P4 = logicalShiftLeft(P3, shiftWith);

  const A = nodes[0]

  nodes[0] = binaryNumber(P4)

  swapNodes()

  return `
      1.  F = B xor C xor D:
          ${nodes[2]} XOR ${nodes[3]} XOR ${nodes[0]} = ${binaryNumber(F)}
      2.  (A + F) mod 2^32:
          (${decimalNumber(A)} + ${F}) mod 2^32 = ${P2}
      3.  P(2) + Mi mod 2^32:
          ${P2} + ${iteration} mod 2^32 = ${P3}
      4.  Circular displacement with ${shiftWith} biti left:
          ${binaryNumber(P3)} <<< ${shiftWith} = ${binaryNumber(P4)}
      5.  D => A => ${nodes[0]}
          A => B => ${nodes[1]}
          B => C => ${nodes[2]}
          C => D => ${nodes[3]}

------------------------------------------------------------
`
}

function swapNodes() {
  nodes.unshift(nodes.pop())
}

function logicalShiftLeft(numberToShift, shiftWith) {
  const binary = binaryNumber(numberToShift)

  const [leftPart, rightPart] = [binary.slice(0, 3), binary.slice(3)]

  return decimalNumber(rightPart + leftPart)
}

function binaryNumber(value, options = { withSpace: false }) {
  return typeof value == "number"
    ? new Array(33 - value.toString(2).length).join('0') + (value < 0 ? value >>> 0 : value).toString(2)
    : [...value].reduce((accumulator, currentValue) => {
      const binary = currentValue.charCodeAt(0).toString(2)
      const eightBitLeftZeros = (options.withSpace ? ' ' : '') + new Array(9 - binary.length).join('0')

      return accumulator + eightBitLeftZeros + binary
    }, '');
}

function decimalNumber(value) {
  return parseInt((value + '')
    .replace(/[^01]/gi, ''), 2)
}
