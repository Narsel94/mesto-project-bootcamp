const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-9',
  headers: {
    authorization: 'be1a04fc-d09b-45f3-8225-ecb620a5b972',
    'Content-Type': 'application/json'
  }
}


export function getItems() {
  return fetch(`${config.baseUrl}/cards`, {
  headers: config.headers
  
})
  .then(res => {
    if (res.ok) { 
      return res.json();
    } 
    return Promise.reject(`Ошибка: ${res.status}`)
  })
};

export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
};

export function setCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link,
    })
})
.then(res => {
  if(res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
})
};

export function editProfile(name, about) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
};


export function editAvatar(avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  })
};

// export function getCardsLikes(likes)