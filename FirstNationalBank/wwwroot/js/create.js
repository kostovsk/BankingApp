﻿const uri = 'https://localhost:44330/api/BankAccounts';

function addAccount() {
    const firstName = document.getElementById('add-first-name');
    const lastName = document.getElementById('add-last-name');
    const address = document.getElementById('add-address');
    const city = document.getElementById('add-city');
    const state = document.getElementById('add-state');
    const zip = document.getElementById('add-zip');
    const mmn = document.getElementById('add-mmn');
    const phone = document.getElementById('add-phone');
    const email = document.getElementById('add-email');
    const password = document.getElementById('add-password');
    const type = document.getElementById('add-type');
    const account = document.getElementById('add-account');
    const balance = document.getElementById('add-balance');


    const bankAccount = {
        number: account.value.trim(),
        type: type.value.trim(),
        balance: parseFloat(balance.value)
    };


    const person = {
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        address: address.value.trim(),
        city: city.value.trim(),
        state: state.value.trim(),
        zip: zip.value.trim(),
        mmn: mmn.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    }

    const newAccount = {
        person: person,
        bankAccount: bankAccount
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
    const firstName = document.getElementById('add-first-name');
    const lastName = document.getElementById('add-last-name');
    const address = document.getElementById('add-address');
    const city = document.getElementById('add-city');
    const state = document.getElementById('add-state');
    const zip = document.getElementById('add-zip');
    const mmn = document.getElementById('add-mmn');
    const phone = document.getElementById('add-phone');
    const email = document.getElementById('add-email');
    const password = document.getElementById('add-password');
    const type = document.getElementById('add-type');
    const account = document.getElementById('add-account');
    const balance = document.getElementById('add-balance');

    firstName.value = '';
    lastName.value = '';
    address.value = '';
    city.value = '';
    state.value = '';
    zip.value = '';
    mmn.value = '';
    phone.value = '';
    email.value = '';
    password.value = '';
    type.value = '';
    account.value = '';
    balance.value = '';

    //window.location.replace('https://localhost:44330/Profile/ProfilePage/' + data.personId);
    document.location = 'Profile/ProfilePage/' + data.personId;
}

function test() {
    alert("I am an alert box!");
}