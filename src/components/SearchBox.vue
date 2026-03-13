<template>
  <div class="search-box">
    <span class="icon">🔍</span>

    <input
      type="text"
      v-model="query"
      placeholder="¿Qué quieres hacer hoy en Santander?"
      @input="emitSearch"
    />

    <!-- SUGGESTIONS -->
    <div v-if="showSuggestions" class="suggestions">
      <button
        v-for="dest in suggestions"
        :key="dest.slug || dest.id"
        class="suggestion"
        type="button"
        @click="selectDestination(dest)"
      >
        <img v-if="dest.image" :src="dest.image" :alt="dest.name" />
        <div class="text">
          <strong>{{ dest.name }}</strong>
          <small v-if="dest.municipio?.name">{{ dest.municipio.name }}</small>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  // Lista de destinos para sugerencias (opcional)
  destinations: {
    type: Array,
    default: () => []
  },
  maxSuggestions: {
    type: Number,
    default: 6
  }
})

const query = ref('')

const emit = defineEmits(['search', 'select'])

const emitSearch = () => {
  emit('search', query.value)
}

const suggestions = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []

  return props.destinations
    .filter(d => (d?.name ?? '').toLowerCase().includes(q))
    .slice(0, props.maxSuggestions)
})

const showSuggestions = computed(() =>
  query.value.trim().length >= 2 && suggestions.value.length
)

const selectDestination = (dest) => {
  emit('select', dest)
  query.value = ''
  emit('search', '')
}
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #f4f4f4;
  padding: 14px 16px;
  border-radius: 14px;
  margin-bottom: 28px;
  position: relative;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 16px;
}

.icon {
  font-size: 18px;
}

.suggestions {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  background: white;
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0,0,0,.12);
  overflow: hidden;
  z-index: 50;
}

.suggestion {
  width: 100%;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 10px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.suggestion:hover {
  background: #f7f7f7;
}

.suggestion img {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
}

.text strong {
  display: block;
  font-size: 14px;
}

.text small {
  display: block;
  color: #666;
  font-size: 12px;
}
</style>