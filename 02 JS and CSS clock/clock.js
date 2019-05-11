const hourHand = document.querySelector('.hour-hand')
const minuteHand = document.querySelector('.min-hand')
const secondHand = document.querySelector('.second-hand')

setInterval(setTime, 1000)

function setTime () {
  // get current date
  const now = new Date()
  const hour = now.getHours()
  const minute = now.getMinutes()
  const seconds = now.getSeconds()

  // calculate the degrees for the hand rotation
  // const secondDegrees = second ? ((360 / 60) * second) + 90 : 450
  const secondDegrees = seconds ? (6 * seconds) + 90 : 450
  const minuteDegrees = minute ? (6 * minute) + 90 : 450
  // the hour hand will be moved for 6 degrees each 12 minutes
  // so it doesn't jump for a whole hour the last second
  const hourDegreesAdditional = (Math.floor(minute / 12) * 6)
  const hourDegrees = hour ? (30 * hour) + hourDegreesAdditional + 90 : 450

  // move the clock hands
  hourHand.style.transform = `rotate(${hourDegrees}deg)`
  minuteHand.style.transform = `rotate(${minuteDegrees}deg)`
  secondHand.style.transform = `rotate(${secondDegrees}deg)`

  const hands = [
    { el: hourHand, deg: hourDegrees },
    { el: minuteHand, deg: minuteDegrees },
    { el: secondHand, deg: secondDegrees }
  ]

  // When a hand reaches the top, reset it's degree rotation back to 90 degrees.
  // But before doing that, the transition time must be set to 0 seconds
  // so the rotation from 450 to 90 degrees isn't visible.
  // After the rotation, the transition speed must be set back to 0.5s
  hands.forEach(hand => {
    if (hand.deg === 450) {
      // the timeout is set to 300 so the back rotation starts
      // after the initial hand transition
      setTimeout(() => {
        hand.el.style.transition = '0s'
        hand.el.style.transform = `rotate(90deg)`
        setTimeout(() => {
          hand.el.style.transition = '0.05s cubic-bezier(0, 5.19, 0.9, -0.37)'
        }, 250)
      }, 300)
    }
  })
}
