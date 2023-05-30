//Валидация

// показ текста ошибки
function showError(input, settings) {
  const spanId = `error-${input.id}`;
  const errorField = document.getElementById(spanId);
  input.classList.add(settings.inputErrorClass);
  errorField.textContent = input.validationMessage;
}

//скрытие текста ошибки
function hideError(input, settings) {
  const spanId = `error-${input.id}`;
  input.classList.remove(settings.inputErrorClass);
  const errorField = document.getElementById(spanId);
  errorField.textContent = "";
}

//функция проверка валидности поля ввода
function checkValid(input, settings) {
  if (input.validity.valid) {
    hideError(input, settings);
  } else {
    showError(input, settings);
  }
}

//функция проверки фалидности формы
function checkFormValidity(submitButton, form) {
  if (form.checkValidity()) {
    enableSubmitButton(submitButton);
  } else {
    disableSubmitButton(submitButton);
  }
}

//функия активации кнопки сабмита
function enableSubmitButton(submitButton) {
  submitButton.disabled = false;
}
//функия отключения кнопки сабмита
function disableSubmitButton(submitButton) {
  submitButton.disabled = true;
}

function activateValidation(settings) {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((form) => {
    setEventListeners(form, settings);
  });
}

//обработка всех форм
function setEventListeners(form, settings) {
  const inputList = form.querySelectorAll(settings.inputSelector);
  const submitButton = form.querySelector(settings.buttonSelector);
  checkFormValidity(submitButton, form);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkValid(input, settings);
      checkFormValidity(submitButton, form);
    });
  });
}

export {
  showError,
  hideError,
  checkValid,
  checkFormValidity,
  enableSubmitButton,
  disableSubmitButton,
  activateValidation,
  setEventListeners,
};
