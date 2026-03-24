  transfer(targetAccount, amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      alert("Ошибка: сумма должна быть положительным числом")
      return false
    }

    if (amount > this.balance) {
      alert("Ошибка: недостаточно средств")
      return false
    }

    if (targetAccount === null || Array.isArray(targetAccount) || targetAccount !== 'object') {
      alert("Ошибка: неверный счет получателя")
      return false
    }

    if (this.withdraw(amount)) {
      targetAccount.deposit(amount)
      this.transactions.push({
        type: 'transfer_out',
        balance: amount,
        date: new Date(),
        owner: targetAccount.owner,
      })
    }

  },