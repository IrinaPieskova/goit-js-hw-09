// Оголосимо об'єкт formData
const formData = { email: "", message: "" };

// Функція для збереження даних у локальному сховищі
function saveFormData() {
  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

// Функція для завантаження даних з локального сховища
function loadFormData() {
  const savedData = localStorage.getItem('feedback-form-state');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    formData.email = parsedData.email || "";
    formData.message = parsedData.message || "";
    document.querySelector('input[name="email"]').value = formData.email;
    document.querySelector('textarea[name="message"]').value = formData.message;
  }
}

// Обробник подій input
function handleInput(event) {
  const { name, value } = event.target;
  if (name in formData) {
    formData[name] = value.trim();
    saveFormData();
  }
}

// Обробник подій submit
function handleSubmit(event) {
  event.preventDefault();
  
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  // Очистити локальне сховище, об'єкт formData і поля форми
  localStorage.removeItem('feedback-form-state');
  formData.email = "";
  formData.message = "";
  document.querySelector('input[name="email"]').value = "";
  document.querySelector('textarea[name="message"]').value = "";
}

// Завантажити дані при завантаженні сторінки
window.addEventListener('DOMContentLoaded', loadFormData);

// Додати обробники подій
const form = document.querySelector('.feedback-form');
form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);