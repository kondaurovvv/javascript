'use strict'

function Car(brand, speed = 10) {
  this.brand = brand,
  this.speed = speed,

  this.accelerate = () => {
    this.speed += 10
    alert(`Марка: ${this.brand}, скорость: ${this.speed} км/ч`)
    return this
  }

  this.brake = () => {
    if (this.speed > 10) {
      this.speed -= 10
      alert(`Марка: ${this.brand}, скорость: ${this.speed} км/ч`)
      return this
    }
    alert(`Марка: ${this.brand}, скорость: ${this.speed} км/ч`)
    return this
  }
}

const toyota = new Car("Toyota", 20)
const bmw = new Car("BMW", 10)

toyota.accelerate().accelerate().brake().brake().brake().brake()
bmw.accelerate().accelerate().brake().brake().brake().brake().brake()
