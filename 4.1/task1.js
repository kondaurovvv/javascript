'use strict'

const person = {}

let personName = prompt('Ваше имя:', 'Гость')

if (!isNull(personName) && !(personName === '')) {
  person.name = personName
} else {
  person.name = 'Гость'
}

let personAge = prompt('Ваше возраст:', '')

if (isNumber(personAge)) {
  person.age = Number(personAge)
} else {
  person.age = null
}

console.log(person)

person.age = isNull(person.age) ? 'неизвестно' : person.age

alert(`Привет, ${person.name}! Тебе ${person.age} лет.`)

/**
 * Проверяет, является ли переданное значение типом `number`.
 *
 * @param {*} - Проверяемое значение любого типа.
 *
 * @returns {boolean} - Возвращает `true` если значение типа `number` иначе `false`.
 */
export function isNumber(potentialNumber) {
  if (
    potentialNumber === '' ||
    isNull(potentialNumber) ||
    isNaN(Number(potentialNumber))
  ) {
    return false
  }
  return true
}

/**
 * Проверяет, является ли переданное значение строго равным `null`.
 *
 * @param {*} potentialNull - Проверяемое значение любого типа.
 *
 * @returns {boolean} - Возвращает `true` если значение является `null` иначе `false`.
 */
export function isNull(potentialNull) {
  return potentialNull === null
}
