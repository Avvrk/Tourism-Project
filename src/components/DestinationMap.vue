<template>
  <div ref="mapEl" class="map"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  lat: Number,
  lng: Number,
  name: String
})

const mapEl = ref(null)

onMounted(() => {
  const map = L.map(mapEl.value).setView([props.lat, props.lng], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
  }).addTo(map)

  L.marker([props.lat, props.lng])
    .addTo(map)
    .bindPopup(props.name)
})
</script>

<style scoped>
.map {
  width: 100%;
  height: 240px;
  border-radius: 16px;
}
</style>