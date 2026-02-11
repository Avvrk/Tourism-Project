<template>
  <article class="municipio-card" @click="onSelect">
    <div class="image-wrapper">
      <img :src="municipio.image" :alt="municipio.name" />
    </div>

    <div class="info">
      <h3 class="title">{{ municipio.name }}</h3>
      <p class="province">{{ municipio.province }}</p>
    </div>
  </article>
</template>

<script setup>
const props = defineProps({
  municipio: { type: Object, required: true }
})

const emit = defineEmits(['select'])

const onSelect = () => emit('select', props.municipio)
</script>

<style scoped>
.municipio-card {
  cursor: pointer;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.municipio-card {
  cursor: pointer;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.municipio-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
}


.image-wrapper {
  width: 100%;
  height: 200px; /* antes 170 */
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.municipio-card:hover img {
  transform: scale(1.05);
}

.info {
  padding: 10px 12px;
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

.province {
  margin-top: 2px;
  font-size: 0.8rem;
  color: #6b7280;
}
</style>