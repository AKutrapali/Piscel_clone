export function getById(id) {
  return document.getElementById(id);
}

export function getByClassName(className) {
  return document.getElementsByClassName(className);
}

export function getFromLocalStorage(name) {
  return localStorage.getItem(name);
}

export function setItemToLocalStorage(name, item) {
  localStorage.setItem(name, item);
}

export function clearLocalStorage() {
  localStorage.clear();
}

export async function getLinkToImage(searchTown) {
  const url = `https://api.unsplash.com/photos/random?query=town,${searchTown}&client_id=9c3230614940bfbaeed09605f3b758cee051f9ece0bfec464e0e9d490d60be10`;
  const response = await fetch(url);
  const data = await response.json();
  const linkToImage = `${data.urls.small}`;

  setItemToLocalStorage('linkToImage', linkToImage);
  return linkToImage;
}

export function celsToForeng(celsium) {
  return ((celsium * 1.8) + 32);
}
