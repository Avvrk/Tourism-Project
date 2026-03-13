import { supabase } from '@/data/clientSupabase.js'

export const getMunicipios = async () => {
  const { data, error } = await supabase
    .from('municipios')
    .select('id, name, slug, province, description, image')
    .order('name')

  if (error) {
    console.error('Error cargando municipios:', error)
    throw error
  }

  return data
}

export const getMunicipioBySlug = async (slug) => {
  // Incluye gastronomía (relación municipio_platos -> platos)
  // Si todavía no creaste la columna platos.image_url, hacemos fallback automático.

  const selectWithImages = `
    id,
    name,
    slug,
    province,
    departamento,
    description,
    image,
    municipio_platos (
      is_typical,
      note,
      sort_order,
      platos (
        id,
        name,
        slug,
        description,
        tags,
        image_url
      )
    )
  `

  const selectNoImages = `
    id,
    name,
    slug,
    province,
    departamento,
    description,
    image,
    municipio_platos (
      is_typical,
      note,
      sort_order,
      platos (
        id,
        name,
        slug,
        description,
        tags
      )
    )
  `

  let { data, error } = await supabase
    .from('municipios')
    .select(selectWithImages)
    .eq('slug', slug)
    .single()

  // Postgres error típico: column "image_url" does not exist
  if (error && /image_url/i.test(error.message || '')) {
    ;({ data, error } = await supabase
      .from('municipios')
      .select(selectNoImages)
      .eq('slug', slug)
      .single())
  }

  if (error) throw error
  return data
}