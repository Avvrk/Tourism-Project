<template>
  <div class="page">
    <!-- HERO -->
    <HeroSlider :slides="heroSlides" />

    <!-- TÍTULO -->
    <h1 class="title">Turismo Santander</h1>

    <!-- BUSCADOR -->
    <SearchBox
          :destinations="destinations"
          @search="handleSearch"
          @select="goToDestination"
        />
      <div v-if="filteredResults.length" class="results-grid">
          <div
            v-for="place in filteredResults"
            :key="place.id"
            class="result-card"
            @click="goToDestination(place)"
          >
          <button
            class="favorite"
            @click.stop="toggleFavorite(place)"
          >
            {{ isFavorite(place.id) ? '❤️' : '🤍' }}
          </button>

            <img :src="place.image" :alt="place.name" />
            <span>{{ place.name }}</span>
          </div>
    </div>

    <!-- CATEGORÍAS -->
      <section>
        <h2>Categorías</h2>
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
      </section>

    <!-- DESTINOS DESTACADOS -->
      <section>
        <h2>Destinos destacados</h2>
        <div class="destinations">
          <div
            v-for="dest in destinations"
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
      </section>


    <button class="cta" @click="goToExplore">
      Explorar Santander
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import HeroSlider from '@/components/HeroSlider.vue'
import SearchBox from '@/components/SearchBox.vue'
import { destinations } from '@/data/destinations'
import { useFavorites } from '@/composables/useFavorites'

defineOptions({ name: 'HomePage' })

const router = useRouter()
const searchQuery = ref('')
const selectedCategory = ref(null)

const goToExplore = () => {
  router.push({
    path: '/explore',
    query: {
      search: searchQuery.value || undefined,
      category: selectedCategory.value || undefined
    }
  })
}

const { toggleFavorite, isFavorite } = useFavorites()

const hasFilters = computed(() => {
  return searchQuery.value || selectedCategory.value
})

const goToDestination = (dest) => {
  searchQuery.value = ''
  router.push(`/destination/${dest.id}`)
}

const handleSearch = (value) => {
  searchQuery.value = value.toLowerCase()
  selectedCategory.value = null
}

const toggleCategory = (cat) => {
  router.push({
    path: '/explore',
    query: { category: cat }
  })
}

// 🔍 Búsqueda (usa destinations)
const filteredResults = computed(() => {
  if (!hasFilters.value) return []

  let results = destinations

  if (searchQuery.value) {
    results = results.filter(dest =>
      dest.name.toLowerCase().includes(searchQuery.value)
    )
  }

  if (selectedCategory.value) {
    results = results.filter(dest =>
      dest.categories.includes(selectedCategory.value)
    )
  }

  return results
})

// 🎞 HeroSlider (primeros 3 destinos)
const heroSlides = computed(() => destinations.slice(0, 3))

// 🧩 Categorías
const categories = ['Aventura', 'Gastronomía', 'Cultura', 'Eventos', 'Naturaleza']
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

.page {
  padding: 16px;
  padding-bottom: 40px; /* aumenta el espacio al final */
  overflow-x: hidden;
}

.title {
  text-align: center;
  margin: 16px 0;
}

.search input {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #ccc;
  margin-bottom: 24px;
}

.results {
  background: white;
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 24px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
}

.result-item {
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

.result-item:hover {
  background: #f2f2f2;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}
.result-card,
.card {
  position: relative;
}

.favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  background: white;
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 2px 6px rgba(0,0,0,.2);
  z-index: 2;
}

.result-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  cursor: pointer;
}

.result-card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
}

.result-card span {
  display: block;
  padding: 10px;
  font-weight: 500;
  text-align: center;
}
.category {
  min-width: 120px;
  padding: 16px;
  background: #f2f2f2;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
}

.category.active {
  background: #000;
  color: #fff;
}

.categories,
.destinations {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  margin-bottom: 16px;
}

.category,
.card {
  min-width: 120px;
  padding: 16px;
  background: #f2f2f2;
  border-radius: 12px;
  text-align: center;
}

.card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
}

.cta {
  width: 100%;
  padding: 14px;
  border: none;
  background: #000;
  color: #fff;
  border-radius: 12px;
  font-size: 16px;
  margin-bottom: 24px; /* Agregado: separa el botón del borde inferior */
  cursor: pointer;
}
</style>