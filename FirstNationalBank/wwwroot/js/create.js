const uri = 'https://localhost:44330/api/BankAccounts';

function addAccount() {
    const name = document.getElementById('add-name');
    const address = document.getElementById('add-address');
    const account = document.getElementById('add-account');
    const phone = document.getElementById('add-phone');
    const email = document.getElementById('add-email');
    const password = document.getElementById('add-password');
    const balance = document.getElementById('add-balance');


    const bankAccount = {
        number: account.value.trim(),
        balance: parseFloat(balance.value)
    };


    const person = {
        name: name.value.trim(),
        address: address.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    }

    const newAccount = {
        bankAccount: bankAccount,
        person: person
    }

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAccount)
    })
        .then(response => response.json())
        .then(data => redirectToProfilePage(data))
        .then(() => {
        })
        .catch(error => console.error('Unable to add account.', error));
}

function redirectToProfilePage(data) {
    const name = document.getElementById('add-name');
    const address = document.getElementById('add-address');
    const account = document.getElementById('add-account');
    const phone = document.getElementById('add-phone');
    const email = document.getElementById('add-email');
    const password = document.getElementById('add-password');
    const balance = document.getElementById('add-balance');

    name.value = '';
    address.value = '';
    account.value = '';
    phone.value = '';
    email.value = '';
    password.value = '';
    balance.value = '';

    window.location.replace('https://localhost:44330/Profile/ProfilePage/' + data.id);
}

function test() {
    alert("I am an alert box!");
}