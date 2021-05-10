export function renderLoading(bool, saveButton) {
  if (bool) {
    if (saveButton.name === "btn-delete-card") {
      saveButton.textContent = "Удаление..."
    } else {
      saveButton.textContent = "Сохраниение..."
    }
  } else {
    if (saveButton.name === "btn-delete-card") {
      saveButton.textContent = "Да"
    } else if (saveButton.name === "btn-add-profile") {
      saveButton.textContent = "Cоздать"
    } else {
      saveButton.textContent = "Сохранить"
    }
  }
}
