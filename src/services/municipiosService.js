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
  const { data, error } = await supabase
    .from('municipios')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data
}