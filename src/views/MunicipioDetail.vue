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

    <!-- GASTRONOMÍA -->
    <section v-if="gastronomia.length" class="gastronomia">
      <div class="section-header">
        <h2>Gastronomía</h2>
        <p class="section-sub" v-if="gastronomiaDisclaimer">
          {{ gastronomiaDisclaimer }}
        </p>
      </div>

      <div class="dish-grid">
        <article
          v-for="p in gastronomia"
          :key="p.id || p.slug"
          class="dish-card"
        >
          <div class="dish-media" v-if="p.image_url">
            <img :src="p.image_url" :alt="p.name" loading="lazy" />
          </div>
          <div class="dish-media placeholder" v-else aria-hidden="true">
            🍽️
          </div>

          <div class="dish-body">
            <div class="dish-top">
              <h3 class="dish-title">{{ p.name }}</h3>
              <span v-if="p.is_typical" class="badge">Típico</span>
            </div>

            <p v-if="p.description" class="dish-desc">{{ p.description }}</p>
            <!-- <p v-if="p.note" class="dish-note">{{ p.note }}</p> -->

            <div v-if="p.tags?.length" class="chips">
              <span
                v-for="t in p.tags"
                :key="t"
                class="chip"
              >
                {{ prettyTag(t) }}
              </span>
            </div>
          </div>
        </article>
      </div>
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

// Tags llegan como text[]; esto los hace más presentables
const prettyTag = (tag) => {
  if (!tag) return ''
  const cleaned = String(tag).replace(/_/g, ' ').trim()
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
}

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

/* GASTRONOMÍA (municipio_platos -> platos) */
const gastronomia = computed(() => {
  const rel = municipio.value?.municipio_platos || []
  return rel
    .slice()
    .sort((a, b) => (a?.sort_order ?? 0) - (b?.sort_order ?? 0))
    .map((r) => ({
      ...(r?.platos || {}),
      is_typical: !!r?.is_typical,
      note: r?.note || null,
      sort_order: r?.sort_order ?? 0
    }))
})

// Si hay mezcla de típicos vs. referencia regional, mostramos un aviso pequeño.
const gastronomiaDisclaimer = computed(() => {
  const items = gastronomia.value
  if (!items.length) return ''
  const hasTypical = items.some(i => i.is_typical)
  const hasRegional = items.some(i => !i.is_typical)
  if (hasTypical && hasRegional) {
    return 'Algunos platos están marcados como “Típico” (mencionados específicamente para este municipio). Los demás son referencia regional.'
  }
  if (hasRegional && !hasTypical) {
    return 'Listado basado en referencia regional (Santander).'
  }
  return ''
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

/* SECCIONES */
.section-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.section-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

.section-sub {
  margin: 0;
  font-size: 0.92rem;
  opacity: 0.75;
  max-width: 900px;
  line-height: 1.4;
}

/* GASTRONOMÍA */
.gastronomia {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dish-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 14px;
}

.dish-card {
  border: 1px solid rgba(0,0,0,.08);
  border-radius: 16px;
  overflow: hidden;
  background: white;
  box-shadow: 0 10px 24px rgba(0,0,0,.06);
}

.dish-media {
  height: 140px;
  background: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
}

.dish-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dish-media.placeholder {
  color: rgba(0,0,0,.55);
}

.dish-body {
  padding: 12px 14px 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dish-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}

.dish-title {
  margin: 0;
  font-size: 1rem;
  line-height: 1.2;
}

.badge {
  flex: 0 0 auto;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: rgba(0,0,0,.06);
  border: 1px solid rgba(0,0,0,.10);
}

.dish-desc {
  margin: 0;
  font-size: 0.92rem;
  opacity: 0.85;
  line-height: 1.35;
}

/* .dish-note {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.72;
  line-height: 1.35;
} */

.chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.chip {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid rgba(0,0,0,.10);
  background: rgba(0,0,0,.03);
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
