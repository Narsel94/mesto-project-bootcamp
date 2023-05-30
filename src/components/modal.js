//функция закрытия попапа 
function handleClosePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEsc);
}

//закрытие по overlay 
function overlayClosePopup(element) {
  if (element.target === element.currentTarget) {
    handleClosePopup(element.target);
  }
};

//функция открытия модального окна
function handleOpenPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', handleEsc);
  function overlayClosePopup(element) {
    if (element.target === element.currentTarget) {
      handleClosePopup(element.target);
    }
  }
  element.addEventListener('click',  element => overlayClosePopup(element));
};

//закрытие на ESC
function handleEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    handleClosePopup(openedPopup);
  } 
}

export {handleClosePopup, overlayClosePopup, handleOpenPopup, handleEsc};