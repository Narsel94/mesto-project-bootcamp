const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-9',
  headers: {
    authorization: 'be1a04fc-d09b-45f3-8225-ecb620a5b972',
    'Content-Type': 'application/json'
  }
}


//проверка ответа сервера 
export const responseStatus = (res) => {
  if (res.ok) {
    return res.json();
  } 
  return Promise.reject(`Ошибка: ${res.status}`)
}

//универсальная функция запроса 
function request(url, options) {
  return fetch(url, options).then(responseStatus )
}

//получение данных карточек с сервера
export function getItems() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers})
}

//получение данных пользователя
export function getProfile() {
  return request(`${config.baseUrl}/users/me`, 
  {headers: config.headers})
}

//добавление карточки (на сервер)
export function setCard(name, link) {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    })
})
}

//Обновление данных пользователя
export function editProfile(name, about) {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}

// обновление аватарки на сервере 
export function editAvatar(avatar) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
}

// удалиение карточки
export function deleteItems(cardId){
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE", 
    headers: config.headers,
  })
}

//постановка лайка 
export function putCardLike(cardId){
  return request(`${config.baseUrl}/cards/${cardId}/likes`,{
    method: "PUT",
    headers: config.headers,
  })
}

//удаление лайка
export function deleteCardLike(cardId){
  return request(`${config.baseUrl}/cards/${cardId}/likes`,{
    method: "DELETE",
    headers: config.headers,
  })
}