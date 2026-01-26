<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <button class="back" @click="goBack">← Volver</button>
    </div>

    <h1 class="title">Explorar destinos</h1>

    <!-- 🔍 BUSCADOR -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar destino..."
      class="search"
    />

    <!-- 🏷️ CATEGORÍAS -->
    <div class="categories">
      <div
        v-for="cat in categories"
        :key="cat"
        class="category"
        :class="{ active: selectedCategory === cat }"
        @click="toggleCategory(cat)"
      >
        {{ cat }}
      </div>
    </div>

    <!-- 🗺️ LISTADO -->
    <div class="grid">
      <div
        v-for="dest in filteredDestinations"
        :key="dest.id"
        class="card"
        @click="goToDestination(dest)"
      >
        <button
          class="favorite"
          @click.stop="toggleFavorite(dest)"
        >
          {{ isFavorite(dest.id) ? '❤️' : '🤍' }}
        </button>

        <img :src="dest.image" :alt="dest.name" />
        <p>{{ dest.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { destinations } from '@/data/destinations'
import { useFavorites } from '@/composables/useFavorites'

defineOptions({ name: 'ExplorePage' })

const router = useRouter()
const route = useRoute()

const searchQuery = ref(route.query.search || '')
const selectedCategory = ref(route.query.category || null)

const { toggleFavorite, isFavorite } = useFavorites()

const categories = ['Aventura', 'Gastronomía', 'Cultura', 'Eventos', 'Naturaleza']

const toggleCategory = (cat) => {
  selectedCategory.value =
    selectedCategory.value === cat ? null : cat
}

const filteredDestinations = computed(() => {
  let results = destinations

  if (searchQuery.value) {
    results = results.filter(d =>
      d.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  if (selectedCategory.value) {
    results = results.filter(d =>
      d.categories.includes(selectedCategory.value)
    )
  }

  return results
})

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
  overflow-x: hidden;
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

.title {
  margin-bottom: 16px;
}

.search {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
}

.categories {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  margin-bottom: 16px;
  scrollbar-width: none;
}

.categories::-webkit-scrollbar {
  display: none;
}

.category {
  min-width: 120px;
  padding: 14px;
  background: #f2f2f2;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
}

.category.active {
  background: #000;
  color: white;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.card {
  position: relative;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  cursor: pointer;
}

.card img {
  width: 100%;
  height: 110px;
  object-fit: cover;
}

.card p {
  padding: 10px;
  font-weight: 500;
  text-align: center;
}

.favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 6px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,.2);
  z-index: 2;
}
</style>