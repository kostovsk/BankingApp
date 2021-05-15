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

    //number: account.value.trim(),
    //balance: parseFloat(balance.value)

    const person = {
        name: name.value.trim(),
        address: address.value.trim(),
        phone: phone.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    }

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bankAccount)
    })
        .then(response => response.json())
        .then(() => {
            //getItems();
            // TODO new function redirect with post call to person controller
            account.value = '';
            balance.value = '';
        })
        .catch(error => console.error('Unable to add account.', error));
}

function test() {
    alert("I am an alert box!");
}