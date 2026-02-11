<template>
  <article class="destination-card" @click="onSelect">
    <div class="image-wrapper">
      <img :src="destination.image" :alt="destination.name" />

      <!-- ❤️ FAVORITO SIEMPRE -->
      <FavoriteButton
        :destination="destination"
        @click.stop
      />

      <span v-if="destination.categories?.length" class="category">
        {{ destination.categories[0] }}
      </span>
    </div>

    <div class="info">
      <h3 class="title">{{ destination.name }}</h3>
    </div>
  </article>
</template>

<script setup>
import FavoriteButton from '@/components/FavoriteButton.vue'

const props = defineProps({
  destination: { type: Object, required: true }
})

const emit = defineEmits(['select'])

const onSelect = () => emit('select', props.destination)
</script>

<style scoped>
.destination-card {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,.08);
  cursor: pointer;
  transition: transform .25s ease, box-shadow .25s ease;
}

.destination-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 32px rgba(0,0,0,.14);
}

/* IMAGE */
.image-wrapper {
  position: relative;
  height: 150px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* CATEGORY */
.category {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0,0,0,.6);
  color: white;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 12px;
}

/* INFO */
.info {
  padding: 12px;
}

.title {
  font-size: 15px;
  margin-bottom: 4px;
}

.location {
  font-size: 12px;
  color: #666;
}

/* VARIANTS */
.destination-card.horizontal {
  display: flex;
}

.destination-card.horizontal .image-wrapper {
  width: 120px;
  height: 100%;
}

.destination-card.compact .image-wrapper {
  height: 110px;
}
</style>