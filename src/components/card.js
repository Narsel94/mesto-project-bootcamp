import {deleteItems, putCardLike, deleteCardLike} from '../components/api.js';
import {handleOpenPopup} from './modal.js';

const templateCard = document.getElementById('template-cards').content.querySelector('.place');

//попап картинки 
const imagePopup = document.querySelector('.popup_name_image');
const imageCaptionPopup = imagePopup.querySelector('.popup__image-caption');
const imageMain = imagePopup.querySelector('.popup__image');


//функция создание карточки  
function createCard(card, idUser) {
  const cardElement = templateCard.cloneNode(true);
  const cardTitle = cardElement.querySelector('.place__title');
  const cardImage = cardElement.querySelector('.place__image');
  const cardLikesCounter = cardElement.querySelector('.place__like-counter');
  cardTitle.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  cardLikesCounter.textContent = card.likes.length;
  //на картинку слушатель открытия попапа картинки
  cardImage.addEventListener('click', () => makeImagePopup(card.name, card.link));
 
  //удаление
  const cardTrashButton = cardElement.querySelector('.place__trash-button');
  cardTrashButton.addEventListener('click', () => handleDeleteCard(cardElement, card._id));
  
  if (card.owner._id !== idUser) {
    cardTrashButton.remove();
  }

  //функция лайка
  const buttonLikeCard = cardElement.querySelector('.place__like-button');
  buttonLikeCard.addEventListener('click', () => toggleLike(card, card._id, idUser));

  renderCardLike(card, idUser, buttonLikeCard);

  return cardElement;
}

// открытие попапа картинки
function makeImagePopup(title, link) {
  imageMain.setAttribute('src', link);
  imageMain.setAttribute('alt', title)
  imageCaptionPopup.textContent = title;
  handleOpenPopup(imagePopup);
}

//функция кнопки удаления 
function handleDeleteCard(item, itemId) {
  deleteItems(itemId)
    .then(() => {
      item.remove()
    })
    .catch(err =>
      console.log(err)) 
}

//проверка наличия лайка 
function checkCardLikes(card, userId) {
  return card.likes.some(like => like._id === userId)
}

//функция постановки и улаления лайка 
function toggleLike(card, cardId, userId) {
  if(checkCardLikes(card, userId)) {
    deleteCardLike(cardId)
    .catch(err => 
      console.log(err)
    )      
  } else {
    putCardLike(cardId)
    .catch(err => 
      console.log(err)
    )  
  }
}

//функция отображения лайка 
function renderCardLike(card, idUser, button) {
  if (checkCardLikes(card, idUser)) {
    button.classList.add('place__like-buttom_liked');
  } else {
    button.classList.remove('place__like-buttom_liked');
  }
}

export default createCard;

