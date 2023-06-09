import {renderLoading, userId} from '../index.js';
import {deleteItems, putCardLike, deleteCardLike} from './api.js';
import {handleOpenPopup, handleClosePopup} from './modal.js';

const templateCard = document.getElementById('template-cards').content.querySelector('.place');
const popupDeleteCard = document.querySelector('.popup_name_delet');
const buttonDeleteCard = popupDeleteCard.querySelector('.popup__submit-button');

//попап картинки 
const imagePopup = document.querySelector('.popup_name_image');
const imageCaptionPopup = imagePopup.querySelector('.popup__image-caption');
const imageMain = imagePopup.querySelector('.popup__image');

//функция создание карточки  
function createCard(card, idUser) {
  const cardElement = templateCard.cloneNode(true);
  const cardTitle = cardElement.querySelector('.place__title');
  const cardImage = cardElement.querySelector('.place__image');
  const buttonLikeCard = cardElement.querySelector('.place__like-button');
  const cardLikesCounter = cardElement.querySelector('.place__like-counter');
  cardTitle.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.name);
  let likesArray = card.likes;
  cardLikesCounter.textContent = card.likes.length;
  //на картинку слушатель открытия попапа картинки
 
  cardImage.addEventListener('click', () => makeImagePopup(card.name, card.link));
 
  //кнопка корзины
  const cardTrashButton = cardElement.querySelector('.place__trash-button');
  cardTrashButton.addEventListener('click', () => {
    showDelPopup(popupDeleteCard, card, card._id, cardElement);
  });
  
  //проверка для удаления кнопки корзины
  if (card.owner._id !== idUser) {
    cardTrashButton.remove();
  }

  //функция лайка
  if (checkCardLikes(card.likes, idUser)) {
    buttonLikeCard.classList.add('place__like-buttom_liked');
  }; 

  function handleLikeButton() {
    let cardLikes = card.likes;
    if (checkCardLikes(cardLikes, userId)) {
        deleteCardLike(card._id)
        .then(res => {
          console.log('del'),
          buttonLikeCard.classList.remove('place__like-buttom_liked'),
          cardLikesCounter.textContent = res.likes.length
        })
        .catch(err => console.log(err))
    } else {
      
      putCardLike(card._id)
      .then(res => {
        console.log('add'),
        buttonLikeCard.classList.add('place__like-buttom_liked'),
        cardLikesCounter.textContent = res.likes.length
      })
      .catch(err => console.log(err))
  }};

  buttonLikeCard.addEventListener('click', handleLikeButton);
  return cardElement;
}

//реализация попапа удаления 
function showDelPopup(popup, item, itemId, element) {
  handleOpenPopup(popup);
  popup.addEventListener('submit', () => handleDeleteCard(item, itemId, element));
}

// открытие попапа картинки
function makeImagePopup(title, link) {
  imageMain.setAttribute('src', link);
  imageMain.setAttribute('alt', title)
  imageCaptionPopup.textContent = title;
  handleOpenPopup(imagePopup);
}

//функция кнопки удаления 
function handleDeleteCard(item, itemId, element) {
  console.log(item, itemId)
  renderLoading(true, buttonDeleteCard)
  deleteItems(itemId)
    .then(
      element.parentNode.removeChild(element),
      handleClosePopup(popupDeleteCard)
    )
    .catch(err =>
      console.log(err))
    .finally(() => {
      renderLoading(false, buttonDeleteCard, 'Да')
    })   
}

//проверка наличия лайка 
function checkCardLikes(likeArray, userId) {
  return likeArray.some(like => like._id === userId);
}

export default createCard;

// function handleLikeButton(card, button, counter, userId) {
//   if (checkCardLikes(card.likes, userId)) {
//       deleteCardLike(card._id)
//       .then(res => {
//         console.log('del'),
//         button.classList.remove('place__like-buttom_liked'),
//         counter.textContent = res.likes.length
//       })
//       .catch(err => console.log(err))
//   } else {
    
//     putCardLike(card._id)
//     .then(res => {
//       button.classList.add('place__like-buttom_liked'),
//       counter.textContent = res.likes.length
//     })
//     .catch(err => console.log(err))
// }
// }
