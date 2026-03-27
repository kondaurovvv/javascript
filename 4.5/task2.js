'use strict'

function Student(name) {
  this.name = name
  this.grades = []
  this.attendance = []

  this.addGrade = (grade) => {
    if(typeof grade !== 'number' || grade > 5 || grade < 1) {
      alert("Ошибка: оценка должна быть числом от 1 до 5")
      return false
    }

    this.grades.push(grade)
    alert(`Оценка ${grade} добавлена`)
    return this
  }

  this.markAttendance = (status) => {
    if (status !== 'present' && status !== 'absent') {
      alert("Ошибка: статус должен быть 'present' или 'absent'")
      return false
    }

    this.attendance.push({
      date: `${new Date().getDate()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`,
      status: status,
    })

    alert(`Посещаемость отмечена: ${status}`)

    return this
  }

  this.getAverageGrade = () => {
    if (this.grades.length === 0) {
      return 0
    }

    return Number((this.grades.reduce((acc, element) => acc + element, 0) / this.grades.length).toFixed(2))
  }

  this.countsClassAttendance = () => {
    return (this.attendance.reduce((acc, element) => element.status === 'present' ? acc+1 : acc, 0))
  }

  this.getAttendanceRate = () => {
    if (this.attendance.length === 0) {
      return 0
    }

    return Math.round((this.countsClassAttendance() / this.attendance.length) * 100)
  }

  this.getInfo = () => {
    return `Студент: ${this.name}\nСредняя оценка: ${this.getAverageGrade()}\nПосещаемость: ${this.getAttendanceRate()}%\nВсего оценок: ${this.grades.length}\nВсего занятий: ${this.countsClassAttendance()}`
  }

  this.getMaximumScore = () => {
  if (this.grades.length === 0) return null
  return Math.max(...this.grades)
  }

  this.giveBriefDescription = () => {
    if(this.getAverageGrade() >= 4.5 && this.getAttendanceRate() >= 80) {
      return 'Отличник!'
    }

    if(this.getAverageGrade() >= 3 && this.getAttendanceRate() >= 70) {
      return 'Хорошо'
    }

    return 'Требуется улучшение'
  }

  this.createReportCard = () => {
    return {
      studentName: this.name,
      averageGrade: this.getAverageGrade(),
      attendanceRate: this.getAttendanceRate(),
      topGrade: this.getMaximumScore(),
      summary: this.giveBriefDescription(),
    }
  }
}

let alice = new Student("Алиса");
let bob = new Student("Боб");

// Алиса — отличница
alice.addGrade(5).addGrade(5).addGrade(4).addGrade(5);
alice.markAttendance("present").markAttendance("present").markAttendance("present").markAttendance("absent");

// Боб — прогульщик
bob.addGrade(3).addGrade(2).addGrade(3);
bob.markAttendance("absent").markAttendance("present").markAttendance("absent");

// Выводим информацию
alert(alice.getInfo());
alert(bob.getInfo());

// Создаём отчёты
let aliceReport = alice.createReportCard();
let bobReport = bob.createReportCard();

console.log(aliceReport);
console.log(bobReport);




