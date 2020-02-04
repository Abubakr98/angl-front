import { getIdToken } from "./auth";

export const postData = (url = "", method, data = {}) => {
  // Значения по умолчанию обозначены знаком *
  return fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    // referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data) // тип данных в body должен соответвовать значению заголовка "Content-Type"
  })
    .then(response => response.json())
    .catch(err => err); // парсит JSON ответ в Javascript объект
};

export const getData = (url = "", method) => {
  const token = `Bearer ${getIdToken()}`;
  console.log(token);
  
  // Значения по умолчанию обозначены знаком *
  return fetch(url, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: token,
    },
    
  })
    .then(response => response.json())
    .catch(err => err); // парсит JSON ответ в Javascript объект
};