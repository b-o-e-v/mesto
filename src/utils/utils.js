export function renderLoading(form) {
  if (form.classList.contains("popup__form_type_add")) {
    form.querySelector(".popup__save").textContent = "Создать";
  } else {
    form.querySelector(".popup__save").textContent = "Сохранить";
  }
}
