<template>
  <div v-if="municipio" class="municipio-page">

    <!-- HERO -->
    <section class="hero">
      <img
        v-if="municipio.image"
        :src="municipio.image"
        :alt="municipio.name"
        class="hero-image"
      />
      <div class="hero-overlay">
        <h1>{{ municipio.name }}</h1>
        <p v-if="municipio.province">{{ municipio.province }}</p>
      </div>
    </section>

    <!-- DESCRIPCIÓN -->
    <section class="description" v-if="municipio.description">
      <p>{{ municipio.description }}</p>
    </section>

    <!-- FILTROS -->
    <section v-if="categories.length" class="filters">
      <button
        :class="{ active: !selectedCategory }"
        @click="selectedCategory = null"
      >
        Todos
      </button>

      <button
        v-for="category in categories"
        :key="category"
        :class="{ active: selectedCategory === category }"
        @click="selectedCategory = category"
      >
        {{ category }}
      </button>
    </section>

    <!-- DESTINOS -->
    <section class="destinos">
      <DestinationList
        :destinations="filteredDestinos"
        @select="goToDestination"
        />
    </section>

  </div>

  <div v-else class="loading">
    Cargando municipio...
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getMunicipioBySlug } from '@/services/municipiosService'
import { getDestinosByMunicipio } from '@/services/destinosService'

import DestinationList from '@/components/DestinationList.vue'

const route = useRoute()
const router = useRouter()

const municipio = ref(null)
const destinos = ref([])
const selectedCategory = ref(null)
const loading = ref(true)

/* 👉 NAVEGACIÓN AL DESTINO (CORREGIDA) */
const goToDestination = (destino) => {
  router.push({
    name: 'DestinationDetail',
    params: {
      municipioSlug: municipio.value.slug,
      destinoSlug: destino.slug
    }
  })
}

onMounted(async () => {
  try {
    // 👇 PARAM CORRECTO
    const municipioSlug = route.params.municipioSlug

    // 1️⃣ Municipio
    municipio.value = await getMunicipioBySlug(municipioSlug)

    // 2️⃣ Destinos del municipio
    destinos.value = await getDestinosByMunicipio(municipio.value.id)
  } catch (error) {
    console.error('Error cargando municipio o destinos:', error)
  } finally {
    loading.value = false
  }
})

/* CATEGORÍAS */
const categories = computed(() => {
  return [...new Set(
    destinos.value.flatMap(d => d.categories || [])
  )]
})

const filteredDestinos = computed(() => {
  if (!selectedCategory.value) return destinos.value
  return destinos.value.filter(d =>
    d.categories?.includes(selectedCategory.value)
  )
})
</script>

<style scoped>
.municipio-page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* HERO */
.hero {
  position: relative;
  height: 280px;
  border-radius: 16px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.65),
    rgba(0, 0, 0, 0.2)
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1.5rem;
  color: white;
}

.hero-overlay h1 {
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.hero-overlay p {
  margin: 0.25rem 0 0;
  opacity: 0.9;
}

/* DESCRIPCIÓN */
.description {
  max-width: 800px;
  line-height: 1.6;
  font-size: 1rem;
}

/* FILTROS */
.filters {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filters button {
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.filters button:hover {
  background: #f5f5f5;
}

.filters button.active {
  background: #111;
  color: white;
  border-color: #111;
}

/* DESTINOS */
.destinos {
  margin-top: 1rem;
}

/* LOADING */
.loading {
  padding: 4rem 0;
  text-align: center;
  font-size: 1.1rem;
  opacity: 0.7;
}
</style>