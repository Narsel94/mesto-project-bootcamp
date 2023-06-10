import { userId, renderLoading} from "../index.js";
import { deleteItems, putCardLike, deleteCardLike } from "./api.js";
import { handleOpenPopup, handleClosePopup} from "./modal.js";

const templateCard = document
  .getElementById("template-cards")
  .content.querySelector(".place");

//попап картинки
const imagePopup = document.querySelector(".popup_name_image");
const imageCaptionPopup = imagePopup.querySelector(".popup__image-caption");
const imageMain = imagePopup.querySelector(".popup__image");
const delPopup = document.querySelector(".popup_name_delet");
const dellForm = delPopup.querySelector(".popup__form");
dellForm.addEventListener('submit', handleDelPopupFormSubmit)
let element;

//функция создание карточки
function createCard(card, idUser) {
  card.isLiked = checkCardLikes(card.likes);
  const cardElement = templateCard.cloneNode(true);
  const cardTitle = cardElement.querySelector(".place__title");
  const cardImage = cardElement.querySelector(".place__image");
  const buttonLikeCard = cardElement.querySelector(".place__like-button");
  const cardLikesCounter = cardElement.querySelector(".place__like-counter");
  cardTitle.textContent = card.name;
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", card.name);
  

  cardLikesCounter.textContent = card.likes.length;
  //на картинку слушатель открытия попапа картинки

  cardImage.addEventListener("click", () =>
    makeImagePopup(card.name, card.link)
  );

  //кнопка корзины
  const cardTrashButton = cardElement.querySelector(".place__trash-button");
  cardTrashButton.setAttribute('id', card._id);
  cardTrashButton.addEventListener("click", () => openDelPopup(card._id, cardElement))
    //handleDeleteCard(card, cardElement)
  // );

    //проверка для удаления кнопки корзины
  if (card.owner._id !== idUser) {
    cardTrashButton.remove();
  } else {
    cardElement.setAttribute('id', card._id)
  }

  //отрисовка лайкнутых мною карточек
  if (checkCardLikes(card.likes)) {
    buttonLikeCard.classList.add("place__like-buttom_liked");
  }

  buttonLikeCard.addEventListener("click", () =>
    handleLikeButton(card, cardElement)
  );
  return cardElement;
}

// открытие попапа картинки
function makeImagePopup(title, link) {
  imageMain.setAttribute("src", link);
  imageMain.setAttribute("alt", title);
  imageCaptionPopup.textContent = title;
  handleOpenPopup(imagePopup);
}

//проверка наличия лайка
function checkCardLikes(likeArray) {
  return likeArray.some((like) => like._id === userId);
}

//функция постановки и удаления лайка
function handleLikeButton(card, element) {
  const queryMethod = card.isLiked
    ? deleteCardLike(card._id)
    : putCardLike(card._id);
  queryMethod
    .then((res) => {
      (card.isLiked = checkCardLikes(res.likes)),
        rendelLike(
          res.likes,
          element.querySelector(".place__like-button"),
          element.querySelector(".place__like-counter")
        );
    })
    .catch((err) => console.log(err));
}

//Отрисовка лайка
function rendelLike(likesArray, button, counter) {
  button.classList.toggle(
    "place__like-buttom_liked",
    checkCardLikes(likesArray)
  );
  counter.textContent = likesArray.length;
}

//открытие попапа удаления карточки 
function openDelPopup(cardID) {
  handleOpenPopup(delPopup);
  const buttonDelTest = delPopup.querySelector(".popup__submit-button");
  buttonDelTest.card_id = cardID;
  buttonDelTest.removeAttribute("disabled");
}

//функция удаления карточки с сервера и верстки
function handleDelPopupFormSubmit(evt) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    const initialText = submitButton.textContent;
    renderLoading(true, submitButton, initialText, 'Удаление...');
    deleteItems(evt.submitter.card_id)
    .then(
      evt.target.reset(),
      element = document.getElementById(evt.submitter.card_id),
      element.parentNode.removeChild(element),
      handleClosePopup(evt.target.closest('.popup')),
      delete submitButton.card_id
    )
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(
      renderLoading(false, submitButton, "Да"),
    )
}


export default createCard;
