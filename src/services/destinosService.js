import { supabase } from '@/data/clientSupabase.js'

/* TODOS LOS DESTINOS */
export const getDestinos = async () => {
  const { data, error } = await supabase
    .from('destinos')
    .select(`
      *,
      municipio:municipio_id (
        id,
        name,
        slug
      )
    `)

  if (error) {
    console.error('Error cargando destinos:', error)
    throw error
  }

  return data
}

/* DESTINOS POR MUNICIPIO */
export const getDestinosByMunicipio = async (municipioId) => {
  const { data, error } = await supabase
    .from('destinos')
    .select('*')
    .eq('municipio_id', municipioId)

  if (error) throw error
  return data
}

/* DESTINO POR SLUG */
export const getDestinoBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('destinos')
    .select(`
      *,
      municipio:municipio_id (
        id,
        name,
        slug,
        province
      )
    `)
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}