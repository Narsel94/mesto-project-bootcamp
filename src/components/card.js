
import {handleOpenPopup} from './modal.js';

const templateCard = document.getElementById('template-cards').content.querySelector('.place');

//попап картинки 
const imagePopup = document.querySelector('.popup_name_image');
const imageCaptionPopup = imagePopup.querySelector('.popup__image-caption');
const imageMain = imagePopup.querySelector('.popup__image');


//функция создание карточки  
function createCard(card) {
  const cardElement = templateCard.cloneNode(true);
  const cardTitle = cardElement.querySelector('.place__title');
  const cardImage = cardElement.querySelector('.place__image');
  cardTitle.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  //на картинку слушатель открытия попапа картинки
  cardImage.addEventListener('click', () => makeImagePopup(card.name, card.link));

  //удаление
  const cardTrashButton = cardElement.querySelector('.place__trash-button');
  cardTrashButton.addEventListener('click', () => handleDeleteCard(cardElement));
  //функция лайка
  const buttonLikeCard = cardElement.querySelector('.place__like-button');
  buttonLikeCard.addEventListener('click', handleLikeButtom);
  return cardElement;
}

function makeImagePopup(title, link) {
  imageMain.setAttribute('src', link);
  imageMain.setAttribute('alt', title)
  imageCaptionPopup.textContent = title;
  handleOpenPopup(imagePopup);
}

//функция кнопки удаления 
function handleDeleteCard(cardElement) {
  cardElement.remove();
}

// функция лайка
function handleLikeButtom(event) {
  const cardBlock = event.target.closest('.place');
  const likeButtom = cardBlock.querySelector('.place__like-button');
  likeButtom.classList.toggle('place__like-buttom_liked');
}

export default createCard;