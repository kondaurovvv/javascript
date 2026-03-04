const library = {
  name: 'Городская библиотека',
  books: 1500,
  address: {
    city: 'Москва',
    street: 'Ленина',
    building: 10,
  },
}

const newLibrary = Object.assign({}, library)

newLibrary.name = 'Центральная библиотека'
newLibrary.address.city = 'Санкт-Петербург'

console.log(library)
console.log(newLibrary)
// Так как в name мы меняем примитивный тип данных, а во втором случае в
// объекте мы меняем значение.
