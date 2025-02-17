const toggleEye = document.getElementById('show');
const passwordField = document.getElementById('password');

toggleEye.addEventListener('click', () => {
  if (passwordField.type === 'password') {
    passwordField.type = 'text'; // Show password
    toggleEye.innerHTML = 'Hide'; // Change icon to open eye
  } else {
    passwordField.type = 'password'; // Hide password
    toggleEye.innerHTML = 'Show'; // Change icon to closed eye
  }
});

const magiclogo = document.getElementById('magiclogo');
magiclogo.addEventListener('click', () => {
  window.location.href = '/'; // Redirect to the home page
});

const google = document.getElementById('google');
google.addEventListener('click', () => {
})