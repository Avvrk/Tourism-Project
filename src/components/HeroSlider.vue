<template>
  <section class="hero">
    <div
      class="hero-slider"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @mouseenter="pauseAutoplay"
      @mouseleave="startAutoplay"
    >

      <!-- SLIDES -->
      <div
        class="hero-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <article
          v-for="(slide, i) in slides"
          :key="i"
          class="hero-item"
          :class="{ active: i === currentIndex }"
          :style="{ backgroundImage: `url(${slide.image})` }"
        >
          <div class="overlay"></div>

          <div class="content">
            <h2>{{ slide.title }}</h2>
            <p v-if="slide.subtitle">{{ slide.subtitle }}</p>
            <button v-if="slide.cta">{{ slide.cta }}</button>
          </div>
        </article>
      </div>

      <!-- CONTROLS -->
      <button class="nav prev" @click="prevSlide">‹</button>
      <button class="nav next" @click="nextSlide">›</button>

      <!-- INDICATORS -->
      <div class="dots">
        <span
          v-for="(s, i) in slides"
          :key="i"
          :class="{ active: i === currentIndex }"
          @click="goToSlide(i)"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  slides: {
    type: Array,
    required: true
  }
})

const slides = props.slides
const currentIndex = ref(0)
let autoplayTimer = null

const startAutoplay = () => {
  autoplayTimer = setInterval(() => {
    nextSlide()
  }, 5000)
}

const pauseAutoplay = () => {
  clearInterval(autoplayTimer)
}

const nextSlide = () => {
  currentIndex.value =
    currentIndex.value < slides.length - 1 ? currentIndex.value + 1 : 0
}

const prevSlide = () => {
  currentIndex.value =
    currentIndex.value > 0 ? currentIndex.value - 1 : slides.length - 1
}

const goToSlide = (i) => {
  currentIndex.value = i
}

/* SWIPE */
let startX = 0
let endX = 0

const onTouchStart = (e) => {
  startX = e.touches[0].clientX
  pauseAutoplay()
}

const onTouchMove = (e) => {
  endX = e.touches[0].clientX
}

const onTouchEnd = () => {
  const diff = startX - endX
  if (diff > 50) nextSlide()
  if (diff < -50) prevSlide()
  startAutoplay()
}

onMounted(startAutoplay)
onBeforeUnmount(pauseAutoplay)
</script>

<style scoped>
.hero {
  margin-bottom: 24px;
}

.hero-slider {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
}

/* TRACK */
.hero-track {
  display: flex;
  transition: transform 0.6s cubic-bezier(.4,0,.2,1);
}

/* SLIDE */
.hero-item {
  flex: 0 0 100%;
  height: clamp(320px, 55vw, 520px);
  background-size: cover;
  background-position: center;
  position: relative;
  transform: scale(1.05);
  transition: transform 1s ease;
}

.hero-item.active {
  transform: scale(1);
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to top, rgba(0,0,0,.65), rgba(0,0,0,.15)),
    radial-gradient(circle at center, transparent, rgba(0,0,0,.4));
}

/* CONTENT */
.content {
  position: absolute;
  bottom: 24px;
  left: 24px;
  right: 24px;
  color: white;
  z-index: 2;
  backdrop-filter: blur(6px);
}

.content h2 {
  font-size: clamp(22px, 5vw, 34px);
  font-weight: 700;
  margin-bottom: 6px;
  animation: slideUp .6s ease both;
}

.content p {
  opacity: .9;
  margin-bottom: 12px;
  animation: slideUp .8s ease both;
}

.content button {
  background: linear-gradient(135deg, #ff9800, #ff5722);
  border: none;
  padding: 10px 18px;
  border-radius: 999px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 12px 28px rgba(0,0,0,.4);
}

/* NAV */
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: none;
  font-size: 26px;
  background: rgba(255,255,255,.15);
  color: white;
  backdrop-filter: blur(6px);
  cursor: pointer;
  z-index: 5;
}

.nav.prev { left: 12px; }
.nav.next { right: 12px; }

/* DOTS */
.dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 6;
}

.dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,.4);
  cursor: pointer;
  transition: all .3s ease;
}

.dots span.active {
  width: 18px;
  border-radius: 999px;
  background: white;
}

/* ANIMATION */
@keyframes slideUp {
  from {
    transform: translateY(12px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>