import React from 'react'
import '../css/components/Main.css'
import Box from './Box'
import nums from '../data/nums.json'
import ConfettiMethod from './confettiComponent'

export default function Main() {
  // selected
  // const [freeze, setFreeze] = React.useState(false)
  // console.log(nums)
  const [tenzies, seTenzies] = React.useState(() => false)

  function rollDies(arr, finish = false) {
    seTenzies(false)
    return arr.map((n, index) => {
      return n.freeze !== true || finish
        ? { ...n, body: getRandomNumber(6), freeze: false, key: index }
        : { ...n, key: index }
    })
  }

  const [numsData, setNumsData] = React.useState(() => rollDies(nums))

  // !check if game finished or not and won or not
  // ! use every(and there is a some method) // return true or false
  React.useEffect(() => {
    const allFreeze = numsData.every((num) => num.freeze)
    const firstNumBody = numsData[0].body
    const sameBody = numsData.every((num) => num.body === firstNumBody)
    seTenzies(false)
    if (allFreeze && sameBody) {
      seTenzies(true)
      console.log('you won')
    }
  }, [numsData])
  //!---------------------------------------------------------------

  function handelRollDies(finish = false) {
    setNumsData((old) => rollDies(old, finish))
  }

  // Handel what happen when click on box (dice)
  function handelFreeze(id) {
    setNumsData((prevNumsData) =>
      prevNumsData.map((numData) => {
        return numData.id === id
          ? { ...numData, freeze: !numData.freeze }
          : numData
      }),
    )
  }

  // initialize boxes
  // and make it lazy loaded
  const [boxes, setBoxes] = React.useState(() => [
    ...numsData.map((num) => (
      <Box
        key={num.id}
        id={num.id}
        num={num.body}
        freeze={num.freeze}
        handelFreeze={handelFreeze}
      />
    )),
  ])

  // any change on numsData will update boxes
  React.useEffect(() => {
    setBoxes(() =>
      numsData.map((num) => (
        <Box
          key={num.id}
          id={num.id}
          num={num.body}
          freeze={num.freeze}
          handelFreeze={handelFreeze}
        />
      )),
    )
  }, [numsData])

  // console.log('getArrayOfRandoms', getArrayOfRandoms(12, 6))
  return (
    <main className="main">
      {tenzies && <ConfettiMethod />}
      <div className="container raw">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="boxes">{boxes.length ? boxes : '😒no boxes'}</div>

        <button
          className="btn btn-roll"
          onClick={() => handelRollDies(tenzies)}
        >
          {tenzies ? 'New Game' : 'Roll'}
        </button>
      </div>
    </main>
  )
}

// function getArrayOfRandoms(length, max) {
//   const arrayOfRandoms = []
//   for (let index = 0; index < length; index++) {
//     arrayOfRandoms[index] = getRandomNumber(max)
//   }
//   return arrayOfRandoms
// }

function getRandomNumber(max) {
  return Math.floor(Math.random() * max) + 1
}
