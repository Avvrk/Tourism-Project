<template>
  <div class="page" v-if="destination">
    <!-- HEADER -->
    <div class="header">
      <button class="back" @click="goBack">← Volver</button>
      <button class="favorite" @click="toggleFavorite(destination)">
        {{ isFav ? '❤️' : '🤍' }}
      </button>
    </div>

    <!-- HERO -->
    <section class="hero">
      <img :src="destination.image" :alt="destination.name" />
      <div class="hero-overlay">
        <h1>{{ destination.name }}</h1>
        <p>{{ destination.location.city }}, {{ destination.location.department }}</p>
      </div>
    </section>

    <!-- TAGS -->
    <div class="tags">
      <span v-for="tag in destination.categories" :key="tag" class="tag">
        {{ tag }}
      </span>
    </div>

    <!-- ESENCIA -->
    <section class="section essence">
      <h2>🌿 La esencia del destino</h2>
      <p>{{ destination.description }}</p>
    </section>

    <!-- HIGHLIGHTS -->
    <section class="highlights">
      <div class="highlight">
        🌤️
        <strong>Clima</strong>
        <span>{{ destination.climate.type }}</span>
      </div>
      <div class="highlight">
        📅
        <strong>Mejor época</strong>
        <span>{{ destination.climate.bestSeason }}</span>
      </div>
      <div class="highlight">
        🎯
        <strong>Imperdible</strong>
        <span>{{ destination.activities[0] }}</span>
      </div>
    </section>

    <!-- HISTORIA -->
    <section class="section">
      <h2>📖 Historia y raíces</h2>
      <p>{{ destination.history }}</p>
    </section>

    <!-- ACTIVIDADES -->
    <section class="section">
      <h2>🎒 Qué puedes hacer</h2>
      <ul class="list">
        <li v-for="act in destination.activities" :key="act">✨ {{ act }}</li>
      </ul>
    </section>

    <!-- GASTRONOMÍA -->
    <section class="section">
      <h2>🍽️ Sabores locales</h2>
      <ul class="list">
        <li v-for="food in destination.gastronomy" :key="food">🍴 {{ food }}</li>
      </ul>
    </section>

    <!-- GALERÍA -->
    <section v-if="gallery.length" class="section">
      <h2>📸 Momentos del lugar</h2>
      <div class="gallery">
        <img
          v-for="(img, i) in gallery"
          :key="i"
          :src="img"
          @click="openImage(i)"
        />
      </div>
    </section>

    <!-- MAPA -->
    <section class="section map-section" v-if="destination.location.lat">
      <h2>🗺️ Dónde está este lugar</h2>
      <DestinationMap
        :lat="destination.location.lat"
        :lng="destination.location.lng"
        :name="destination.name"
      />
    </section>

    <!-- SERVICIOS -->
    <section v-if="destination.services?.length" class="section">
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
            >💬 WhatsApp</a>

            <a
              v-if="service.website"
              :href="service.website"
              target="_blank"
            >🌐 Web</a>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <h2>✨ ¿Listo para vivir este destino?</h2>
      <button class="cta">Planear mi viaje 🤖</button>
    </section>

    <!-- IMAGE MODAL -->
    <div v-if="showImage" class="image-modal" @click.self="closeImage">
      <img :src="activeImage" />
      <button class="close" @click="closeImage">✕</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { destinations } from '@/data/destinations'
import { useFavorites } from '@/composables/useFavorites'
import DestinationMap from '@/components/DestinationMap.vue'

defineOptions({ name: 'DestinationDetail' })

const route = useRoute()
const router = useRouter()
const { toggleFavorite, isFavorite } = useFavorites()

const showImage = ref(false)
const activeIndex = ref(0)

const destination = computed(() =>
  destinations.find(d => String(d.id) === String(route.params.id))
)

const gallery = computed(() => destination.value?.gallery ?? [])
const activeImage = computed(() => gallery.value[activeIndex.value])

const isFav = computed(() =>
  destination.value ? isFavorite(destination.value.id) : false
)

const openImage = (i) => {
  activeIndex.value = i
  showImage.value = true
  document.body.style.overflow = 'hidden'
}

const closeImage = () => {
  showImage.value = false
  document.body.style.overflow = ''
}

const goBack = () => router.back()
</script>
<style scoped>
.page {
  padding-bottom: 90px;
}

/* HEADER */
.header {
  position: absolute;
  top: 16px;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}

.back, .favorite {
  background: white;
  border: none;
  border-radius: 20px;
  padding: 8px 12px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(0,0,0,.2);
}

/* HERO */
.hero {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.6), transparent);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  color: white;
}

.hero-overlay h1 {
  font-size: 28px;
}

.hero-overlay p {
  opacity: .9;
}

/* TAGS */
.tags {
  display: flex;
  gap: 8px;
  padding: 16px;
}

.tag {
  background: #f2f2f2;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
}

/* SECTIONS */
.section {
  padding: 0 16px;
  margin-top: 24px;
}

.section h2 {
  margin-bottom: 8px;
}

.section p {
  line-height: 1.6;
}

/* HIGHLIGHTS */
.highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  padding: 16px;
}

.highlight {
  background: white;
  border-radius: 16px;
  padding: 12px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  font-size: 13px;
}

/* LISTS */
.list li {
  margin-bottom: 6px;
}

/* GALLERY */
.gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.gallery img {
  height: 130px;
  object-fit: cover;
  border-radius: 14px;
  cursor: pointer;
}

/* SERVICES */
.services-grid {
  display: grid;
  gap: 12px;
}

.service-card {
  background: white;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
}

.service-actions {
  display: flex;
  gap: 10px;
}

.service-actions a {
  background: #f2f2f2;
  padding: 6px 12px;
  border-radius: 20px;
  text-decoration: none;
  color: black;
}

/* CTA */
.cta-section {
  margin: 32px 16px;
  background: linear-gradient(135deg, #000, #333);
  color: white;
  padding: 24px;
  border-radius: 20px;
  text-align: center;
}

.cta {
  margin-top: 12px;
  background: white;
  color: black;
  border: none;
  padding: 12px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

/* MODAL */
.image-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.image-modal img {
  max-width: 90%;
  max-height: 80%;
  border-radius: 16px;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: white;
  border-radius: 50%;
  border: none;
  width: 36px;
  height: 36px;
}
</style>