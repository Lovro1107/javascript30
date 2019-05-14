const canvas = document.getElementById('draw')
const ctx = canvas.getContext('2d')

let isDrawing = false
let lastX = 0
let lastY = 0
let hue = 0
let direction = true

// expand the canvas
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// set drawing style
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
ctx.lineWidth = 5
ctx.lineJoin = 'round'
ctx.lineCap = 'round'

function draw (e) {
  if (!isDrawing) {
    return false
  }

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()

  // increment the hue for some nice rainbow effect
  hue++

  // change the 'direction' of line width change
  if (ctx.lineWidth < 5 || ctx.lineWidth > 100) {
    direction = !direction
  }

  // increase/decrease the line width
  if (direction) {
    ctx.lineWidth++
  } else {
    ctx.lineWidth--
  }

  // set the last X and Y where the mouse was
  [lastX, lastY] = [e.offsetX, e.offsetY]
}

canvas.addEventListener('mousedown', (e) => {
  [lastX, lastY] = [e.offsetX, e.offsetY]
  isDrawing = true
})

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mouseup', () => (isDrawing = false))
canvas.addEventListener('mouseout', () => (isDrawing = false))