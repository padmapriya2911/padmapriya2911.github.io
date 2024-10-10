let userData = {
    mobile: '123',
    password: '123',
    balance: { // Using an object to store balances for each currency
        USD: 0,
        CAD: 0,
        EUR: 0,
        GBP: 0,
        INR: 0,
        JPY: 0
    },
    transactions: []
};


function showSection(sectionId) {
    const sections = document.querySelectorAll("main > section");
    sections.forEach(section => section.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
}

function login() {
    const mobile = document.getElementById("loginMobile").value;
    const password = document.getElementById("loginPassword").value;

    if (mobile === userData.mobile && password === userData.password) {
        document.getElementById("loginSection").classList.add("hidden");
        document.getElementById("navButtons").classList.remove("hidden");
        showSection('addMoney');
        resetFields();
    } else {
        displayMessage("Invalid login credentials!", "error");
    }
}

function logout() {
    document.getElementById("loginSection").classList.remove("hidden");
    document.getElementById("navButtons").classList.add("hidden");
    resetFields();
}

function resetFields() {
    document.getElementById("loginMobile").value = '';
    document.getElementById("loginPassword").value = '';
    document.getElementById("addAmount").value = '';
    document.getElementById("recipient").value = '';
    document.getElementById("sendAmount").value = '';
}

function addMoney() {
    const amount = parseInt(document.getElementById("addAmount").value);
    const currency = document.getElementById("addCurrency").value;  // Get selected currency

    if (amount > 0) {
        // Update balance for the specific currency
        if (!userData.balance[currency]) {
            userData.balance[currency] = 0;  // Initialize if currency doesn't exist
        }
        userData.balance[currency] += amount;
        
        // Save the transaction
        userData.transactions.push({ type: 'Add', amount: `${currency} ${amount}` });
        displayMessage(`Added ${currency} ${amount} to your wallet.`, "success", "addMessage");
    } else {
        displayMessage("Please enter a valid amount.", "error", "addMessage");
    }
}


function sendMoney() {
    const recipient = document.getElementById("recipient").value;
    const amount = parseInt(document.getElementById("sendAmount").value);
    const currency = document.getElementById("sendCurrency").value;  // Get selected currency

    if (recipient && amount > 0 && amount <= userData.balance[currency]) {
        // Deduct from balance for the specific currency
        userData.balance[currency] -= amount;
        
        // Save the transaction
        userData.transactions.push({ type: 'Send', recipient, amount: `${currency} ${amount}` });
        displayMessage(`Sent ${currency} ${amount} to ${recipient}.`, "success", "sendMessage");
    } else {
        displayMessage("Invalid amount or insufficient balance.", "error", "sendMessage");
    }
}



function getTransactionHistory() {
    const historyList = document.getElementById("historyList");
    historyList.innerHTML = "";
    userData.transactions.forEach(transaction => {
        const item = document.createElement("li");
        item.textContent = `${transaction.type} ${transaction.amount} ${transaction.recipient ? "to " + transaction.recipient : ""}`;
        historyList.appendChild(item);
    });
}

function checkBalance() {
    const balanceDisplay = document.getElementById("balanceDisplay");
    balanceDisplay.innerHTML = "";  // Clear previous balance

    // Iterate through all currencies and display their balances
    for (let currency in userData.balance) {
        if (userData.balance[currency] > 0) {
            const balanceItem = document.createElement("p");
            balanceItem.textContent = `Your balance in ${currency}: ${userData.balance[currency]}`;
            balanceDisplay.appendChild(balanceItem);
        }
    }

    // If no balance, show a message
    if (!balanceDisplay.hasChildNodes()) {
        balanceDisplay.textContent = "No balance available.";
    }
}


function displayMessage(message, type, messageId) {
    const msgElement = document.getElementById(messageId);
    msgElement.textContent = message;
    msgElement.style.color = type === "success" ? "green" : "red";
}
