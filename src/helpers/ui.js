export function printMessage(message, type, place='#burger-builder') {
  const div = document.createElement('div');
  div.className = type;
  div.innerHTML =  `<p>${message}</p>`;
  document.querySelector(place).appendChild(div);
  setTimeout(() => {
    div.remove();
  }, 3000);
}