import React from 'react'
import '../css/components/Main.css'
import Box from './Box'
import nums from '../data/nums.json'

export default function Main() {
  // selected
  // const [freeze, setFreeze] = React.useState(false)
  // console.log(nums)

  function rollDies(arr, finish = false) {
    return arr.map((n, index) => {
      return n.freeze !== true || finish
        ? { ...n, body: getRandomNumber(6), freeze: false, key: index }
        : { ...n, key: index }
    })
  }

  const [numsData, setNumsData] = React.useState(() => rollDies(nums))

  // !check if game finished or not
  React.useEffect(() => {
    let freeze = 0
    // freeze
    for (let index = 0; index < numsData.length; index++) {
      if (numsData[index].freeze) {
        freeze++
      }
    }

    let success = 0
    // success
    if (freeze === numsData.length) {
      console.log(numsData)
      for (let s = 0; s < numsData.length - 1; s++) {
        if (numsData[s].body === numsData[s + 1].body) {
          success++
        }
      }
      // alert success
      console.log('freeze + success :', freeze, success, numsData.length)
      if (success + 1 === numsData.length) {
        alert('congrats')
        setNumsData((old) => rollDies(old, true))
      } else {
        alert('wrong freeze')
      }
    }
  }, [numsData])

  function handelRollDies() {
    setNumsData((old) => rollDies(old))
  }

  //! the problem is here
  //! why its not working
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
      <div className="container raw">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="boxes">{boxes.length ? boxes : '😒no boxes'}</div>

        <button className="btn btn-roll" onClick={handelRollDies}>
          Roll
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
