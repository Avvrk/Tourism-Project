<template>
  <nav class="bottom-nav">
    <RouterLink to="/home">Inicio</RouterLink>
    <RouterLink to="/explore">Explorar</RouterLink>
    <RouterLink to="/ai">AI</RouterLink>

    
    <RouterLink to="/favorites" class="fav-link">
      Favoritos
      <span v-if="favorites.length" class="badge">
        {{ favorites.length }}
      </span>
    </RouterLink>
    
    <RouterLink to="/emergencies" class="danger">
      Emergencias 🚨
    </RouterLink>
    
    <RouterLink to="/more">Más</RouterLink>
  </nav>
</template>


<script setup>
import { useFavorites } from '@/composables/useFavorites'
const { favorites } = useFavorites()
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #ffffff;
  border-top: 1px solid #ddd;
  z-index: 10;
}

a {
  text-decoration: none;
  color: #555;
  font-size: 14px;
}

.router-link-active {
  color: #000;
  font-weight: 600;
}

/* Emergencias */
.danger {
  font-size: 14px;
  color: #e53935;
}

/* Favoritos */
.fav-link {
  position: relative;
}

.badge {
  position: absolute;
  top: -10px;
  right: -18px;
  background: #e53935;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 999px;
}
</style>