<template>
  <div class="page">

    <!-- HERO -->
    <HeroSlider :slides="heroSlides" />

    <!-- HERO TEXT -->
    <section class="hero-text">
      <h1>Descubre Santander</h1>
      <p>Viaja, explora y vive experiencias inolvidables</p>
    </section>

    <!-- DAILY CONTEXT -->
    <section class="daily-context">
      <div>
        <strong>📍 Santander hoy</strong>
        <p>☀️ 26° · Ideal para planes al aire libre</p>
      </div>
      <span class="pulse">EN VIVO</span>
    </section>

    <!-- VALUE HIGHLIGHTS -->
    <section class="highlights">
      <div class="highlight">📍 +50 destinos</div>
      <div class="highlight">⭐ Referenciados por viajeros</div>
      <div class="highlight">🤖 Recomendaciones inteligentes</div>
    </section>

    <!-- SEARCH -->
    <SearchBox
      :destinations="destinos"
      @search="handleSearch"
      @select="goToDestination"
    />

    <!-- QUICK ACTIONS -->
    <section>
      <h2>¿Qué quieres hacer hoy?</h2>
      <div class="action-grid">
        <div class="action">🌟 Sorpréndeme</div>
        <div class="action">⏱️ Plan rápido</div>
        <div class="action">📍 Cerca de mí</div>
        <div class="action">🔥 Tendencias</div>
      </div>
    </section>

    <!-- SEARCH RESULTS -->
    <section v-if="filteredResults.length">
      <h2>Resultados</h2>
      <div class="results-grid">
        <div
          v-for="place in filteredResults"
          :key="place.id"
          class="card"
          @click="goToDestination(place)"
        >
          <button class="favorite" @click.stop="toggleFavorite(place)">
            {{ isFavorite(place.id) ? '❤️' : '🤍' }}
          </button>
          <img :src="place.image" />
          <p>{{ place.name }}</p>
        </div>
      </div>
    </section>

    <!-- PERSONALIZED -->
    <section>
      <h2>✨ Para ti hoy</h2>
      <div class="horizontal-list">
        <div
          v-for="dest in destinos.slice(1,5)"
          :key="dest.id"
          class="card premium"
          @click="goToDestination(dest)"
        >
          <img :src="dest.image" />
          <div class="overlay">
            <span>Recomendado</span>
            <p>{{ dest.name }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- STORIES -->
    <section class="soft-section">
      <h2>📖 Historias que inspiran</h2>
      <div class="stories">
        <div class="story">🌄 Un amanecer inolvidable</div>
        <div class="story">🍽️ Sabores que enamoran</div>
        <div class="story">🏛️ Lugares con historia</div>
      </div>
    </section>
    
    <!-- TRENDING -->
    <section>
      <h2>🔥 En tendencia</h2>
      <div class="horizontal-list">
        <div
          v-for="dest in destinos.slice(2,7)"
          :key="dest.id"
          class="card trend"
          @click="goToDestination(dest)"
        >
          <img :src="dest.image" />
          <p>{{ dest.name }}</p>
        </div>
      </div>
    </section>

    <!-- EXPERIENCES -->
    <section>
      <h2>Experiencias</h2>
      <div class="horizontal-list">
        <div class="experience">🌄 Aventura</div>
        <div class="experience">🍽️ Gastronomía</div>
        <div class="experience">🏛️ Cultura</div>
        <div class="experience">💑 En pareja</div>
        <div class="experience">👨‍👩‍👧 Familia</div>
      </div>
    </section>

    <!-- ZONES -->
    <section class="soft-section">
      <h2>Explora por zonas</h2>
      <div class="zones">
        <div class="zone">🏙️ Área Metropolitana</div>
        <div class="zone">🏞️ Provincias</div>
        <div class="zone">✨ Pueblos mágicos</div>
      </div>
    </section>

    <!-- TRUST -->
    <section>
      <h2>🏆 ¿Por qué elegirnos?</h2>
      <div class="trust-grid">
        <div>👥 +10k viajeros</div>
        <div>⭐ 4.8 promedio</div>
        <div>🗺️ Curado por locales</div>
        <div>💬 Comunidad activa</div>
      </div>
    </section>

    <!-- AI TEASER -->
    <section class="ai-section">
      <h2>🤖 Tu asistente turístico</h2>
      <p>Pronto podrás planear tu viaje con ayuda inteligente.</p>
      <button class="cta soft">Muy pronto</button>
    </section>

    <!-- FINAL CTA -->
    <section class="final-emotion">
      <h2>Tu próxima experiencia empieza aquí</h2>
      <p>No solo viajes. Vive Santander.</p>
      <button class="cta glow" @click="goToExplore">
        Descubrir ahora
      </button>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
      <strong>Turismo Santander</strong>
      <div class="footer-links">
        <span @click="go('/favorites')">Favoritos</span>
        <span @click="go('/explore')">Explorar</span>
        <span @click="go('/ai')">Asistente AI</span>
      </div>
      <small>© 2026 Turismo Santander</small>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import HeroSlider from '@/components/HeroSlider.vue'
import SearchBox from '@/components/SearchBox.vue'
import { useFavorites } from '@/composables/useFavorites'

import { getMunicipios } from '@/services/municipiosService'
import { getDestinos } from '@/services/destinosService'

defineOptions({ name: 'HomePage' })

const router = useRouter()
const { toggleFavorite, isFavorite } = useFavorites()

/* STATE */
const municipios = ref([])
const destinos = ref([])
const searchQuery = ref('')
const loading = ref(true)

/* NAV */
const go = (path) => router.push(path)
const goToExplore = () => router.push('/explore')

const goToDestination = (dest) => {
  router.push(
    `/explore/${dest.municipio.slug}/${dest.slug}`
  )
}

/* SEARCH */
const handleSearch = (value) => {
  searchQuery.value = value.toLowerCase()
}

const filteredResults = computed(() => {
  if (!searchQuery.value) return []
  return destinos.value.filter(d =>
    d.name.toLowerCase().includes(searchQuery.value)
  )
})

/* HERO */
const heroSlides = computed(() =>
  destinos.value.slice(0, 3)
)

/* FETCH */
onMounted(async () => {
  try {
    municipios.value = await getMunicipios()
    destinos.value = await getDestinos({
      withMunicipio: true
    })
  } catch (e) {
    console.error('Error cargando home:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 120px;
}

/* HERO */
.hero-text {
  text-align: center;
  margin: 24px 0;
}

.hero-text h1 {
  font-size: 30px;
}

.hero-text p {
  color: #666;
}

/* DAILY */
.daily-context {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #000, #111);
  color: #fff;
  padding: 14px 18px;
  border-radius: 18px;
  margin-bottom: 24px;
}

.pulse {
  font-size: 12px;
  background: #22c55e;
  padding: 4px 8px;
  border-radius: 20px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: .6 }
  50% { opacity: 1 }
  100% { opacity: .6 }
}

/* HIGHLIGHTS */
.highlights {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.highlight {
  flex: 1;
  background: #f7f7f7;
  border-radius: 14px;
  padding: 14px;
  text-align: center;
  font-weight: 500;
}

/* ACTIONS */
.action-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.action {
  background: #000;
  color: #fff;
  padding: 18px;
  border-radius: 18px;
  text-align: center;
  font-weight: 600;
}

/* CARDS */
.card {
  position: relative;
  min-width: 160px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
}

.card img {
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;
}

.card p {
  padding: 10px;
  text-align: center;
}

.favorite {
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border-radius: 50%;
  padding: 6px;
  border: none;
}

/* PREMIUM */
.card.premium img {
  height: 160px;
}

.card.premium .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,.7), transparent);
  color: #fff;
  padding: 14px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

/* LISTS */
.horizontal-list {
  display: flex;
  gap: 12px;
  overflow-x: auto;
}

/* STORIES */
.soft-section {
  background: #fafafa;
  padding: 16px;
  border-radius: 16px;
}

.stories {
  display: flex;
  gap: 12px;
}

.story {
  flex: 1;
  background: #000;
  color: #fff;
  padding: 24px;
  border-radius: 20px;
  font-weight: 600;
}

/* EXPERIENCES */
.experience {
  padding: 12px 18px;
  background: #f2f2f2;
  border-radius: 20px;
  white-space: nowrap;
}

/* ZONES */
.zones {
  display: flex;
  gap: 12px;
}

.zone {
  flex: 1;
  padding: 18px;
  background: linear-gradient(135deg, #f2f2f2, #eaeaea);
  border-radius: 18px;
  text-align: center;
}

/* TRUST */
.trust-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.trust-grid div {
  background: #f4f4f4;
  padding: 16px;
  border-radius: 16px;
  text-align: center;
  font-weight: 500;
}

/* AI */
.ai-section {
  text-align: center;
  padding: 24px;
  background: radial-gradient(circle, #111, #000);
  color: #fff;
  border-radius: 20px;
}

/* CTA */
.final-emotion {
  text-align: center;
  padding: 40px 20px;
}

.cta {
  width: 100%;
  padding: 16px;
  border-radius: 14px;
  background: #000;
  color: #fff;
  border: none;
  font-size: 16px;
}

.cta.glow {
  box-shadow: 0 0 20px rgba(0,0,0,.4);
}

/* FOOTER */
.footer {
  margin-top: 40px;
  padding: 24px;
  background: #000;
  color: #fff;
  border-radius: 20px 20px 0 0;
  text-align: center;
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 12px 0;
}
</style>