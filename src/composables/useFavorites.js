import { ref, watch } from 'vue'

const favorites = ref(
  JSON.parse(localStorage.getItem('favorites')) || []
)

export function useFavorites() {

  const toggleFavorite = (dest) => {
    /* ======================
       VALIDACIONES
    ====================== */
    if (!dest?.slug || !dest?.name) {
      console.error('❌ Destino inválido:', dest)
      return
    }

    if (!dest?.municipio?.slug) {
      console.error('❌ Destino sin municipio:', dest)
      return
    }

    /* ======================
       EXISTE?
    ====================== */
    const index = favorites.value.findIndex(
      f => f.slug === dest.slug
    )

    if (index !== -1) {
      favorites.value.splice(index, 1)
      return
    }

    /* ======================
       GUARDAR SOLO LO NECESARIO
    ====================== */
    favorites.value.push({
      id: dest.id,
      name: dest.name,
      slug: dest.slug,
      image: dest.image,
      categories: dest.categories || [],
      municipio: {
        slug: dest.municipio.slug,
        name: dest.municipio.name
      }
    })
  }

  watch(
    favorites,
    (val) => {
      localStorage.setItem('favorites', JSON.stringify(val))
    },
    { deep: true }
  )

  return {
    favorites,
    toggleFavorite
  }
}