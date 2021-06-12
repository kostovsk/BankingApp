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

    account.value = data.bankAccount.number;
}

function goToProfilePage() {
    window.location.href = mainURL + '/Profile/ProfilePage/' + acctId;
}