<template>
  <div class="page">
    <!-- HEADER (MISMO PATRÓN) -->
    <div class="header">
      <button class="back" @click="goBack">← Volver</button>
    </div>

    <h1 class="title">Emergencias</h1>
    <p class="subtitle">
      Números de emergencia en Colombia. Usa solo en caso necesario.
    </p>

    <div class="grid">
      <a href="tel:123" class="card emergency">
        <span class="icon">🚑</span>
        <strong>Ambulancia</strong>
        <p>123</p>
      </a>

      <a href="tel:112" class="card emergency">
        <span class="icon">🚓</span>
        <strong>Policía</strong>
        <p>112</p>
      </a>

      <a href="tel:119" class="card emergency">
        <span class="icon">🔥</span>
        <strong>Bomberos</strong>
        <p>119</p>
      </a>

      <div class="card emergency">
        <span class="icon">🏥</span>
        <strong>Hospital cercano</strong>
        <button class="map-btn" @click="openMap">
          Ver en mapa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({ name: 'EmergenciesPage' })

const router = useRouter()

const goBack = () => {
  router.back()
}

const openMap = () => {
  window.open('https://www.google.com/maps/search/hospital+cercano')
}
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 80px;
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
  margin-bottom: 6px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.card {
  background: white;
  border-radius: 14px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
}

.emergency {
  color: inherit;
  text-decoration: none;
}

.icon {
  font-size: 28px;
  display: block;
  margin-bottom: 8px;
}

.card strong {
  display: block;
  margin-bottom: 4px;
}

.card p {
  margin: 0;
  font-size: 14px;
  color: #555;
}

.map-btn {
  margin-top: 8px;
  padding: 8px 10px;
  border: none;
  background: #000;
  color: white;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
}
</style>