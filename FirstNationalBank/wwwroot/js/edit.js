var url = document.URL;
var myid = url.substring(url.lastIndexOf('/') + 1);
const acctId = parseInt(myid);
var bankAcctId;
var mainURL = window.location.origin;
const uri = mainURL + '/api/BankAccounts/';

const firstName = document.getElementById('edit-first-name');
const lastName = document.getElementById('edit-last-name');
const address = document.getElementById('edit-address');
const city = document.getElementById('edit-city');
const state = document.getElementById('edit-state');
const zip = document.getElementById('edit-zip');
const mmn = document.getElementById('edit-mmn');
const phone = document.getElementById('edit-phone');
const email = document.getElementById('edit-email');
const password = document.getElementById('edit-password');

const type = document.getElementById('edit-type');
const account = document.getElementById('edit-account');

var balance;
var personId;
var bankAccountId;
var bankAccountPersonId;

var zipREGEX = /^\d{5}$/;
var phoneREGEX = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
var emailREGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var passwordREGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
var accountREGEX = /^\d+$/;

function getAccount() {
    fetch(uri + acctId)
        .then(response => response.json())
        .then(data => displayAccount(data))
        .catch(error => console.error('Unable to get account.', error));
}

function updateAccount() {
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
        balance: balance,
        bankAccountId: bankAccountId,
        personId: personId
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
        password: password.value.trim(),
        personId: personId
    }

    const updatedAccount = {
        person: person,
        bankAccount: bankAccount
    }

    fetch(`${uri}${acctId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAccount)
    })
        .then(() => goToProfilePage())
        .catch(error => console.error('Unable to update item.', error));
}

function displayAccount(data) {
    firstName.value = data.person.firstName;
    lastName.value = data.person.lastName;
    address.value = data.person.address;
    city.value = data.person.city;
    state.value = data.person.state;
    zip.value = data.person.zip;
    mmn.value = data.person.mmn;
    phone.value = data.person.phone;
    email.value = data.person.email;
    password.value = data.person.password;

    balance = data.bankAccount.balance;
    personId = data.person.personId;
    bankAccountId = data.bankAccount.bankAccountId;
    bankAccountPersonId = data.bankAccount.personId;

    account.value = data.bankAccount.number;
}

function goToProfilePage() {
    window.location.href = mainURL + '/Profile/ProfilePage/' + acctId;
}