const config = {
  baseUrl: 'https://nomoreparties.co/v1/wbf-cohort-9',
  headers: {
    authorization: 'be1a04fc-d09b-45f3-8225-ecb620a5b972',
    'Content-Type': 'application/json'
  }
}


export function getItems() {
  return fetch('https://nomoreparties.co/v1/wbf-cohort-9/cards', {
  headers: {
    authorization: 'be1a04fc-d09b-45f3-8225-ecb620a5b972',
    'Content-Type': 'application/json'
  }
})
  .then(res => {
    if (res.ok) { 
      return res.json();
    } 
    return Promise.reject(`Ошибка: ${res.status}`)
  })
};

export function getProfile() {
  return fetch('https://nomoreparties.co/v1/wbf-cohort-9/users/me', {
    headers: {
    authorization: 'be1a04fc-d09b-45f3-8225-ecb620a5b972',
    'Content-Type': 'application/json'
  }
})

  .then(res => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
};

export function setCard(name, link) {
  return fetch('https://nomoreparties.co/v1/wbf-cohort-9/cards', {
    headers: {
      authorization: 'be1a04fc-d09b-45f3-8225-ecb620a5b972',
      'Content-Type': 'application/json'
  },
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
  return fetch('https://nomoreparties.co/v1/wbf-cohort-9/users/me', {
    method: "PATCH",
    headers: {
      authorization: 'be1a04fc-d09b-45f3-8225-ecb620a5b972',
      'Content-Type': 'application/json'
    },
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
