'use strict'

const inventory = {
  gold: 50,
  healthPotion: 2,
}

/**
 * Функция принимает название предмета, если предмет с таким названием уже есть
 * в инвентаре, увеличивает его на 1, если такого предмета нет добавляет его 1 шт.
 *
 * @param {string} itemName - иям предмета введённое пользователем.
 *
 * @returns - Функция ничего не возвращает (undefined).
 */
export const addItem = function (itemName) {
  if (itemName in inventory) {
    inventory[itemName] += 1
  } else {
    inventory[itemName] = 1
  }
}

for (let i = 0; i < 3; i++) {
  let itemName = prompt(
    `У Вас ${3 - i} попытки!\n Введите название предмета на английском:`,
    '',
  )

  if (isNull(itemName)) {
    alert('Вы больше не сможете добавлять предметы!')
    break
  }

  if (itemName !== '' && !isNumber(itemName)) {
    addItem(itemName)
  } else {
    i -= 1
  }
}

let removingAnItem = confirm('Хотите удалить предмет ?')

export const removeItem = (itemName) => {
  itemName in inventory
    ? delete inventory[itemName]
    : console.log('Предмет не найден')
}

if (removingAnItem) {
  let nameOfItemToDelete = prompt('Какой предмет Вы хотите удалить:', '')
  if (isNull(nameOfItemToDelete)) {
    alert('Вы больше не сможете удалять предметы!')
  } else {
    removeItem(nameOfItemToDelete)
  }
}

inventory['legendarySword'] ??= 1

console.log(`Инвентарь:`)
for (let key in inventory) {
  console.log(`${key}: ${inventory[key]}`)
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
