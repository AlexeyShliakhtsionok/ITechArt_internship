export function Search(userInput) {
  var rows = document.getElementsByTagName('tr');
  for (let k = 0; k < rows.length; k++) {
    rows[k].classList.remove('activeRow');
  }
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].cells.length; j++) {
      if (rows[i].cells[j].innerText === userInput) {
        rows[i].classList.toggle('activeRow');
      }
    }
  }
}
