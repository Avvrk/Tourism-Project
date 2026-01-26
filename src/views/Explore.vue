<template>
  <div class="page">

    <!-- HERO -->
    <header class="hero">
      <button class="back" @click="goBack">←</button>

      <div class="hero-text">
        <span class="location">📍 Santander, Colombia</span>
        <h1>Explora sin límites</h1>
        <p>Destinos y experiencias pensadas para ti</p>
      </div>
    </header>

    <!-- QUICK ACTIONS -->
    <section class="quick-actions">
      <button class="qa" @click="goTo('/map')">🗺️<span>Mapa</span></button>
      <button class="qa" @click="goTo('/experiences')">🎒<span>Experiencias</span></button>
      <button class="qa" @click="goTo('/top')">🔥<span>Top</span></button>
      <button class="qa" @click="goTo('/events')">🎉<span>Eventos</span></button>
    </section>

    <!-- SEARCH -->
    <section class="search-section">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar pueblos, cascadas, planes..."
      />
    </section>

    <!-- MOODS -->
    <section class="block">
      <h2>Elige tu mood</h2>
      <div class="moods">
        <div
          v-for="mood in moods"
          :key="mood.label"
          class="mood"
          @click="goTo(mood.route)"
        >
          <span>{{ mood.icon }}</span>
          <p>{{ mood.label }}</p>
        </div>
      </div>
    </section>

    <!-- TRENDING -->
    <section class="block">
      <h2>🔥 Tendencias ahora</h2>

      <div class="trending">
        <div
          v-for="item in trending"
          :key="item.id"
          class="trend-card"
          @click="goTo(`/destination/${item.id}`)"
        >
          <img :src="item.image" />
          <div class="trend-info">
            <p>{{ item.name }}</p>
            <span>⭐ {{ item.rating || '4.8' }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="block">
      <h2>Categorías</h2>
      <div class="categories">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="{ active: selectedCategory === cat }"
          @click="toggleCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </section>

    <!-- GRID -->
    <section class="block">
      <div v-if="filteredDestinations.length" class="grid">
        <div
          v-for="dest in filteredDestinations"
          :key="dest.id"
          class="card"
          @click="goTo(`/destination/${dest.id}`)"
        >
          <img :src="dest.image" />
          <div class="card-body">
            <p class="name">{{ dest.name }}</p>
            <span class="tag">{{ dest.categories[0] }}</span>
          </div>
        </div>
      </div>

      <div v-else class="empty">
        <p>No encontramos resultados</p>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-box">
      <h3>¿No sabes qué elegir?</h3>
      <p>Te ayudamos a encontrar el plan perfecto</p>
      <button @click="goTo('/ai')">Sorpréndeme</button>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { destinations } from '@/data/destinations'

defineOptions({ name: 'ExplorePage' })

const router = useRouter()

const searchQuery = ref('')
const selectedCategory = ref(null)

const categories = [
  'Aventura',
  'Naturaleza',
  'Gastronomía',
  'Cultura',
  'Eventos'
]

const moods = [
  { label: 'Aventura', icon: '🌄', route: '/mood/adventure' },
  { label: 'Romántico', icon: '💑', route: '/mood/romantic' },
  { label: 'Relax', icon: '🧘', route: '/mood/relax' },
  { label: 'Familiar', icon: '👨‍👩‍👧', route: '/mood/family' }
]

const trending = destinations.slice(0, 5)

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

const goTo = (path) => router.push(path)
const goBack = () => router.back()
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.page {
  overflow-x: hidden;
  padding-bottom: 96px;
  background: #fafafa;
}

/* HERO */
.hero {
  padding: 24px 20px 32px;
  background: linear-gradient(180deg, #0f0f0f, #1c1c1c);
  color: white;
  border-radius: 0 0 32px 32px;
}

.back {
  background: none;
  border: none;
  color: white;
  font-size: 18px;
}

.hero-text {
  margin-top: 16px;
}

.hero-text h1 {
  font-size: 30px;
  margin: 6px 0;
}

.hero-text p {
  opacity: .8;
}

/* QUICK ACTIONS */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 16px;
  margin-top: 20px;
}

.qa {
  background: white;
  border-radius: 18px;
  padding: 14px 8px;
  border: none;
  box-shadow: 0 8px 20px rgba(0,0,0,.12);
}

.qa span {
  display: block;
  font-size: 12px;
}

/* SEARCH */
.search-section {
  padding: 0 16px 24px;
}

.search-section input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 16px;
  border: none;
  background: #f0f0f0;
}

/* BLOCKS */
.block {
  padding: 0 16px 32px;
}

.block h2 {
  margin-bottom: 14px;
  font-size: 18px;
}

/* MOODS */
.moods {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.mood {
  background: #000;
  color: white;
  border-radius: 18px;
  padding: 16px;
  text-align: center;
}

/* TRENDING */
.trending {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 4px;
}

.trending::-webkit-scrollbar {
  display: none;
}

.trend-card {
  min-width: 160px;
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 6px 16px rgba(0,0,0,.1);
}

.trend-card img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.trend-info {
  padding: 10px;
  font-size: 13px;
}

/* CATEGORIES */
.categories {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.categories button {
  padding: 10px 14px;
  border-radius: 16px;
  border: none;
  background: #eee;
}

.categories button.active {
  background: #000;
  color: white;
}

/* GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 130px;
  object-fit: cover;
}

.card-body {
  padding: 12px;
}

.tag {
  font-size: 12px;
  background: #eee;
  padding: 4px 8px;
  border-radius: 12px;
}

/* CTA */
.cta-box {
  margin: 24px 16px;
  padding: 24px;
  background: #000;
  color: white;
  border-radius: 24px;
  text-align: center;
}

.cta-box button {
  margin-top: 14px;
  padding: 14px 18px;
  border-radius: 18px;
  border: none;
  background: white;
  font-weight: 600;
}
</style>