<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <button class="back" @click="goBack">← Volver</button>
    </div>

    <h1 class="title">Más opciones</h1>

    <!-- LIST -->
    <div class="list">
      <div class="item" @click="goTo('/favorites')">
        <span>❤️</span>
        <p>Mis favoritos</p>
      </div>

      <div class="item" @click="goTo('/ai')">
        <span>🤖</span>
        <p>Asistente turístico</p>
      </div>

      <div class="item" @click="goTo('/emergencies')">
        <span>🚨</span>
        <p>Emergencias</p>
      </div>

      <div class="item disabled">
        <span>ℹ️</span>
        <p>Acerca de</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({ name: 'MorePage' })

const router = useRouter()

const goBack = () => {
  router.back()
}

const goTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 80px;
  position: relative;
}

/* HEADER */
.header {
  margin-bottom: 12px;
}

.back {
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
}

/* TITLE */
.title {
  margin-bottom: 20px;
}

/* LIST */
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(0,0,0,.12);
}

.item span {
  font-size: 22px;
}

.item p {
  margin: 0;
  font-size: 16px;
}

/* Deshabilitado */
.item.disabled {
  opacity: 0.5;
  cursor: default;
}
</style>
