<template>
  <div class="page">
    <h1>404</h1>
    <p>Esta ruta no existe (todavía). Vuelve a explorar cosas que sí existen.</p>

    <div class="actions">
      <button @click="go('/home')">🏠 Inicio</button>
      <button @click="go('/explore')">🧭 Explorar</button>
      <button @click="go('/ai')">🤖 Asistente</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const go = (path) => router.push(path)
</script>

<style scoped>
.page {
  min-height: 60vh;
  display: grid;
  place-content: center;
  gap: 12px;
  text-align: center;
  padding: 24px;
}

h1 {
  font-size: 56px;
  margin: 0;
}

p {
  color: #666;
  max-width: 520px;
}

.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

button {
  border: none;
  border-radius: 16px;
  padding: 10px 14px;
  background: #000;
  color: #fff;
  cursor: pointer;
}

button:active {
  transform: scale(0.98);
}
</style>
