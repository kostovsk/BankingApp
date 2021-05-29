const nope = 'https://localhost:44330/api/BankAccounts';
let transaction = [];

var url = document.URL;
var myid = url.substring(url.lastIndexOf('/') + 1);
const acctId = parseInt(myid);

const uri = ('https://localhost:44330/api/BankAccounts/' + myid);
const uri2 = ('https://localhost:44330/api/Transactions/');

function getAccount() {
    fetch(uri)
        .then(response => response.json())
        .then(data => displayAccount(data))
        .catch(error => console.error('Unable to get account.', error));
}

function getTransactions() {
    fetch(uri2 + myid)
        .then(response => response.json())
        .then(data => displayTransactions(data))
        .catch(error => console.error('Unable to get transactions.', error))
}

function addTransaction() {
    const amount = document.getElementById('amount');
    const notes = document.getElementById('notes');

    const trans = {
        amount: parseFloat(amount.value),
        notes: notes.value,
        acct_Id: acctId
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
        .then(() => {
            closeTransactionForm();
            getTransactions();
        })
        .catch(error => console.error('Unable to add transaction', error));
}

function displayAccount(data) {
    const account = document.getElementById('add-account');
    const name = document.getElementById('add-name');
    const address = document.getElementById('add-address');
    const phone = document.getElementById('add-phone');
    const email = document.getElementById('add-email');
    const balance = document.getElementById('add-balance');

    account.innerHTML = data.bankAccount.number;
    name.innerHTML = data.person.name;
    address.innerHTML = data.person.address;
    phone.innerHTML = data.person.phone;
    email.innerHTML = data.person.email;
    balance.innerHTML = data.bankAccount.balance;
}

function displayTransactions(data) {
    document.getElementById('table').style.display = 'block';
    document.getElementById('transactions').onclick = function () { hideTransactions() };

    const tBody = document.getElementById('transaction');

    data.forEach(item => {
        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode1 = document.createTextNode(item.date.slice(0, 10));
        td1.appendChild(textNode1);

        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode("Debit/Credit");
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        let textNode3 = document.createTextNode(parseFloat(item.amount));
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

function openDepositTransactionForm() {
    document.getElementById('transactionForm').style.display = 'block';
    document.getElementById('add-type').value = 'credit';
    document.getElementById('deposit').onclick = function () { closeDepositTransactionForm() };
}

function closeDepositTransactionForm() {
    document.getElementById('transactionForm').style.display = 'none';
    document.getElementById('deposit').onclick = function () { openDepositTransactionForm() };
}

function openWithdrawalTransactionForm() {
    document.getElementById('transactionForm').style.display = 'block';
    document.getElementById('add-type').value = 'debit';
    document.getElementById('withdrawal').onclick = function () { closeWithdrawalTransactionForm() };
}

function closeWithdrawalTransactionForm() {
    document.getElementById('transactionForm').style.display = 'none';
    document.getElementById('withdrawal').onclick = function () { openWithdrawalTransactionForm() };
}