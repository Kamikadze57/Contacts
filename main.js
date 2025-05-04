const tagInput = document.querySelector(".tag");
const surnameInput = document.querySelector(".surname");
const telInput = document.querySelector(".tel");
const emailInput = document.querySelector(".email");
const addBtn = document.querySelector(".contact__btn");
const contList = document.querySelector(".contact__list");

let editingIndex = -1;

function getSavedContacts() {
  const saved = localStorage.getItem("contacts");
  return saved ? JSON.parse(saved) : [];
}
function saveContacts(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}
function renderAllContacts() {
  contList.innerHTML = "";
  const contacts = getSavedContacts();
  contacts.forEach((contact, index) => renderContact(contact, index));
}
function renderContact(contact, index) {
  const listItem = document.createElement("li");
  listItem.classList.add("contact__item");
  listItem.innerHTML = `
    <div class="contact-text__box">
        <p class="contact__name">${contact.tag} ${contact.surname}</p>
        <p class="contact__tel">${contact.tel}</p>
        <p class="contact__email">${contact.email}</p>
    </div>  
    <div class="contact-btn__box">
        <button class="contact-edit__btn" data-index="${index}">Редагувати</button>
        <button class="contact-del__btn" data-index="${index}">Видалити</button>
    </div>
  `;
  const editButton = listItem.querySelector(".contact-edit__btn");
  editButton.addEventListener("click", function () {
    const indexToEdit = parseInt(this.dataset.index);
    startEditContact(indexToEdit);
  });
  const deleteButton = listItem.querySelector(".contact-del__btn");
  deleteButton.addEventListener("click", function () {
    const indexToDelete = parseInt(this.dataset.index);
    removeContact(indexToDelete);
  });
  contList.appendChild(listItem);
}
function addOrEditContact() {
  const currentTag = tagInput.value.trim();
  const currentSurname = surnameInput.value.trim();
  const currentTel = telInput.value.trim();
  const currentEmail = emailInput.value.trim();
  if (currentTag && currentSurname && currentTel && currentEmail) {
    const contacts = getSavedContacts();
    if (editingIndex !== -1) {
      contacts[editingIndex] = { tag: currentTag, surname: currentSurname, tel: currentTel, email: currentEmail };
      editingIndex = -1;
      addBtn.textContent = "Зберегти";
    } else {
      contacts.push({ tag: currentTag, surname: currentSurname, tel: currentTel, email: currentEmail });
    }
    saveContacts(contacts);
    renderAllContacts();
    clearInputFields();
  }
}
function startEditContact(index) {
  const contacts = getSavedContacts();
  const contactToEdit = contacts[index];
  tagInput.value = contactToEdit.tag;
  surnameInput.value = contactToEdit.surname;
  telInput.value = contactToEdit.tel;
  emailInput.value = contactToEdit.email;
  editingIndex = index;
  addBtn.textContent = "Оновити";
}
function removeContact(indexToDelete) {
  const contacts = getSavedContacts();
  contacts.splice(indexToDelete, 1);
  saveContacts(contacts);
  renderAllContacts();
}
function clearInputFields() {
  tagInput.value = "";
  surnameInput.value = "";
  telInput.value = "";
  emailInput.value = "";
}
addBtn.addEventListener("click", addOrEditContact);
document.addEventListener("DOMContentLoaded", renderAllContacts);
