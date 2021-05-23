const uri = 'https://localhost:44330/api/BankAccounts';

function openInputField() {
    var loginForm = document.getElementById('login-form');
    loginForm.setAttribute('type', 'hidden');

    var createUserBtn = document.getElementById('create-btn');
    createUserBtn.setAttribute('type', 'hidden');

    document.getElementById('loginForm').style.display = 'block';
}

function getPerson() {
    fetch(uri)
        .then(response => response.json())
        .then(data => verifyUser(data))
        .catch(error => console.error('Unable to get lists.', error));
}

function verifyUser(data) {
    var email = document.getElementById('email');
    var password = document.getElementById('password');

    data.forEach(item => {
        if (item.email === email.value && item.password === password.value) {
            redirectToProfilePage(item.acct_Id);
        }
    });
}

function redirectToProfilePage(id) {
    document.location = 'Profile/ProfilePage/' + id;
}

function redirectToCreateAccount() {
    document.location = 'Create/CreateAccount';
}