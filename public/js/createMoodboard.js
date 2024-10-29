const form = document.querySelector('form');
const saveButton = document.querySelector('.save-btn');
const cancelButton = document.querySelector('.cancel-btn');

cancelButton.addEventListener('click', () => {
    location.assign('/dashboard');
});