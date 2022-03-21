export default function StyleChange(id, className) {
  var elements;
  var active;
  var activeButton;
  if (className) {
    elements = document.getElementsByClassName(className);
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains('active')) {
        elements[i].classList.toggle('active');
      }
    }

    for (let j = 0; j < elements.length; j++) {
      if (elements[j].getAttribute('id') === id) {
        elements[j].classList.toggle('active');
      }
    }
  } else {
    active = document.querySelector('.active');
    if (active !== null) {
      active.classList.toggle('active');
    }
    activeButton = document.getElementById(`${id}`);
    activeButton.classList.toggle('active');
  }
}
