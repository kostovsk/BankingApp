﻿var mainURL = window.location.origin;
const uri = mainURL + '/api/BankAccounts';

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

var nameREGEX = /<(.|\n)*?>/;
var zipREGEX = /^\d{5}$/;
var phoneREGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
var emailREGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var passwordREGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
var accountREGEX = /^\d+$/;

function addAccount() {
    if (firstName.value.replace(nameREGEX, "").trim().length === 0) {
        alert("Name cannot be blank");
        return false;
    }
    if (lastName.value.replace(nameREGEX, "").trim().length === 0) {
        alert("Name cannot be blank");
        return false;
    }
    if (!zipREGEX.test(zip.value)) {
        alert("The Zip code is invalid");
        return false;
    }
    if (!phoneREGEX.test(phone.value)) {
        alert("The phone number is invalid");
        return false;
    }
    if (!emailREGEX.test(email.value)) {
        alert("The email address is invalid");
        return false;
    }
    if (!passwordREGEX.test(password.value)) {
        alert("The password needs to contain at least one number and one special character");
        return false;
    }
    if (!accountREGEX.test(account.value)) {
        alert("The account number must contain only numbers");
        return false;
    }

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

    window.location.href = mainURL + '/Profile/ProfilePage/' + data.personId;
}

function goToHomePage() {
    window.location.href = mainURL;
}

function test() {
    alert("I am an alert box!");
}