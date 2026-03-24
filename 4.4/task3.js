'use strict'

const deposit = function(amount) {
  if (typeof amount !== 'number' || amount <= 0) {
    alert("Ошибка: сумма должна быть положительным числом")
    return false
  }

  this.balance += amount
  this.transactions.push({
    owner: this.owner,
    type: 'deposit',
    balance: amount,
    date: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  })

  alert(`Пополнение на сумму ${amount}. Новый баланс: ${this.balance}`)
  return true
}

const withdraw = function(amount) {
  if (typeof amount !== 'number' || amount <= 0) {
    alert("Ошибка: сумма должна быть положительным числом")
    return false
  }

  if (amount > this.balance) {
    alert("Ошибка: недостаточно средств")
    return false
  }

  this.balance -= amount

  this.transactions.push({
    owner: this.owner,
    type: 'withdraw',
    balance: amount,
    date: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  })

  alert(`Снятие суммы ${amount}. Новый баланс: ${this.balance}`)
  return true
}

const transfer = function(targetAccount, amount) {
  if (typeof amount !== 'number' || amount <= 0) {
    alert("Ошибка: сумма должна быть положительным числом")
    return false
  }

  if (amount > this.balance) {
    alert("Ошибка: недостаточно средств")
    return false
  }

  if (targetAccount === null || Array.isArray(targetAccount) || typeof targetAccount !== 'object') {
    alert("Ошибка: неверный счет получателя")
    return false
  }

  if (this.withdraw(amount)) {
    targetAccount.deposit(amount)
    this.transactions.push({
      type: 'transfer_out',
      balance: amount,
      date: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      recipient: targetAccount.owner,
    })
    targetAccount.transactions.push({
      type: 'transfer_in',
      balance: amount,
      date: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}, ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      sender: this.owner,
    })
    return true
  }
  return false
}

const showBalance = function() {
  alert(`"Владелец: ${this.owner}, Баланс: ${this.balance}`)
}

const showTransactionHistory = function() {
  if (this.transactions.length === 0) {
    alert('История транзакций пуста')
    return false
  }

  let answer = ''
  for (let i = 0; i < this.transactions.length; i++) {
    answer += `${i + 1}. [${this.transactions[i].type}] ${this.transactions[i].type === 'deposit' || this.transactions[i].type === 'transfer_in' ? '+' : '-'}${this.transactions[i].balance}${this.transactions[i].type === 'transfer_out' ? ' to ' + this.transactions[i].recipient : this.transactions[i].type === 'transfer_in' ? ' from ' + this.transactions[i].sender : ''} - ${this.transactions[i].date}\n`
  }
  alert(answer)
  return true
}

const createSnapshot = function() {
  return {
    owner: this.owner,
    balance: this.balance,
    transactions: [],
    deposit: this.deposit,
    withdraw: this.withdraw,
    transfer: this.transfer,
    showBalance: this.showBalance,
    showTransactionHistory: this.showTransactionHistory,
    createSnapshot: this.createSnapshot
  };
}

const account1 = {
  owner: "Иван",
  balance: 1000,
  transactions: [],
};

const account2 = {
  owner: "Мария",
  balance: 500,
  transactions: [],
}

account1.deposit = deposit
account1.withdraw = withdraw
account1.transfer = transfer
account1.showBalance = showBalance
account1.showTransactionHistory = showTransactionHistory
account1.createSnapshot = createSnapshot

console.log(account1)

account2.deposit = deposit
account2.withdraw = withdraw
account2.transfer = transfer
account2.showBalance = showBalance
account2.showTransactionHistory = showTransactionHistory
account2.createSnapshot = createSnapshot

console.log(account2)

// Выполняем операции
account1.deposit(500);           // Пополнение на 500
account1.withdraw(200);          // Снятие 200
account1.showBalance();          // Баланс 1300
account1.transfer(account2, 300); // Перевод 300 Марии
account1.showBalance();          // Баланс 1000
account2.showBalance();          // Баланс 800
account1.showTransactionHistory(); // История Ивана (4 транзакции)
account2.showTransactionHistory(); // История Марии (1 транзакция)

// Создаём снимок
let snapshot = account1.createSnapshot();
console.log(snapshot);           // Новый объект с тем же балансом, но пустой историей
snapshot.deposit(100);           // Работает независимо от оригинала
account1.showBalance();          // Баланс Ивана не изменился (1000)
snapshot.showBalance();          // Баланс снимка 1100