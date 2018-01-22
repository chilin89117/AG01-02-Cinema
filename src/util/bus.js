// Add or remove a genre from 'genreslist' array
function checkFilter(category, genre, isChecked) {
  if(isChecked) {
    this[category].push(genre);
  } else {
    let index = this[category].indexOf(genre);
    if(index > -1) {
      this[category].splice(index, 1);
    }
  }
}

// Set 'day' to the one selected in days bar
function setDay(d) {
  this.day = d;
}

export {checkFilter, setDay};
