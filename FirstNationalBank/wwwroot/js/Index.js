const uri = 'api/BankAccounts';

function openInputField() {
    var loginForm = document.getElementById('login-form-btn');
    loginForm.style.display = 'none';

    var createUserBtn = document.getElementById('create-btn');
    createUserBtn.style.display = 'none';

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
    var emailREGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var passwordREGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    var user = false;
    var pass = false;
    var id = -1;

    if (!emailREGEX.test(email.value)) {
        alert("The input needs to be an email");
        return false;
    }
    if (!passwordREGEX.test(password.value)) {
        alert("The password needs to contain at least one number and one special character");
        return false;
    }

    data.forEach(item => {
        if (item.email === email.value) {
            user = true;
            if (item.password === password.value) {
                pass = true;
                id = item.personId;
            }
        }
    });

    if (user) {
        if (pass) {
            redirectToProfilePage(id);
        }
        else {
            window.alert("Password is incorrect!");
        }
    }
    else {
        window.alert("User is incorrect!");
    }

}

function redirectToProfilePage(id) {
    window.location.href = 'Profile/ProfilePage/' + id;
}

function redirectToCreateAccount() {
    window.location.href = 'Create/CreateAccount';
}