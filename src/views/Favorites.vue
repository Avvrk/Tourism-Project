<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <button class="back" @click="goBack">← Volver</button>
    </div>

    <h1 class="title">
      Mis Favoritos ❤️
      <span v-if="favorites.length">({{ favorites.length }})</span>
    </h1>

    <!-- ACTION BAR -->
    <div v-if="favorites.length" class="actions">
      <select v-model="order">
        <option value="az">A – Z</option>
        <option value="za">Z – A</option>
      </select>

      <button class="clear" @click="clearFavorites">
        🗑️ Vaciar
      </button>
    </div>

    <!-- EMPTY STATE -->
    <div v-if="favorites.length === 0" class="empty">
      <p>Aún no tienes destinos guardados</p>
      <span>Explora y guarda tus favoritos ✨</span>
    </div>

    <!-- FAVORITES GRID -->
    <div v-else class="results-grid">
      <div
        v-for="dest in orderedFavorites"
        :key="dest.id"
        class="result-card"
        @click="goToDestination(dest)"
      >
        <button
          class="favorite"
          @click.stop="toggleFavorite(dest)"
        >
          ❤️
        </button>

        <img :src="dest.image" :alt="dest.name" />
        <span>{{ dest.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFavorites } from '@/composables/useFavorites'

defineOptions({ name: 'FavoritesPage' })

const router = useRouter()
const { favorites, toggleFavorite } = useFavorites()

const order = ref('az')

const orderedFavorites = computed(() => {
  const sorted = [...favorites.value].sort((a, b) =>
    a.name.localeCompare(b.name)
  )
  return order.value === 'az' ? sorted : sorted.reverse()
})

const clearFavorites = () => {
  if (confirm('¿Deseas eliminar todos los favoritos?')) {
    favorites.value = []
  }
}

const goToDestination = (dest) => {
  router.push(`/destination/${dest.id}`)
}

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 80px;
  position: relative;
}

/* HEADER */
.header {
  margin-bottom: 12px;
}

.back {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

/* TITLE */
.title {
  text-align: center;
  margin-bottom: 24px;
}

.title span {
  font-weight: 400;
  font-size: 20px;
  color: #666;
}

/* ACTIONS */
.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.actions select {
  padding: 8px;
  border-radius: 8px;
}

.clear {
  background: #ffeded;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

/* EMPTY */
.empty {
  text-align: center;
  margin-top: 80px;
  color: #666;
}

.empty span {
  display: block;
  margin-top: 8px;
  font-size: 20px;
}

/* GRID */
.results-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* CARD */
.result-card {
  position: relative;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}

.result-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 24px rgba(0,0,0,.12);
}

.result-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.result-card span {
  display: block;
  padding: 10px;
  text-align: center;
  font-weight: 500;
}

/* FAVORITE BUTTON */
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
</style>