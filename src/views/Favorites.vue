<template>
  <div class="page">

    <!-- HERO -->
    <section class="hero">
      <button class="back" @click="goBack">←</button>

      <div class="hero-content">
        <h1>Mis Favoritos ❤️</h1>
        <p v-if="favorites.length">
          Tu colección personal de destinos en Santander
        </p>
        <p v-else>
          Guarda lugares increíbles y crea tu ruta soñada ✨
        </p>
      </div>
    </section>

    <!-- STATS -->
    <section v-if="favorites.length" class="stats">
      <div class="stat">
        <span>❤️</span>
        <strong>{{ favorites.length }}</strong>
        <small>Favoritos</small>
      </div>
    </section>

    <!-- CONTROLS -->
    <section v-if="favorites.length" class="controls">
      <input
        v-model="search"
        placeholder="Buscar favorito..."
      />

      <select v-model="category">
        <option value="">Todas</option>
        <option
          v-for="cat in categories"
          :key="cat"
          :value="cat"
        >
          {{ cat }}
        </option>
      </select>

      <select v-model="order">
        <option value="az">A – Z</option>
        <option value="za">Z – A</option>
      </select>
    </section>

    <!-- EMPTY -->
    <section v-if="filteredFavorites.length === 0" class="empty">
      <h2>😕 Nada por aquí</h2>
      <p>Prueba ajustando los filtros</p>
    </section>

    <!-- FAVORITES -->
    <section v-else class="favorites-list">
      <DestinationList
        :destinations="filteredFavorites"
        :variant="grid ? 'grid' : 'list'"
        card-variant="default"
        show-favorite
        @toggle-favorite="toggleFavorite"
        @select="goToFavorite"
      />
    </section>

    <!-- CLEAR -->
    <button
      v-if="favorites.length"
      class="clear"
      @click="clearFavorites"
    >
      🗑️ Vaciar favoritos
    </button>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'
import DestinationList from '@/components/DestinationList.vue'

defineOptions({ name: 'FavoritesPage' })

const router = useRouter()
const { favorites, toggleFavorite } = useFavorites()

const search = ref('')
const order = ref('az')
const category = ref('')
const grid = ref(true)

/* ======================
   CATEGORIES (solo destinos)
====================== */
const categories = computed(() => {
  return [
    ...new Set(
      favorites.value
        .flatMap(f => f.categories || [])
        .filter(Boolean)
    )
  ]
})

/* ======================
   ORDER
====================== */
const orderedFavorites = computed(() => {
  const sorted = [...favorites.value].sort((a, b) =>
    (a.name ?? '').localeCompare(b.name ?? '')
  )
  return order.value === 'az' ? sorted : sorted.reverse()
})

/* ======================
   FILTER
====================== */
const filteredFavorites = computed(() =>
  orderedFavorites.value.filter(item => {
    const matchName = (item.name ?? '')
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchCategory = category.value
      ? item.categories?.includes(category.value)
      : true

    return matchName && matchCategory
  })
)


const goToFavorite = (item) => {
  router.push({
    name: 'DestinationDetail',
    params: {
      municipioSlug: item.municipio.slug,
      destinoSlug: item.slug
    }
  })
}


/* ======================
   ACTIONS
====================== */
const clearFavorites = () => {
  if (confirm('¿Eliminar todos los favoritos?')) {
    favorites.value = []
  }
}

const goBack = () => router.back()
</script>

<style scoped>
.page {
  padding-bottom: 120px;
}

/* HERO */
.hero {
  background: linear-gradient(135deg, #000, #1a1a1a);
  color: white;
  padding: 28px;
  border-radius: 0 0 32px 32px;
}

.back {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
}

.hero-content {
  text-align: center;
}

.hero h1 {
  margin: 12px 0;
}

/* STATS */
.stats {
  display: flex;
  justify-content: space-around;
  margin: 24px 0;
}

.stat {
  text-align: center;
}

.stat span {
  font-size: 28px;
}

.stat strong {
  display: block;
  font-size: 22px;
}

/* CONTROLS */
.controls {
  display: flex;
  gap: 8px;
  padding: 0 16px;
  flex-wrap: wrap;
}

.controls input,
.controls select {
  padding: 10px;
  border-radius: 14px;
  border: 1px solid #ddd;
  flex: 1;
}

/* LIST */
.favorites-list {
  padding: 16px;
}

/* EMPTY */
.empty {
  text-align: center;
  margin-top: 80px;
  color: #666;
}

/* CLEAR */
.clear {
  display: block;
  margin: 32px auto;
  padding: 14px 22px;
  border-radius: 20px;
  background: #ffecec;
  border: none;
  font-size: 16px;
  cursor: pointer;
}
</style>