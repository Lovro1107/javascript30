// on key press play a sound
window.addEventListener('keydown', playSound)

function playSound (e) {
  const keyCode = e.which
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`)
  const key = document.querySelector(`.key[data-key="${keyCode}"]`)

  if (audio) {
    // reset the audio sound to the start so it plays from the beginning if
    // you are pressing the key furiously :)
    audio.currentTime = 0
    audio.play()

    // add the class to the div representing the keyboard key
    key.classList.add('playing')
  }
}

// remove the css class for transition when the transition is finished
const keys = document.querySelectorAll('.key')
keys.forEach(key => key.addEventListener('transitionend', removeTransition))

function removeTransition (e) {
  if (e.propertyName !== 'transform') {
    // remove the playing class
    this.classList.remove('playing')
  }
}
