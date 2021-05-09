import './styles.scss';
import '../buttons/styles.scss';

export function ThemeSwither() {
  const div = document.createElement('div');
  const theme = localStorage.getItem('theme')

  if(theme) {
    document.body.classList.add(`theme-${theme}`);
  } else {
    localStorage.setItem('theme', 'dark');
  }

  div.innerHTML = `<div class="form-check form-switch">
  <label class="form-check-label sun" for="themeSwitcher"><i class="fas fa-sun"></i></label>
  <input class="form-check-input" type="checkbox" id="themeSwitcher">
  <label class="form-check-label moon" for="themeSwitcher"><i class="fas fa-moon"></i></label>
  </div>`;

  const switcher = div.querySelector('#themeSwitcher');

  switcher.addEventListener('click', changeTheme);

  if (theme && theme === 'light') {
    switcher.removeAttribute('checked');

  } else {
    switcher.setAttribute('checked', '');
  }

  return div;
}

function changeTheme({
  target: {
    checked
  }
}) {
  if(checked) {
    localStorage.setItem('theme', 'dark');
    document.body.classList.add('theme-dark');
    document.body.classList.remove('theme-light');
    document.querySelector('table').classList.add('table-striped', 'table-dark' );
  } else {
    localStorage.setItem('theme', 'light');
    document.body.classList.add('theme-light');
    document.body.classList.remove('theme-dark');
    document.querySelector('table').classList.remove('table-striped', 'table-dark');
  }
}