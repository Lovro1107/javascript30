const checkboxes = document.querySelectorAll('input')
let start = null
let end = null

checkboxes.forEach(checkbox => checkbox.addEventListener('click', checkOthers))

// logic for checking empty checkboxes
function checkOthers (e) {
  const checkedIndex = [...checkboxes].indexOf(this)

  // check if at least two checkboxes are checked
  if ([...checkboxes].filter(checkbox => checkbox.checked).length >= 2) {
    // set the position of the first and last checked checkbox
    checkboxes.forEach((checkbox, i) => {
      if (checkbox.checked) {
        (start === null || i < start) ? start = i : end = i
      }
    })

    // reset start & end if no checkboxes are checked
  } else {
    start = null
    end = null
  }

  // check every checkbox between start & end IF:
  // - shift key is active
  if (e.shiftKey &&
    // - start & end are defined
    (start !== null && end !== null) &&
    // if the clicked checkbox isn't in between start & end
    ((checkedIndex <= start || checkedIndex >= end))) {
    checkboxes.forEach((checkbox, i) => {
      checkbox.checked = (i >= start && i <= end)
    })
  }
}
