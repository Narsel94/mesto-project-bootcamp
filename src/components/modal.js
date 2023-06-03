//функция закрытия попапа 
function handleClosePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
  
}

// //закрытие по overlay 
function overlayClosePopup (evt) {
  if (evt.target === evt.currentTarget) {
    handleClosePopup(evt.target)
  }
}

const popupList = document.querySelectorAll('.popup');
popupList.forEach(popup => popup.addEventListener('click', evt => overlayClosePopup(evt)))


//функция открытия модального окна
function handleOpenPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
};

//закрытие на ESC
function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    handleClosePopup(openedPopup);
  } 
}

export {handleClosePopup, overlayClosePopup, handleOpenPopup, handleEsc};

