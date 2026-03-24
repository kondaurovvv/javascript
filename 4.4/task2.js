'use strict'

const calculator = {
  history: [],
  askNumbers() {
    this.numberOne = Number(prompt('Введите первое число:', 0) ?? 0) || 0
    this.numberTwo = Number(prompt('Введите второе число:', 0) ?? 0) || 0
    return this
  },
  sum() {
    this.history.push(`сумма: ${this.numberOne} + ${this.numberTwo} = ${this.numberOne + this.numberTwo}`)
    alert(this.numberOne + this.numberTwo)
    return this
  },
  multiply() {
    this.history.push(`произведение: ${this.numberOne} * ${this.numberTwo} = ${this.numberOne * this.numberTwo}`)
    alert(this.numberOne * this.numberTwo)
    return this
  },
  showHistory() {
    if(this.history.length === 0) {
      alert('История пуста')
      return this
    }
    
    alert(this.history.join('\n'))
    return this
  },
}

calculator.askNumbers().sum().askNumbers().multiply().showHistory()
