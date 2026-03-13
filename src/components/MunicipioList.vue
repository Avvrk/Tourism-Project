<template>
  <section class="municipio-list">
    <!-- LOADING -->
    <template v-if="loading">
      <div
        v-for="n in 8"
        :key="n"
        class="skeleton"
      />
    </template>

    <!-- LIST -->
    <template v-else>
      <MunicipioCard
        v-for="m in municipios"
        :key="m.slug"
        :municipio="m"
        @select="$emit('select', m)"
      />
    </template>
  </section>
</template>

<script setup>
import MunicipioCard from '@/components/MunicipioCard.vue'

defineProps({
  municipios: {
    type: Array,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])
</script>

<style scoped>
.municipio-list {
  display: grid;
  gap: 16px;

  /* 🖥️ Desktop grande → 4 */
  grid-template-columns: repeat(4, 1fr);
}

/* 💻 Laptop → 3 */
@media (max-width: 1200px) {
  .municipio-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* 📱 Tablet → 2 */
@media (max-width: 768px) {
  .municipio-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 📱 Móvil → 1 */
@media (max-width: 480px) {
  .municipio-list {
    grid-template-columns: 1fr;
  }
}

.skeleton {
  height: 180px;
  border-radius: 18px;
  background: linear-gradient(90deg, #eee, #f7f7f7, #eee);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>