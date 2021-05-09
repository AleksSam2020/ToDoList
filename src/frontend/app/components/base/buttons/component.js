import './styles.scss';


export function Button({ classList, content, clickHandler, type = 'button'}) {
  const btn = document.createElement('button');

  btn.classList.add(...classList.split(' '));

  btn.textContent = content;
  btn.setAttribute('type', type);

  if(clickHandler) {
    btn.addEventListener('click', clickHandler);
  }

  return btn;
}

