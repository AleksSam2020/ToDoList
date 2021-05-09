import { startLoadingSpinner, stopLoadingSpinner } from "./spinner/component";

export function fetchWithLoader(...args) {
  const timerId = setTimeout(() => {
    startLoadingSpinner();
  }, 300);
  
  return fetch(...args)
    .then(result => {
      clearTimeout(timerId)
      stopLoadingSpinner()
      return result;
    })
    .catch(error => {
      clearTimeout(timerId)
      stopLoadingSpinner();
      throw error;
    })
}