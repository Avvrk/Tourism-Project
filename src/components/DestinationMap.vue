<template>
  <div class="map-wrapper">
    <div class="map-header">
      🗺️ {{ name }}
    </div>

    <div ref="mapEl" class="map"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const props = defineProps({
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: 'Destino'
  }
})

const mapEl = ref(null)
let map

// 🎯 Icono personalizado
const customIcon = L.divIcon({
  className: 'custom-marker',
  html: '📍',
  iconSize: [32, 32],
  iconAnchor: [16, 32]
})

onMounted(() => {
  if (!props.lat || !props.lng) return

  map = L.map(mapEl.value, {
    zoomControl: false,
    scrollWheelZoom: false
  }).setView([props.lat, props.lng], 14)

  // 🌍 Tiles modernos (mucho más bonitos)
  L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    {
      attribution: '© OpenStreetMap © CARTO'
    }
  ).addTo(map)

  // ➕ Controles minimalistas
  L.control.zoom({ position: 'bottomright' }).addTo(map)

  // 📍 Marker
  L.marker([props.lat, props.lng], { icon: customIcon })
    .addTo(map)
    .bindPopup(`<strong>${props.name}</strong>`)
})

onUnmounted(() => {
  if (map) map.remove()
})
</script>

<style scoped>
/* CONTENEDOR */
.map-wrapper {
  margin-top: 12px;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(0,0,0,.15);
  background: white;
}

/* HEADER */
.map-header {
  padding: 12px 16px;
  font-weight: 600;
  font-size: 14px;
  background: linear-gradient(135deg, #000, #333);
  color: white;
}

/* MAPA */
.map {
  width: 100%;
  height: 260px;
}

/* MARKER */
:deep(.custom-marker) {
  font-size: 28px;
  filter: drop-shadow(0 6px 12px rgba(0,0,0,.4));
}

/* POPUP */
:deep(.leaflet-popup-content-wrapper) {
  border-radius: 14px;
  padding: 4px;
}

:deep(.leaflet-popup-content) {
  font-size: 14px;
  font-weight: 600;
}

/* CONTROLES */
:deep(.leaflet-control-zoom) {
  border-radius: 14px;
  overflow: hidden;
}

:deep(.leaflet-control-zoom a) {
  background: white;
  color: black;
  border: none;
}

/* MOBILE LOVE */
@media (max-width: 600px) {
  .map {
    height: 240px;
  }
}
</style>