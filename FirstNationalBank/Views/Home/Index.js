function openInputField() {
    var loginForm = document.getElementById('login-form');
    loginForm.setAttribute('type', 'hidden');

    var createUserBtn = document.getElementById('create-btn');
    createUserBtn.setAttribute('type', 'hidden');

    var inputEmail = document.getElementById('email');
    inputEmail.setAttribute('type', 'text');

    var inputPassword = document.getElementById('password');
    inputPassword.setAttribute('type', 'text');

    var loginBtn = document.getElementById('login-btn');
    loginBtn.setAttribute('type', 'submit');
}