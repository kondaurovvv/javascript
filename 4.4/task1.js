'use strict'

const counter = {
  count: 0,
  increase() {
    this.count++
    alert(`Текущий count: ${this.count}`)
    return this
  },
  decrease() {
    this.count--
    alert(`Текущий count: ${this.count}`)
    return this
  },
  reset() {
    this.count = 0
    alert(`Текущий count: ${this.count}`)
    return this
  },
}

counter.increase().increase().decrease().reset()