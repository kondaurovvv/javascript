'use strict'

const library = {
  books: {},
  stats: {
    totalBooks: 0,
    readBooks: 0,
    unreadBooks: 0,
  },
  lastId: 0,
}

/**
 * Добавляет новую книгу c названием, автором, годом выпуска, прочитана она или нет.
 *
 * @param {string} title - Название книги.
 * @param {string} author - Имя автора книги.
 * @param {number} year - Год выпуска книги.
 * @param {boolean} isRead - Прочитана книга или нет.
 *
 * @returns {undefined} - Возвращает `undefined` по умолчанию.
 */
const addBook = function (title, author, year, isRead) {
  const idBook = generateId()

  library.books[idBook] = {
    title: checkForNonEmptyText(title),
    author: checkForNonEmptyText(author),
    year: checkingIsYear(year),
    isRead: checkingForNullAndUndefined(isRead),
  }

  updateStats()
}

/**
 * Удаляет книгу по ID.
 * 
 * @param {string} idBook - ID книги для удаления.
 * 
 * @returns {string} - Возвращает строку с информацией об удалений.
 */
const removeBook = (idBook) => {
  if (idBook in library.books) {
    delete library.books[idBook]

    updateStats()

    return `${idBook} - Книга была удалена!`
  }

  return `${idBook} - Такой книги нет!`
}

/**
 * Выводит в консоль все книги в читаемом формате.
 *
 * @returns {undefined} - Возвращает `undefined` по умолчанию.
 */
const showAllBooks = function () {
  let bookInformation = ''

  for (let key in library.books) {
    bookInformation = `ID: ${key}`

    for (let prop in library.books[key]) {
      let checkingBookInformation =
        library.books[key][prop] === true
          ? 'Да'
          : library.books[key][prop] === false
            ? 'Нет'
            : library.books[key][prop]

      bookInformation += ` ${stringSubstitution(prop)}: ${checkingBookInformation}`
    }

    console.log(bookInformation)
  }

  if (bookInformation === '') {
    console.log('Книг еще нет!')
  }
}

// Запуск программы.
runLibrary()

/**
 * Запускает программу.
 *
 * @returns {undefined} - Возвращает `undefined` по умолчанию.
 */
function runLibrary() {
  exit: while (true) {
    let bookTitle
    let bookAuthorsName
    let yearOfPublicationOfBook
    let bookIsRead

    let idBook

    let searchString

    let responseToClient

    let userSelection = Number(
      prompt(
        `Выберите действие:
1 - Добавить книгу
2 - Удалить книгу
3 - Найти книгу
4 - Показать все книги
5 - Показать статистику
0 - Выход`,
        1,
      ),
    )

    switch (userSelection) {
      case 1:
        // 1 - Добавить книгу.
        bookTitle = prompt('Введите название книги:', '')
        if (isNull(bookTitle)) {
          break
        }

        bookAuthorsName = prompt('Введите имя автора:', '')
        if (isNull(bookAuthorsName)) {
          break
        }

        yearOfPublicationOfBook = prompt('Введите год издания:', '')
        if (isNull(yearOfPublicationOfBook)) {
          break
        }

        yearOfPublicationOfBook = Number(yearOfPublicationOfBook)

        bookIsRead = confirm('Вы прочитали книгу? (OK - Да/Cancel - нет)')

        addBook(bookTitle, bookAuthorsName, yearOfPublicationOfBook, bookIsRead)

        alert(`Новая книга добавлена!`)

        break
      case 2:
        // 2 - Удалить книгу.
        idBook = prompt('Введите ID книги:', '')
        if (isNull(idBook)) {
          break
        }

        console.log(removeBook(idBook))

        break
      case 3:
        // 3 - Найти книгу.
        searchString = prompt('Введите название или автора книги:')
        if (isNull(searchString)) {
          break
        }

        responseToClient = findBooks(searchString)

        if (isNotEmptyObject(responseToClient)) {
          console.log(responseToClient)
        } else {
          alert('Ничего не найдено!')
        }

        break
      case 4:
        // 4 - Показать все книги.
        showAllBooks()

        break
      case 5:
        // 5 - Показать статистику.
        console.log('Текущая статистика:', library.stats);
        
        if (library.stats.totalBooks === 0) {
          alert('В Библиотеке нет книг! Статистика прочитанных книг - 0%')
        }

        if (library.stats.totalBooks > 0) {
          let booksRead = Math.round(
            (100 / (library.stats.readBooks + library.stats.unreadBooks)) *
              library.stats.readBooks,
          )

          alert(
            `Вы прочитали ${library.stats.readBooks} книги! Статистика прочитанных книг - ${booksRead}%`,
          )
        }
        break
      case 0:
        // 0 - Выход.
        alert('Вы вышли из программы. До свидания!!!')

        break exit
      default:
        // Если пользователь ввел не верное значение.
        alert('Вы ввели неверный пункт меню, попробуйте еще раз!')

        break
    }
  }
}

/**
 *  Создает `ID` книги.
 *
 * @returns {string} - Возвращает `ID` книги.
 */
function generateId() {
  return 'book' + ++library.lastId
}

/**
 * Проверяет, является ли переданное значение строго равным `null`.
 *
 * @param {*} potentialNull - Проверяемое значение любого типа.
 *
 * @returns {boolean} `true` если значение строго равно null, иначе `false`.
 */
export function isNull(potentialNull) {
  return potentialNull === null
}

/**
 * Проверяет, что строка не пустая или null.
 *
 * @param {string|null} text - Проверяемое значения, текст от пользователя.
 *
 * @returns {string} - Возвращается `Неизвестно` если строка пустая или `null`.
 */
function checkForNonEmptyText(text) {
  if (text === '' || text === null) {
    return 'Неизвестно'
  }

  return text
}

/**
 * Проверяет, что `year` является числом и находится в диапазоне от 1 до 2026 года.
 *
 * @param {*} year - Принимает любое значение для проверки.
 *
 * @returns {number} - Возвращает `2000` если проверка не проидена или `year` если все в порядке.
 */
function checkingIsYear(year) {
  if (year <= 0 || year > 2026 || isNaN(year)) {
    return 2000
  }

  return year
}

/**
 * Проверяет, что значение не `null` и не `undefined`, иначе заменяет на `false`.
 *
 * @param {boolean|null|undefined} potentialNullOrUndefined - Проверяемое значение на `null` или `undefined`.
 *
 * @returns {boolean} - Возвращает `false` если значение `null` или `undefined`, иначе potentialNullOrUndefined.
 */
function checkingForNullAndUndefined(potentialNullOrUndefined) {
  return potentialNullOrUndefined ?? false
}

/**
 * Ищет книги в объекте `library`.
 * 
 * @param {string} searchString - Запрос пользователя.
 * 
 * @returns {object} responseToClient - Возвращает объект со списком найденного.
 */
function findBooks(searchString) {
  const responseToClient = {}

  for (let key in library.books) {
    for (let prop in library.books[key]) {
      if (typeof library.books[key][prop] !== 'string' ) {
        continue
      }

      if (
        library.books[key][prop]
          .toLowerCase()
          .includes(searchString.toLowerCase())
      ) {
        responseToClient[key] = library.books[key]
        break
      }
    }
  }

  return responseToClient
}

/**
 * Проверяет, что объект пустой.
 * 
 * @param {object} obj - Объект для проверки 
 * 
 * @returns {boolean} - Если объект пустой возвращает `false`, иначе `true`.
 */
function isNotEmptyObject(obj) {
  for (let key in obj) {
    return true
  }

  return false
}

/**
 * Заменяет свойства объекта на названия значения для вывода в консоль.
 *
 * @param {*} line - Свойства объекта.
 * @returns {string} - Возвращает названия значения.
 */
function stringSubstitution(line) {
  if (line === 'title') {
    return '| Название'
  } else if (line === 'author') {
    return '| Автор'
  } else if (line === 'year') {
    return '| Год'
  }

  return '| Прочитана'
}

/**
 * Обновляет данные по библиотеки, общее количество книг, сколько прочитанных, сколько не прочитанных.
 *
 * @returns {undefined} - Возвращает `undefined` по умолчанию.
 */
function updateStats() {
  library.stats.totalBooks = 0
  library.stats.readBooks = 0
  library.stats.unreadBooks = 0

  for (let key in library.books) {
    library.stats.totalBooks += 1

    for (let prop in library.books[key]) {
      if (library.books[key][prop] === true) {
        library.stats.readBooks += 1
      } else if (library.books[key][prop] === false) {
        library.stats.unreadBooks += 1
      }
    }
  }
}