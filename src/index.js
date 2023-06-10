import "./styles/index.css";
import { handleClosePopup, handleOpenPopup } from "../src/components/modal.js";
import createCard from "../src/components/card.js";
import {
  disableSubmitButton,
  activateValidation,
} from "../src/components/validation.js";
import { 
  getItems,
  getProfile,
  setCard,
  editProfile,
  editAvatar
} from "../src/components/api.js";
  export let userId;
 
Promise.all([getProfile(), getItems()])
  .then(([info, initialCards]) =>{
    setUserData(info),
    userId = info._id,
    initialCards.forEach((item) => {
      const InitialCard = createCard(item, userId);
      cardContainer.append(InitialCard);
    })
  })
  .catch(err => {
    console.log(err);
  });

const popupList = document.querySelectorAll(".popup");
const cardContainer = document.querySelector(".places");

// профиль
const profileItemName = document.querySelector(".profile__name");
const profileItemProfession = document.querySelector(".profile__profession");
const buttonEditAvatar = document.querySelector(".profile__button-avatar-edit");
const formEditAvatar = document.querySelector(".popup_name_avatar-edit");
const buttonSumbmitProfile = formEditAvatar.querySelector('.popup__submit-button');
const id = '';
//редактирование аватара
const popupEditAvatar = document.querySelector('.popup_name_avatar-edit');
const buttonSubmitAvatar = popupEditAvatar.querySelector('.popup__submit-button');
const inputAvatar = popupEditAvatar.querySelector('.popup__input_name_avatar');
const imgAvatar = document.querySelector('.profile__avatar');

// форма редактирования профиля formEditProfile
const popupEditProfile = document.querySelector(".popup_name_profile-edit");
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const inputNameProfile = popupEditProfile.querySelector(
  ".popup__input_name_name"
);
const inputProfessionProfile = popupEditProfile.querySelector(
  ".popup__input_name_profession"
);

// // форма добавления карточек
const buttonOpenAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_name_add-card");
const formAddCard = popupAddCard.querySelector(".popup__form");
const inputTitleAddCardForm = popupAddCard.querySelector(".popup__input_name_name");
const inputImgUrlAddCardForm = popupAddCard.querySelector(".popup__input_name_profession");
const buttonSubmitAddCArd = formAddCard.querySelector('.popup__submit-button');

// реализация кнопки закрытия
document.querySelectorAll(".popup__close-button").forEach((button) => {
  const popupOfCloseButton = button.closest(".popup");
  button.addEventListener("click", () => {
    handleClosePopup(popupOfCloseButton);
  });
});

//функция открытия формы редактирования профиля
function openEditProfileForm() {
  inputNameProfile.value = profileItemName.textContent;
  inputProfessionProfile.value = profileItemProfession.textContent;
}

//кнопка открытия попапа редактирования аватара
buttonEditAvatar.addEventListener("click", () => {
  handleOpenPopup(formEditAvatar);
});

// добавление слушателя на кнопку редактирования профиля
buttonEditProfile.addEventListener("click", () => {
  handleOpenPopup(popupEditProfile);
  openEditProfileForm();
});

//заполнение полей профиля
function setUserData(data) {
  profileItemName.textContent = data.name;
  profileItemProfession.textContent = data.about;
  imgAvatar.src = data.avatar;
}

// добавление слушателя на кнопку изменения аватара
formEditAvatar.addEventListener("submit", handleAvatarFormSubmit);

// добавление слушателя на кнопку сохранения изменений
formEditProfile.addEventListener("submit", handleProfileFormSubmit);

//добавление слушателя на кнопку добавления карточки
buttonOpenAddCard.addEventListener("click", () =>
  handleOpenPopup(popupAddCard)
);

//добавляем слушателя на кнопку добавить карточку
formAddCard.addEventListener("submit", handleAddCardFormSubmit);

//параметры для валидации
const validitySettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  buttonSelector: ".popup__submit-button",
  inputErrorClass: "popup__input_invalid",
};

//активация валидации
activateValidation(validitySettings);

function handleSubmitForm(evt) {
  evt.preventDefault();
  evt.target.reset();
  disableSubmitButton(evt.submitter);
}

popupList.forEach((popup) => {
  popup.addEventListener("submit", handleSubmitForm);
});

//функция рендеринка статуса
export function renderLoading(isLoading, button, defaultText, loadingText='Сохранение...') {
  if (isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = defaultText;
  }
}

//универсальная функция сабмита
export function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
      handleClosePopup(evt.target.closest('.popup'));
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

//функция сабмира формы редактирования профиля
function handleProfileFormSubmit(evt) {
   function makeRequest() {
      return editProfile(inputNameProfile.value, inputProfessionProfile.value).then((userData) => {
      setUserData(userData)
    });
  }
  handleSubmit(makeRequest, evt);
}

//функция сабмира формы редактирования аватара
function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return editAvatar(inputAvatar.value).then((userData) => {
      setUserData(userData)
    });
  }
  handleSubmit(makeRequest, evt);
}

//функция сабмира формы добавления карточек
function handleAddCardFormSubmit(evt) {
  function makeRequest() {
    return setCard(inputTitleAddCardForm.value, inputImgUrlAddCardForm.value).then((cardData) => {
      const newCard = createCard(cardData, cardData.owner._id)
      cardContainer.prepend(newCard);
  })
  }
  handleSubmit(makeRequest, evt, 'Создание...');
}