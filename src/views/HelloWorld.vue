<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: Li Cheng
 * @Date: 2024-06-24 09:52:27
 * @LastEditors: Li Cheng
 * @LastEditTime: 2024-06-24 15:50:17
-->
<template>
  <div class="welcome-page">
    <h1>{{ welcomeMessages[currentMessageIndex] }}</h1>
    <div class="carousel">
      <img v-for="(image, index) in carouselImages"
           :key="index"
           :src="image"
           :class="{ active: index === currentImageIndex }"
           alt="Carousel Image"
           class="carousel-image"
      >
    </div>
    <div class="controls">
      <button @click="prevImage" class="control-button">Previous</button>
      <button @click="nextImage" class="control-button">Next</button>
    </div>
    <div class="card">
      <button type="button" @click="incrementCount" class="count-button">Count is {{ count }}</button>
      <p>
        click
        <code>/count is </code> to add account
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const count = ref(0);
const carouselImages = [
  'https://plus.unsplash.com/premium_photo-1683910665313-877b5dd42d4a?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1719150006650-8255498a9faf?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1719568174150-cfb595eb588b?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];
const currentImageIndex = ref(0);

const welcomeMessages = [
  'Welcome to our site!',
  'Discover amazing features.',
  'Join our community today.'
];
const currentMessageIndex = ref(0);

const incrementCount = () => {
  count.value++;
};

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % carouselImages.length;
};

const prevImage = () => {
  currentImageIndex.value = (currentImageIndex.value - 1 + carouselImages.length) % carouselImages.length;
};

// Auto change image every 5 seconds
let timer = null;
const startAutoChange = () => {
  timer = setInterval(() => {
    nextImage();
  }, 5000);
};

const stopAutoChange = () => {
  clearInterval(timer);
};

onMounted(() => {
  startAutoChange();
});

onUnmounted(() => {
  stopAutoChange();
});
</script>

<style scoped>
.welcome-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.carousel {
  margin-top: 20px;
  position: relative;
  width: 100%; /* Occupy full width */
  height: 60vh; /* Adjust height as needed */
  overflow: hidden;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.carousel-image.active {
  opacity: 1;
}

.controls {
  margin-top: 10px;
}

.control-button {
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  background-color: #4a90e2;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.control-button:hover {
  background-color: #357ebd;
}

.card {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: scale(1.05);
}

.count-button {
  padding: 10px 20px;
  margin-top: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4a90e2;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.count-button:hover {
  background-color: #357ebd;
}
</style>
