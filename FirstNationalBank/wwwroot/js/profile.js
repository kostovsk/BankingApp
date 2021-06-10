let transaction = [];

var url = document.URL;
var myid = url.substring(url.lastIndexOf('/') + 1);
const acctId = parseInt(myid);
var bankAcctId;
var mainURL = window.location.origin;

const uri = mainURL + '/api/BankAccounts/';
const uri2 = mainURL + '/api/Transactions/';

function getAccount() {
    fetch(uri + myid)
        .then(response => response.json())
        .then(data => displayAccount(data))
        .catch(error => console.error('Unable to get account.', error));
}

function getTransactions() {
    fetch(uri2 + bankAcctId)
        .then(response => response.json())
        .then(data => displayTransactions(data))
        .then(() => {
            getAccount();
        })
        .catch(error => console.error('Unable to get transactions.', error))
}

function addTransaction() {
    const type = document.getElementById('type');
    const amount = document.getElementById('amount');
    const notes = document.getElementById('notes');

    const trans = {
        amount: parseFloat(amount.value),
        notes: notes.value,
        type: type.value,
        bankAccountId: bankAcctId
    };

    fetch(uri2, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(trans)
    })
        .then(response => response.json())
        .then(data => closeTransactionForm(data))
        .then(() => {
            getTransactions();
        })
        .catch(error => console.error('Unable to add transaction', error));
}

function displayAccount(data) {
    const firstName = document.getElementById('add-first-name');
    const lastName = document.getElementById('add-last-name');
    const address = document.getElementById('add-address');
    const city = document.getElementById('add-city');
    const state = document.getElementById('add-state');
    const zip = document.getElementById('add-zip');
    const phone = document.getElementById('add-phone');
    const email = document.getElementById('add-email');
    const mmn = document.getElementById('add-mmn');

    const type = document.getElementById('acct-type');
    const balance = document.getElementById('add-balance');
    const account = document.getElementById('add-account');

    firstName.innerHTML = data.person.firstName;
    lastName.innerHTML = data.person.lastName;
    address.innerHTML = data.person.address;
    city.innerHTML = data.person.city + ',';
    state.innerHTML = data.person.state + ',';
    zip.innerHTML = data.person.zip;
    document.getElementById('phone-icon').className = 'fa fa-phone';
    phone.innerHTML = formatPhoneNumber(data.person.phone);
    document.getElementById('email-icon').className = 'fa fa-envelope';
    email.innerHTML = data.person.email;
    mmn.innerHTML = 'Inquiry Code: ' + data.person.mmn;

    type.innerHTML = capitalizeFirstLetter(data.bankAccount.type);
    balance.innerHTML = data.bankAccount.balance;
    account.innerHTML = data.bankAccount.number;

    bankAcctId = data.bankAccount.bankAccountId;
}

function displayTransactions(data) {
    document.getElementById('table').style.display = 'block';
    document.getElementById('transactions').onclick = function () { hideTransactions() };

    const tBody = document.getElementById('transaction');
    tBody.innerHTML = '';

    data.reverse().forEach(item => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode1 = document.createTextNode(item.date.slice(0, 10));
        td1.appendChild(textNode1);

        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode(item.type);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(parseFloat(item.amount).toFixed(2));
        td3.appendChild(textNode3);

        let td4 = tr.insertCell(3);
        let textNode4 = document.createTextNode(item.notes);
        td4.appendChild(textNode4);
    });

    transaction = data;
}

function hideTransactions() {
    const tBody = document.getElementById('transaction');
    tBody.innerHTML = '';

    document.getElementById('table').style.display = 'none';
    document.getElementById('transactions').onclick = function () { getTransactions() };
}

function closeTransactionForm(data) {
    if (data.type === 'credit') {
        closeDepositTransactionForm();
    }
    if (data.type === 'debit') {
        closeWithdrawalTransactionForm();
    }
}

function openDepositTransactionForm() {
    document.getElementById('transactionForm').style.display = 'block';
    document.getElementById('type').value = 'credit';
    document.getElementById('deposit').onclick = function () { closeDepositTransactionForm() };
}

function closeDepositTransactionForm() {
    document.getElementById('amount').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('transactionForm').style.display = 'none';
    document.getElementById('deposit').onclick = function () { openDepositTransactionForm() };
}

function openWithdrawalTransactionForm() {
    document.getElementById('transactionForm').style.display = 'block';
    document.getElementById('type').value = 'debit';
    document.getElementById('withdrawal').onclick = function () { closeWithdrawalTransactionForm() };
}

function closeWithdrawalTransactionForm() {
    document.getElementById('amount').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('transactionForm').style.display = 'none';
    document.getElementById('withdrawal').onclick = function () { openWithdrawalTransactionForm() };
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatPhoneNumber(string) {
    var areaCode = string.slice(0, 3);
    var middleThree = string.slice(3, 6);
    var lastFour = string.slice(6, 10);

    return ('(' + areaCode + ')' + ' ' + middleThree + '-' + lastFour);
}

function redirectToEditAccount() {
    window.location.href = mainURL + '/Edit/EditAccount/' + acctId;
}