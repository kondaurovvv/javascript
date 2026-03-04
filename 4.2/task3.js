'use strict'

const company = {
  name: 'Vladimir',
  founded: 2026,
  departments: {
    it: {
      developers: 10,
      testers: 5,
    },
    hr: {
      recruiters: 2,
      managers: 1,
    },
  },
  isActive: true,
}

/**
 * Проверяет, является ли переданное значение строго равным `null`.
 *
 * @param {*} potentialNull - Проверяемое значение любого типа.
 *
 * @returns {boolean} - Возвращает `true` если значение является `null` иначе `false`.
 */
const isNull = (potentialNull) => {
  return potentialNull === null
}

/**
 * Выполняет глубокое клонирование объекта.
 *
 * @param {Object} obj - Объект для клонирования.
 *
 * @returns {Object} Глубокая копия объекта.
 */
// const deepClone = (obj) => {
//   const newObj = {}

//   if (typeof obj === 'object' || !isNull) {
//     for (let key in obj) {
//       if (typeof obj[key] !== 'object') {
//         newObj[key] = obj[key]
//         console.log(obj[key])
//       } else {
//         for (let subKey in obj[key]) {
//           if (typeof obj[key][subKey] !== 'object') {
//             newObj[key][subKey] = obj[key][subKey]
//             console.log(obj[key][subKey])
//           } else {
//             for (let subSubKey in obj[key][subKey]) {
//               if (typeof obj[key][subKey][subSubKey] !== 'object') {
//                 newObj[key][subKey][subSubKey] = obj[key][subKey]
//                 console.log(obj[key][subKey][subSubKey])
//               }
//             }
//           }
//         }
//       }
//     }
//   } else {
//     return obj
//   }
//   return newObj
// }

const deepClone = (obj) => {
  const newObj = {}

  // Исправлено: проверка на null и объект
  if (!isNull(obj) && typeof obj === 'object') {
    for (let key in obj) {
      if (typeof obj[key] !== 'object' || obj[key] === null) {
        newObj[key] = obj[key]
        console.log(obj[key])
      } else {
        newObj[key] = {}
        for (let subKey in obj[key]) {
          if (
            typeof obj[key][subKey] !== 'object' ||
            obj[key][subKey] === null
          ) {
            newObj[key][subKey] = obj[key][subKey]
            console.log(obj[key][subKey])
          } else {
            newObj[key][subKey] = {}
            for (let subSubKey in obj[key][subKey]) {
              if (
                typeof obj[key][subKey][subSubKey] !== 'object' ||
                obj[key][subKey][subSubKey] === null
              ) {
                newObj[key][subKey][subSubKey] = obj[key][subKey][subSubKey]
                console.log(obj[key][subKey][subSubKey])
              }
            }
          }
        }
      }
    }
  } else {
    return obj
  }
  return newObj
}

const newCompany = deepClone(company)

let nameCompany = prompt('Введите имя компаний:', '')
if (nameCompany !== '' && !isNull(nameCompany)) {
  alert('Имя компаний изменено!')

  newCompany.name = nameCompany
} else if (nameCompany === '') {
  alert('Вы не ввели значение! По умолчанию компаний присвоят имя "Бобер"')

  nameCompany = 'Бобер'
  newCompany.name = nameCompany
} else if (isNull(nameCompany)) {
  alert('Вы отменили ввод! По умолчанию компаний присвоят имя "Бобер"')

  nameCompany = 'Бобер'
  newCompany.name = nameCompany
}

let countDevelopers = prompt('Введите количество разработчиков числом:', '')
if (countDevelopers !== '' && !isNull(countDevelopers)) {
  countDevelopers = Number(countDevelopers)
  if (!isNaN(countDevelopers) && typeof countDevelopers === 'number') {
    alert('Количество разработчиков изменено!')

    newCompany.departments.it.developers = countDevelopers
  } else {
    alert(
      'Вы ввели некорректное значение! По умолчанию будет присвоено значение 3',
    )

    countDevelopers = 3
    newCompany.departments.it.developers = countDevelopers
  }
} else if (countDevelopers === '') {
  alert('Вы не ввели значение! По умолчанию будет присвоено значение 3')

  countDevelopers = 3
  newCompany.departments.it.developers = countDevelopers
} else if (isNull(countDevelopers)) {
  alert('Вы отменили ввод! По умолчанию будет присвоено значение 3')

  countDevelopers = 3
  newCompany.departments.it.developers = countDevelopers
}

let foundedCompany = prompt('Введите дату основания компаний:', '')
if (foundedCompany !== '' && !isNull(foundedCompany)) {
  foundedCompany = Number(foundedCompany)
  if (!isNaN(foundedCompany) && typeof foundedCompany === 'number') {
    alert('Дата основания компании изменена!')

    newCompany.founded = foundedCompany
  } else {
    alert(
      'Вы ввели некорректное значение! По умолчанию дата будет присвоена 2020',
    )

    foundedCompany = 3
    newCompany.founded = foundedCompany
  }
} else if (foundedCompany === '') {
  alert('Вы не ввели значение! По умолчанию дата будет присвоена 2020')

  foundedCompany = 3
  newCompany.founded = foundedCompany
} else if (isNull(foundedCompany)) {
  alert('Вы отменили ввод! По умолчанию дата будет присвоена 2020')

  foundedCompany = 3
  newCompany.founded = foundedCompany
}

/**
 * Сравнивает объекты.
 *
 * @param {Object} obj1 - первый объект для сравнения
 * @param {Object} obj2 - второй объект для сравнения
 *
 * @returns {string} - 'Это один и тот же объект' или 'Это разные объекты'
 */
const compareObjects = (obj1, obj2) => {
  if (obj1 === obj2) {
    return 'Это один и тот же объект'
  }

  return 'Это разные объекты'
}

console.log(compareObjects(company, newCompany))

console.log(company)
console.log(newCompany)
