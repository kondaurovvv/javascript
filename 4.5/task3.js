'use strict'

// ==================== КОНСТРУКТОР BOOK ====================

/**
 * Конструктор для создания объекта книги
 * @constructor
 * @param {string} title - Название книги
 * @param {string} author - Автор книги
 * @param {number} year - Год издания
 */
function Book(title, author, year) {
  /** @type {string} Название книги */
  this.title = title
  
  /** @type {string} Автор книги */
  this.author = author
  
  /** @type {number} Год издания */
  this.year = year
  
  /** @type {boolean} Доступность книги (true - доступна, false - выдана) */
  this.isAvailable = true
  
  /** @type {string|null} Имя читателя, взявшего книгу (null если книга доступна) */
  this.reader = null

  /**
   * Выдаёт книгу читателю
   * @param {string} readerName - Имя читателя
   * @returns {boolean} true - если книга успешно выдана, false - если книга уже выдана
   */
  this.borrow = (readerName) => {
    if (this.isAvailable) {
      this.isAvailable = false
      this.reader = readerName
      alert(`Книга '${this.title}' выдана ${this.reader}`)
      return true
    }
    alert(`Книга '${this.title}' уже выдана ${this.reader}`)
    return false
  }

  /**
   * Возвращает книгу в библиотеку
   * @returns {boolean} true - если книга успешно возвращена, false - если книга уже в библиотеке
   */
  this.returnBook = () => {
    if (this.isAvailable) {
      alert(`Книга '${this.title}' и так в библиотеке`)
      return false
    }
    this.isAvailable = true
    this.reader = null
    alert(`Книга '${this.title}' возвращена`)
    return true
  }

  /**
   * Возвращает строковую информацию о книге
   * @returns {string} Информация о книге в формате: "{название}", {автор} ({год}) - {доступна/выдана: читатель}
   */
  this.getInfo = () => {
    const status = this.isAvailable 
      ? "доступна" 
      : `выдана: ${this.reader}`
    return `"${this.title}", ${this.author} (${this.year}) - ${status}`
  }
}

// ==================== КОНСТРУКТОР LIBRARY ====================

/**
 * Конструктор для создания объекта библиотеки
 * @constructor
 * @param {string} name - Название библиотеки
 */
function Library(name) {
  /** @type {string} Название библиотеки */
  this.name = name
  
  /** @type {Array<Book>} Массив книг в библиотеке */
  this.books = []

  /**
   * Добавляет новую книгу в библиотеку
   * @param {string} title - Название книги
   * @param {string} author - Автор книги
   * @param {number} year - Год издания
   * @returns {Library} this - для цепочек вызовов
   */
  this.addBook = (title, author, year) => {
    title ??= 'Unknown'
    author ??= 'Unknown'
    year = (typeof year !== 'number' || year < 0) ? 2024 : year

    this.books.push(new Book(title, author, year))
    alert(`Книга '${title}' добавлена в библиотеку ${this.name}`)
    return this
  }

  /**
   * Ищет книгу по названию (регистронезависимо)
   * @param {string} title - Название книги для поиска
   * @returns {Book|null} Объект книги или null, если книга не найдена
   */
  this.findBook = (title) => {
    const searchTitle = title.toLowerCase()
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].title.toLowerCase() === searchTitle) {
        return this.books[i]
      }
    }
    return null
  }

  /**
   * Выдаёт книгу читателю
   * @param {string} title - Название книги
   * @param {string} readerName - Имя читателя
   * @returns {boolean} true - если книга успешно выдана, false - если книга не найдена или уже выдана
   */
  this.borrowBook = (title, readerName) => {
    const book = this.findBook(title)
    if (!book) {
      alert(`Книга '${title}' не найдена в библиотеке`)
      return false
    }
    return book.borrow(readerName)
  }

  /**
   * Возвращает книгу в библиотеку
   * @param {string} title - Название книги
   * @returns {boolean} true - если книга успешно возвращена, false - если книга не найдена или уже в библиотеке
   */
  this.returnBook = (title) => {
    const book = this.findBook(title)
    if (!book) {
      alert(`Книга '${title}' не найдена в библиотеке`)
      return false
    }
    return book.returnBook()
  }

  /**
   * Возвращает массив названий доступных (не выданных) книг
   * @returns {Array<string>} Массив названий доступных книг
   */
  this.getAvailableBooks = () => {
    const availableTitles = []
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].isAvailable) {
        availableTitles.push(this.books[i].title)
      }
    }
    return availableTitles
  }

  /**
   * Возвращает массив объектов с информацией о выданных книгах
   * @returns {Array<{title: string, reader: string}>} Массив выданных книг
   */
  this.getBorrowedBooks = () => {
    const borrowedBooks = []
    for (let i = 0; i < this.books.length; i++) {
      if (!this.books[i].isAvailable && this.books[i].reader !== null) {
        borrowedBooks.push({
          title: this.books[i].title,
          reader: this.books[i].reader
        })
      }
    }
    return borrowedBooks
  }

  /**
   * Подсчитывает количество книг по годам издания
   * @returns {Object<number, number>} Объект, где ключ - год, значение - количество книг
   */
  this.getBooksByYear = () => {
    const booksByYear = {}
    for (let i = 0; i < this.books.length; i++) {
      const year = this.books[i].year
      if (booksByYear[year]) {
        booksByYear[year] += 1
      } else {
        booksByYear[year] = 1
      }
    }
    return booksByYear
  }

  /**
   * Находит год, в котором было издано больше всего книг
   * Если несколько годов имеют одинаковое количество книг, возвращается самый поздний год
   * @returns {number|null} Самый продуктивный год или null, если книг нет
   */
  this.getMostProductiveYear = () => {
    const booksByYear = this.getBooksByYear()
    const years = Object.keys(booksByYear)
    
    if (years.length === 0) return null
    
    let maxCount = 0
    let mostProductiveYear = null
    
    for (let i = 0; i < years.length; i++) {
      const year = Number(years[i])
      const count = booksByYear[year]
      
      if (count > maxCount) {
        maxCount = count
        mostProductiveYear = year
      } else if (count === maxCount && year > mostProductiveYear) {
        mostProductiveYear = year
      }
    }
    return mostProductiveYear
  }

  /**
   * Возвращает объект со статистикой библиотеки
   * @returns {{
   *   libraryName: string,
   *   totalBooks: number,
   *   availableBooks: number,
   *   borrowedBooks: number,
   *   mostProductiveYear: number|null,
   *   booksByYear: Object<number, number>
   * }} Объект статистики
   */
  this.getStatistics = () => {
    const borrowedCount = this.getBorrowedBooks().length
    return {
      libraryName: this.name,
      totalBooks: this.books.length,
      availableBooks: this.books.length - borrowedCount,
      borrowedBooks: borrowedCount,
      mostProductiveYear: this.getMostProductiveYear(),
      booksByYear: this.getBooksByYear()
    }
  }

  /**
   * Передаёт книгу из текущей библиотеки в другую
   * @param {Library} targetLibrary - Библиотека-получатель
   * @param {string} title - Название книги для передачи
   * @returns {boolean} true - если книга успешно передана, false - если книга не найдена или выдана
   */
  this.transferBook = (targetLibrary, title) => {
    // Находим книгу
    let bookToTransfer = null
    let indexToRemove = -1
    
    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].title === title) {
        bookToTransfer = this.books[i]
        indexToRemove = i
        break
      }
    }
    
    if (!bookToTransfer) {
      alert(`Книга '${title}' не найдена`)
      return false
    }
    
    if (!bookToTransfer.isAvailable) {
      alert("Нельзя передать выданную книгу")
      return false
    }
    
    // Добавляем в целевую библиотеку
    targetLibrary.addBook(bookToTransfer.title, bookToTransfer.author, bookToTransfer.year)
    
    // Удаляем из текущей
    this.books.splice(indexToRemove, 1)
    
    alert(`Книга '${title}' передана в библиотеку '${targetLibrary.name}'`)
    return true
  }
}

// ==================== ПРОВЕРОЧНЫЙ КОД ====================
let myLibrary = new Library("Центральная")
let schoolLibrary = new Library("Школьная")

// Добавляем книги
myLibrary.addBook("Война и мир", "Лев Толстой", 1869)
        .addBook("Преступление и наказание", "Фёдор Достоевский", 1866)
        .addBook("Мастер и Маргарита", "Михаил Булгаков", 1967)
        .addBook("Евгений Онегин", "Александр Пушкин", 1833)

// Выдаём книги
myLibrary.borrowBook("Война и мир", "Иван Петров")
myLibrary.borrowBook("Мастер и Маргарита", "Мария Сидорова")

// Пытаемся выдать уже выданную (должна быть ошибка)
myLibrary.borrowBook("Война и мир", "Пётр Иванов")

// Возвращаем книгу
myLibrary.returnBook("Война и мир")

// Статистика
let stats = myLibrary.getStatistics()
console.log(stats)

// Доступные книги
console.log("Доступные книги:", myLibrary.getAvailableBooks())

// Выданные книги
console.log("Выданные книги:", myLibrary.getBorrowedBooks())

// Передаём книгу в другую библиотеку
myLibrary.transferBook(schoolLibrary, "Евгений Онегин")

// Проверяем, что книга удалилась из исходной библиотеки
console.log("Книги в Центральной после передачи:", myLibrary.getAvailableBooks())

// Проверяем, что книга появилась в целевой
console.log("Книги в Школьной после получения:", schoolLibrary.getAvailableBooks())

// Информация о книге
let book = myLibrary.findBook("Преступление и наказание")
if (book) {
  alert(book.getInfo())
}