import { ref, watch } from 'vue'

const favorites = ref(
  JSON.parse(localStorage.getItem('favorites')) || []
)

export function useFavorites() {

  // ✅ Soporta: slug, id o el objeto destino
  const isFavorite = (idOrSlugOrDest) => {
    const id = typeof idOrSlugOrDest === 'object' ? idOrSlugOrDest?.id : idOrSlugOrDest
    const slug = typeof idOrSlugOrDest === 'object' ? idOrSlugOrDest?.slug : idOrSlugOrDest

    return favorites.value.some(f =>
      (slug && f.slug === slug) ||
      (id != null && f.id === id)
    )
  }

  const toggleFavorite = (dest) => {
    /* ======================
       VALIDACIONES
    ====================== */
    if (!dest?.slug || !dest?.name) {
      console.error('❌ Destino inválido:', dest)
      return
    }

    const municipioSlug = dest?.municipio?.slug || dest?.municipioSlug || dest?.municipio_slug
    const municipioName = dest?.municipio?.name || dest?.municipioName || dest?.municipio_name

    if (!municipioSlug) {
      console.error('❌ Destino sin municipio (slug):', dest)
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
        slug: municipioSlug,
        name: municipioName || ''
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
    toggleFavorite,
    isFavorite
  }
}