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
        placeholder="Buscar destino..."
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

      <button class="view-toggle" @click="grid = !grid">
        {{ grid ? '📄' : '🔲' }}
      </button>
    </section>

    <!-- EMPTY -->
    <section v-if="filteredFavorites.length === 0" class="empty">
      <h2>😕 Nada por aquí</h2>
      <p>Prueba ajustando los filtros</p>
    </section>

    <!-- FAVORITES -->
    <section
      v-else
      :class="grid ? 'grid' : 'list'"
    >
      <article
        v-for="dest in filteredFavorites"
        :key="dest.id"
        class="card"
        @click="goToDestination(dest)"
      >
        <img :src="dest.image" />

        <button
          class="favorite"
          @click.stop="toggleFavorite(dest)"
        >
          ❤️
        </button>

        <div class="info">
          <h3>{{ dest.name }}</h3>
          <small>📍 {{ dest.municipio || 'Santander' }}</small>

          <span class="badge">
            {{ dest.category || 'Destino' }}
          </span>
        </div>
      </article>
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

defineOptions({ name: 'FavoritesPage' })

const router = useRouter()
const { favorites, toggleFavorite } = useFavorites()

const search = ref('')
const order = ref('az')
const category = ref('')
const grid = ref(true)

const categories = computed(() => {
  return [...new Set(
    favorites.value
      .map(f => f.category)
      .filter(Boolean)
  )]
})

const orderedFavorites = computed(() => {
  const sorted = [...favorites.value].sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  return order.value === 'az' ? sorted : sorted.reverse()
})

const filteredFavorites = computed(() =>
  orderedFavorites.value.filter(dest => {
    const matchName = dest.name
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchCategory = category.value
      ? dest.category === category.value
      : true

    return matchName && matchCategory
  })
)

const clearFavorites = () => {
  if (confirm('¿Eliminar todos los favoritos?')) {
    favorites.value = []
  }
}

const goToDestination = (dest) => {
  router.push(`/destination/${dest.id}`)
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
.controls select,
.view-toggle {
  padding: 10px;
  border-radius: 14px;
  border: 1px solid #ddd;
  flex: 1;
}

.view-toggle {
  flex: 0;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 16px;
}

/* CARD */
.card {
  position: relative;
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 12px 30px rgba(0,0,0,.12);
  transition: transform .2s ease;
}

.card:hover {
  transform: translateY(-4px);
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

/* INFO */
.info {
  padding: 12px;
}

.info h3 {
  margin: 0;
}

.info small {
  display: block;
  color: #666;
}

.badge {
  display: inline-block;
  margin-top: 6px;
  background: #000;
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
}

/* FAVORITE */
.favorite {
  position: absolute;
  top: 12px;
  right: 12px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 8px;
  font-size: 18px;
  box-shadow: 0 4px 12px rgba(0,0,0,.25);
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
}
</style>