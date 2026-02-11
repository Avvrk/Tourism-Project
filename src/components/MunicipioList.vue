<template>
  <section class="municipio-list">
    <MunicipioCard
      v-for="m in municipios"
      :key="m.slug"
      :municipio="m"
      @select="$emit('select', m)"
    />
  </section>
</template>

<script setup>
import MunicipioCard from '@/components/MunicipioCard.vue'

defineProps({
  municipios: {
    type: Array,
    required: true
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
</style>