<template>
  <section class="destination-list" :class="variant">
    <!-- LOADING -->
    <template v-if="loading">
      <SkeletonLoader
        v-for="n in 6"
        :key="n"
        :variant="cardVariant"
      />
    </template>

    <!-- EMPTY -->
    <template v-else-if="!destinations.length">
      <div class="empty">
        <slot name="empty">
          <p>No hay destinos para mostrar 😕</p>
        </slot>
      </div>
    </template>

    <!-- LIST -->
    <template v-else>
      <DestinationCard
        v-for="dest in destinations"
        :key="dest.slug"
        :destination="dest"
        :variant="cardVariant"
        @select="handleClick"
      />
    </template>
  </section>
</template>

<script setup>
import DestinationCard from '@/components/DestinationCard.vue'
import SkeletonLoader from '@/components/SkeletonLoader.vue'

defineOptions({ name: 'DestinationList' })

const props = defineProps({
  destinations: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  variant: {
    type: String,
    default: 'grid',
    validator: v => ['grid', 'list', 'horizontal'].includes(v)
  },
  cardVariant: { type: String, default: 'grid' },
  clickable: { type: Boolean, default: true }
})

const emit = defineEmits(['select'])

const handleClick = (dest) => {
  if (!props.clickable) return
  emit('select', dest)
}
</script>

<style scoped>
.destination-list {
  width: 100%;
}

/* GRID */
.destination-list.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* LIST */
.destination-list.list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* HORIZONTAL */
.destination-list.horizontal {
  display: flex;
  gap: 14px;
  overflow-x: auto;
  padding-bottom: 6px;
}

.destination-list.horizontal::-webkit-scrollbar {
  display: none;
}

/* EMPTY */
.empty {
  width: 100%;
  text-align: center;
  padding: 40px 20px;
  color: #666;
}

/* Responsive */
@media (min-width: 768px) {
  .destination-list.grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .destination-list.grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>