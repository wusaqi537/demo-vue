<template>
  <div class="list-comp">
    <h1>User List</h1>
    <div class="tool-bar">
      <button type="primary" class="add-btn" @click="showAddPopup">新增</button>
    </div>
    <ul>
      <li class="header">
        <span class="NO">序号</span>
        <span class="study-code">学号</span>
        <span class="name">姓名</span>
        <span class="year">年龄</span>
        <span class="operation">操作</span>
      </li>
      <li v-for="(item, index) in students" :key="item.id">
        <span class="NO">{{ index + 1 }}.</span>
        <span class="study-code">{{ item.id }}</span>
        <span class="name">{{ item.userName }}</span>
        <span class="year">{{ item.age }}</span>
        <span class="operation">
          <button class="dark-button" @click="deleteUser(index)">删除</button>
          <button class="dark-button" @click="showEditPopup(item)">编辑</button>
          <button class="dark-button" @click="getYourName(item.id)">问名字</button>
        </span>
      </li>
    </ul>
    <div v-if="isPopupVisible" class="pop-blank">
      <h3>{{ isEditing ? '编辑同学' : '新增同学' }}</h3>
      <div class="input-group">
        <label>学号：</label>
        <input v-model="currentStudent.id" type="number" :disabled="isEditing" @blur="checkDuplicateId" />
        <span v-if="isDuplicateId">学号重复</span>
      </div>
      <div class="input-group">
        <label>姓名：</label>
        <input v-model="currentStudent.userName" type="text" />
      </div>
      <div class="input-group">
        <label>年龄：</label>
        <input v-model="currentStudent.age" type="number" />
      </div>
      <div class="footer">
        <button class="cancel-button" @click="closePopup">取消</button>
        <button class="confirm-button" @click="isEditing ? editStudent() : addStudent()">{{ isEditing ? '保存' : '确定' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { useStudentStore } from '../store'; // 正确导入

const studentStore = useStudentStore();

const students = computed(() => studentStore.students);

const currentStudent = reactive({
  id: '',
  userName: '',
  age: ''
});

const isPopupVisible = ref(false);
const isEditing = ref(false);
const isDuplicateId = ref(false);

const deleteUser = index => {
  studentStore.deleteStudent(index);
};

const getYourName = id => {
  const student = students.value.find(item => item.id === id);
  alert(student.userName);
};

const showAddPopup = () => {
  isEditing.value = false;
  currentStudent.id = '';
  currentStudent.userName = '';
  currentStudent.age = '';
  isPopupVisible.value = true;
};

const showEditPopup = student => {
  isEditing.value = true;
  currentStudent.id = student.id;
  currentStudent.userName = student.userName;
  currentStudent.age = student.age;
  isPopupVisible.value = true;
};

const closePopup = () => {
  isPopupVisible.value = false;
  isDuplicateId.value = false;
};

const checkDuplicateId = () => {
  isDuplicateId.value = studentStore.isDuplicateId(currentStudent.id);
};

const addStudent = () => {
  if (isDuplicateId.value) return;
  studentStore.addStudent({ ...currentStudent });
  closePopup();
};

const editStudent = () => {
  if (isDuplicateId.value) return;
  studentStore.updateStudent({ ...currentStudent });
  closePopup();
};
</script>
