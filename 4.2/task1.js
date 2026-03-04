const student = {
  name: 'Vladimir',
  age: 33,
  isActive: true,
}

const newStudent = student

newStudent.name = 'Andrei'

console.log(student.name)
console.log(newStudent.name)

console.log(student === newStudent)

// true так как они сравнивают объекты по ссылке
