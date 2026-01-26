<template>
  <div class="page" v-if="destination">
    <!-- HEADER -->
    <div class="header">
      <button class="back" @click="goBack">← Volver</button>
    </div>

    <!-- ❤️ FAVORITO -->
    <button class="favorite" @click="toggleFavorite(destination)">
      {{ isFav ? '❤️' : '🤍' }}
    </button>

    <!-- HERO IMAGE -->
    <img
      :src="destination.image"
      :alt="destination.name"
      class="hero-img"
    />

    <!-- TITLE -->
    <h1 class="title">{{ destination.name }}</h1>

    <!-- CATEGORIES -->
    <div class="tags">
      <span
        v-for="tag in destination.categories"
        :key="tag"
        class="tag"
      >
        {{ tag }}
      </span>
    </div>

    <!-- DESCRIPTION -->
    <p class="description">
      {{ destination.description }}
    </p>

    <!-- 📸 GALERÍA -->
    <section
      v-if="destination.gallery && destination.gallery.length"
      class="section"
    >
      <h2>📸 Galería</h2>

      <div class="gallery">
        <img
          v-for="(img, index) in destination.gallery"
          :key="index"
          :src="img"
          :alt="`${destination.name} ${index + 1}`"
          @click="openImage(index)"
        />
      </div>

      <div class="counter">
        {{ activeIndex + 1 }} / {{ gallery.length }}
      </div>

      <!-- 🖼️ IMAGE MODAL -->
      <div
        v-if="showImage"
        class="image-modal"
        @click.self="closeImage"
      >
        <div class="modal-content">
          <button class="close" @click.stop="closeImage">✕</button>

          <div class="image-wrapper">
            <img :src="activeImage" alt="Imagen ampliada" />
          </div>
        </div>
      </div>
    </section>

    <!-- 📖 HISTORIA -->
    <section class="section">
      <h2>📖 Historia</h2>
      <p>{{ destination.history }}</p>
    </section>

    <!-- 🌤️ CLIMA -->
    <section class="section">
      <h2>🌤️ Clima</h2>
      <p>
        <strong>Tipo:</strong> {{ destination.climate.type }} <br />
        <strong>Mejor época:</strong> {{ destination.climate.bestSeason }}
      </p>
    </section>

    <!-- 🎯 ACTIVIDADES -->
    <section class="section">
      <h2>🎯 Actividades</h2>
      <ul>
        <li v-for="act in destination.activities" :key="act">
          {{ act }}
        </li>
      </ul>
    </section>

    <!-- 🍽️ GASTRONOMÍA -->
    <section class="section">
      <h2>🍽️ Gastronomía</h2>
      <ul>
        <li v-for="food in destination.gastronomy" :key="food">
          {{ food }}
        </li>
      </ul>
    </section>

    <!-- 📍 UBICACIÓN -->
    <section class="section">
      <h2>📍 Ubicación</h2>
      <p>
        {{ destination.location.city }},
        {{ destination.location.department }},
        {{ destination.location.country }}
      </p>
    </section>
    <!-- 🗺️ MAPA -->
    <section
      v-if="destination.location.lat"
      class="section"
    >
      <h2>🗺️ Mapa</h2>

      <DestinationMap
        :lat="destination.location.lat"
        :lng="destination.location.lng"
        :name="destination.name"
      />
    </section>

    <!-- 🏨 SERVICIOS TURÍSTICOS -->
<section
  v-if="destination.services && destination.services.length"
  class="services"
>
  <h2>🏨 Servicios turísticos</h2>

  <div class="services-grid">
    <div
          v-for="service in destination.services"
          :key="service.id"
          class="service-card"
        >
          <h3>{{ service.name }}</h3>
          <p>{{ service.description }}</p>

          <div class="service-actions">
            <a
              v-if="service.whatsapp"
              :href="`https://wa.me/${service.whatsapp}`"
              target="_blank"
            >
              💬 WhatsApp
            </a>

            <a
              v-if="service.website"
              :href="service.website"
              target="_blank"
            >
              🌐 Web
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="page">
    <p>Destino no encontrado</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { destinations } from '@/data/destinations'
import { useFavorites } from '@/composables/useFavorites'
import DestinationMap from '@/components/DestinationMap.vue'

const route = useRoute()
const router = useRouter()

const { toggleFavorite, isFavorite } = useFavorites()

const showImage = ref(false)
const activeIndex = ref(0)

const openImage = (index) => {
  activeIndex.value = index
  showImage.value = true
  document.body.style.overflow = 'hidden'
}

const closeImage = () => {
  showImage.value = false
  document.body.style.overflow = ''
}


const activeImage = computed(() => gallery.value[activeIndex.value])

const gallery = computed(() => destination.value?.gallery ?? [])

const destination = computed(() =>
  destinations.find(d => String(d.id) === String(route.params.id))
)

const isFav = computed(() =>
  destination.value
    ? isFavorite(destination.value.id)
    : false
)

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 80px;
}

.header {
  margin-bottom: 12px;
}

.back {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

.hero-img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  margin-bottom: 8px;
}

.tags {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.tag {
  background: #f2f2f2;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
}

.description {
  margin-bottom: 16px;
  line-height: 1.5;
}

.info div {
  margin-bottom: 8px;
}

.favorite {
  position: absolute;
  top: 16px;
  right: 16px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,.25);
}

.favorite.active {
  background: #ffeded;
  transform: scale(1.1);
}

.page {
  position: relative;
}

.section {
  margin-top: 24px;
}

.section h2 {
  font-size: 18px;
  margin-bottom: 8px;
}

.section p {
  line-height: 1.5;
}

.section ul {
  padding-left: 16px;
}

.section li {
  margin-bottom: 6px;
}

.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.gallery img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 12px;
  cursor: pointer;
  transition: transform .2s ease, box-shadow .2s ease;
}

.gallery img:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 20px rgba(0,0,0,.15);
}

.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.image-modal img {
  max-width: 90%;
  max-height: 80%;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,.5);
}

.image-modal .close {
  position: absolute;
  top: 20px;
  right: 25px;
  background: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  width: 36px;
  height: 36px;
  cursor: pointer;
}

.modal-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content img {
  max-width: 90%;
  max-height: 80%;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0,0,0,.5);
  z-index: 1;
}

.image-modal img {
  animation: zoomIn .2s ease;
}

@keyframes zoomIn {
  from {
    transform: scale(.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.services {
  margin-top: 32px;
}

.services h2 {
  margin-bottom: 16px;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 12px;
}

.service-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
}

.service-card h3 {
  margin-bottom: 6px;
}

.service-card p {
  font-size: 14px;
  color: #555;
  margin-bottom: 12px;
}

.service-actions {
  display: flex;
  gap: 12px;
}

.service-actions a {
  text-decoration: none;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 20px;
  background: #f2f2f2;
  color: #000;
}

.image-wrapper {
  z-index: 2;
}
.close {
  z-index: 6;
}
</style>