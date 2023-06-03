import './styles/index.css';
import {initialCards} from '../src/components/constants.js';
import {handleClosePopup, handleOpenPopup} from '../src/components/modal.js';
import createCard from '../src/components/card.js';
import {disableSubmitButton, activateValidation} from '../src/components/validation.js'

const popupList = document.querySelectorAll('.popup');
const cardContainer = document.querySelector('.places');

// профиль
const profileItemName = document.querySelector('.profile__name');
const profileItemProfession = document.querySelector('.profile__profession');
const buttonEditAvatar = document.querySelector('.profile__button-avatar-edit');

const formEditAvatar = document.querySelector('.popup_name_avatar-edit');

// форма редактирования профиля formEditProfile
const popupEditProfile = document.querySelector('.popup_name_profile-edit');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const inputNameProfile = popupEditProfile.querySelector('.popup__input_name_name');
const inputProfessionProfile = popupEditProfile.querySelector('.popup__input_name_profession');


// // форма добавления карточек
const buttonOpenAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_name_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const inputTitleAddCardForm = popupAddCard.querySelector('.popup__input_name_name');
const inputImgUrlAddCardForm = popupAddCard.querySelector('.popup__input_name_profession');

// реализация кнопки закрытия
document.querySelectorAll('.popup__close-button').forEach(button => {
  const popupOfCloseButton = button.closest('.popup');
  button.addEventListener('click', () => {
    handleClosePopup(popupOfCloseButton)}
  );
});

//функция открытия формы редактирования профиля 
function openEditProfileForm() {
  inputNameProfile.value = profileItemName.textContent;
  inputProfessionProfile.value = profileItemProfession.textContent;
};

buttonEditAvatar.addEventListener('click', () => {
  handleOpenPopup(formEditAvatar)
});

// добавление слушателя на кнопку редактирования профиля
buttonEditProfile.addEventListener('click', () => {
  handleOpenPopup(popupEditProfile);
  openEditProfileForm();
})

//функция редактирования данных профиля 
function editProfileBio(event) {
  event.preventDefault();
  profileItemName.textContent = inputNameProfile.value;
  profileItemProfession.textContent = inputProfessionProfile.value;
  handleClosePopup(popupEditProfile);
}

// добавление слушателя на кнопку сохранения изменений
formEditProfile.addEventListener('submit', editProfileBio);

//добавление слушателя на кнопку добавления карточки
buttonOpenAddCard.addEventListener('click', () => handleOpenPopup(popupAddCard));

//функция добавления карточки на страницу 
function handleFormAddCard(event) {
  event.preventDefault();
  const card = {
    name: inputTitleAddCardForm.value,
    link: inputImgUrlAddCardForm.value
  };
  const newCard = createCard(card);
  cardContainer.prepend(newCard);
  formAddCard.reset();
  handleClosePopup(popupAddCard);
}

//добавляем слушателя на кнопку добавить карточку 
formAddCard.addEventListener('submit', handleFormAddCard);

// создание начальных карточек
initialCards.forEach(card => {
  const InitialCard = createCard(card);
  cardContainer.prepend(InitialCard);
});

//параметры для валидации
const validitySettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__input_invalid'
};

//активация валидации
activateValidation(validitySettings);

function handleSubmitForm(evt) {
  evt.preventDefault();
  evt.target.reset();
  disableSubmitButton(evt.submitter);

}

popupList.forEach((popup) => {
  popup.addEventListener('submit', handleSubmitForm);
});


