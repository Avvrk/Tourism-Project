<template>
  <div class="page" v-if="destination">

    <!-- HEADER -->
    <div class="header">
      <button class="back" @click="goBack">← Volver</button>
    </div>

    <!-- HERO -->
    <section class="hero">
      <img v-if="destination.image" :src="destination.image" :alt="destination.name" />
      <div class="hero-overlay">
        <h1>{{ destination.name }}</h1>
        <p v-if="destination.municipio">
          {{ destination.municipio.name }}
        </p>
      </div>
    </section>

    <!-- TAGS -->
    <div class="tags" v-if="destination.categories?.length">
      <span
        v-for="cat in destination.categories"
        :key="cat"
        class="tag"
      >
        {{ cat }}
      </span>
    </div>

    <!-- DESCRIPCIÓN -->
    <section class="section">
      <h2>📍 Sobre este destino</h2>
      <p>{{ destination.description }}</p>
    </section>

    <!-- DIFICULTAD -->
    <section class="section" v-if="destination.difficulty">
      <h3>Dificultad</h3>
      <p>{{ destination.difficulty }}</p>
    </section>

    <!-- GALERÍA -->
    <section class="section" v-if="gallery.length">
      <h2>📸 Galería</h2>
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
    <section
      class="section"
      v-if="destination.latitude && destination.longitude"
    >
      <h2>🗺️ Ubicación</h2>
      <DestinationMap
        :lat="destination.latitude"
        :lng="destination.longitude"
        :name="destination.name"
      />
    </section>

    <!-- MODAL -->
    <div v-if="showImage" class="image-modal" @click.self="closeImage">
      <img :src="activeImage" />
      <button class="close" @click="closeImage">✕</button>
    </div>
  </div>

  <div v-else class="loading">
    Cargando destino...
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDestinoBySlug } from '@/services/destinosService'
import DestinationMap from '@/components/DestinationMap.vue'

defineOptions({ name: 'DestinationDetail' })

const route = useRoute()
const router = useRouter()

const destination = ref(null)
const showImage = ref(false)
const activeIndex = ref(0)

onMounted(async () => {
  try {
    destination.value = await getDestinoBySlug(route.params.destinoSlug)
  } catch (err) {
    console.error('Error cargando destino:', err)
  }
})

const gallery = computed(() => destination.value?.gallery || [])
const activeImage = computed(() => gallery.value[activeIndex.value])

const openImage = (i) => {
  activeIndex.value = i
  showImage.value = true
}

const closeImage = () => {
  showImage.value = false
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