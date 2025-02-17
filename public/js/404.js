const magiclogo = document.getElementById('magiclogo');
magiclogo.addEventListener('click', () => {
    window.location.href = '/'; // Redirect to the home page
});

const goback = document.getElementById('goback');
goback.addEventListener('click', () => {
    window.history.back(); // Go back to the previous page
});