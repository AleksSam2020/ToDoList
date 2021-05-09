export function CheckBox() {
  const input = document.createElement('input');
  
  input.setAttribute('type', 'checkbox');
  input.classList.add('form-check-input');

  return input;
}

