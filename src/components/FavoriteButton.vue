<template>
  <button
    class="favorite-btn"
    :class="variant"
    @click.stop="handleToggle"
    :aria-label="isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'"
  >
    <span class="icon">
      {{ isFav ? '❤️' : '🤍' }}
    </span>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useFavorites } from '@/composables/useFavorites'

defineOptions({ name: 'FavoriteButton' })

const props = defineProps({
  destination: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'floating'
  }
})

const emit = defineEmits(['toggle'])

const { favorites, toggleFavorite } = useFavorites()

/* ✅ Un destino válido SOLO necesita slug */
const isValidDestino = computed(() =>
  !!props.destination?.slug
)

/* ❤️ Estado favorito */
const isFav = computed(() =>
  favorites.value.some(
    f => f.slug === props.destination.slug
  )
)

const handleToggle = () => {
  if (!isValidDestino.value) return

  toggleFavorite(props.destination)
  emit('toggle', props.destination)
}
</script>

<style scoped>
.favorite-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;
}

/* VARIANTES */
.favorite-btn.floating {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 6px 16px rgba(0,0,0,.2);
}

.favorite-btn.inline {
  background: transparent;
  padding: 4px;
}

/* ICON */
.icon {
  font-size: 20px;
  line-height: 1;
}

/* INTERACTIONS */
.favorite-btn:hover {
  transform: scale(1.1);
}

.favorite-btn:active {
  transform: scale(0.95);
}
</style>