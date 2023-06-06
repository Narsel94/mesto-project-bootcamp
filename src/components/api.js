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

//получение данных карточек с сервера
export function getItems() {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
  
})
  .then(responseStatus)
};

//получение данных пользователя
export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
  .then(responseStatus)
};

//добавление карточки (на сервер)
export function setCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link,
    })
})
.then(responseStatus)
};

//Обновление данных пользователя
export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(responseStatus)
};

// обновление аватарки на сервере 
export function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(responseStatus)
};

// удалиение карточки
export function deleteItems(cardId){
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE", 
    headers: config.headers,
  })
  .then(responseStatus)
};

//постановка лайка 
export function putCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`,{
    method: "PUT",
    headers: config.headers,
  })
  .then(responseStatus)
};

//удаление лайка
export function deleteCardLike(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`,{
    method: "DELETE",
    headers: config.headers,
  })
  .then(responseStatus)
}