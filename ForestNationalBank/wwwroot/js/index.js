function openInputField() {
    var loginForm = document.getElementById('login-form');
    loginForm.setAttribute('type', 'hidden');

    var createUserBtn = document.getElementById('create-btn');
    createUserBtn.setAttribute('type', 'hidden');

    document.getElementById('loginForm').style.display = 'block';
}

function redirectToProfilePage() {
    document.location = 'Profile';
}

function redirectToCreateAccount() {
    document.location = 'Create';
}