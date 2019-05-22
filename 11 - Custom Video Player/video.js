const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const toggleBtn = player.querySelector('button.toggle')
const sliders = player.querySelectorAll('input[type="range"]')
const skipps = player.querySelectorAll('[data-skip]')
const progress = player.querySelector('.progress')
const progressBar = progress.firstElementChild
let sliderActive = false
let scrubberActive = false

// play/pause the video
function togglePlay () {
  video.paused ? video.play() : video.pause()
}

// change the button icon when video plays/pauses
function handleToggleChange () {
  toggleBtn.textContent = video.paused ? '►' : '▍▍'
}

// change volume or playback speed
function handleSliderChange (e) {
  if (e.type !== 'change' && !sliderActive) {
    return
  }

  const method = this.name
  video[method] = this.value
}

// scrub video
function handleScrubbing (e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration
}

function updateProgress () {
  progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`
}

function handleSkipping () {
  const skip = parseInt(this.dataset.skip)
  video.currentTime = video.currentTime + skip
}

// event listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', handleToggleChange)
video.addEventListener('pause', handleToggleChange)
video.addEventListener('timeupdate', updateProgress)

toggleBtn.addEventListener('click', togglePlay)

progress.addEventListener('click', handleScrubbing)
progress.addEventListener('mousemove', (e) => scrubberActive && handleScrubbing(e))
progress.addEventListener('mousedown', () => (scrubberActive = true))
progress.addEventListener('mouseup', () => (scrubberActive = false))
progress.addEventListener('mouseout', () => (scrubberActive = false))

skipps.forEach(skip => {
  skip.addEventListener('click', handleSkipping)
})

sliders.forEach(slider => {
  slider.addEventListener('change', handleSliderChange)
  slider.addEventListener('mousemove', handleSliderChange)
  slider.addEventListener('mousedown', () => (sliderActive = true))
  slider.addEventListener('mouseup', () => (sliderActive = false))
})
