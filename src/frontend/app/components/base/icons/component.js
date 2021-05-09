export function CreateIcon(classList) {
  const icon = document.createElement('i');

  icon.classList.add(...classList.split(' '));

  return icon;
}