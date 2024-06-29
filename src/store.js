import { createPinia, defineStore } from 'pinia';

const pinia = createPinia();

export const useStudentStore = defineStore('student', {
  state: () => ({
    students: JSON.parse(localStorage.getItem('students')) || [
      { id: 220812022, userName: '刘淑文', age: 18 },
      { id: 220812008, userName: '蔡欣怡', age: 18 },
      { id: 220812030, userName: '龙依', age: 18 }
    ]
  }),
  actions: {
    addStudent(student) {
      student.userName = this.handleDuplicateName(student.userName);
      this.students.unshift(student);
      this.saveToLocalStorage();
    },
    updateStudent(student) {
      student.userName = this.handleDuplicateName(student.userName, student.id);
      const index = this.students.findIndex(s => s.id === student.id);
      if (index !== -1) {
        this.students.splice(index, 1);
        this.students.unshift(student);
        this.saveToLocalStorage();
      }
    },
    deleteStudent(index) {
      this.students.splice(index, 1);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('students', JSON.stringify(this.students));
    },
    isDuplicateId(id) {
      return this.students.some(student => student.id === id);
    },
    handleDuplicateName(name, id = null) {
      let count = 1;
      const originalName = name;
      while (this.students.some(student => student.userName === name && student.id !== id)) {
        name = `${originalName}${++count}`;
      }
      return name;
    }
  }
});

export default pinia;
