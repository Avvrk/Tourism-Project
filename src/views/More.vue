<template>
  <div class="page">

    <!-- HERO -->
    <section class="hero">
      <button class="back" @click="goBack">←</button>

      <div class="hero-content">
        <h1>Más opciones</h1>
        <p>Todo lo que necesitas para viajar seguro por Santander</p>
      </div>
    </section>

    <!-- QUICK ACTIONS -->
    <section class="quick-actions">
      <div class="quick" @click="goTo('/favorites')">
        ❤️
        <span>Favoritos</span>
      </div>
      <div class="quick" @click="goTo('/ai')">
        🤖
        <span>Asistente</span>
      </div>
      <div class="quick danger" @click="goTo('/emergencies')">
        🚨
        <span>Emergencias</span>
      </div>
    </section>

    <!-- EXPLORA SANTANDER -->
    <h2 class="section-title">Explora Santander</h2>
    <div class="list">
      <div class="item" @click="goTo('/routes')">
        <span class="icon">🗺️</span>
        <p>Rutas recomendadas</p>
        <span class="arrow">›</span>
      </div>

      <div class="item" @click="goTo('/categories')">
        <span class="icon">🏞️</span>
        <p>Categorías turísticas</p>
        <span class="arrow">›</span>
      </div>

      <div class="item" @click="goTo('/nearby')">
        <span class="icon">📍</span>
        <p>Lugares cercanos</p>
        <span class="arrow">›</span>
      </div>
    </div>

    <!-- SEGURIDAD -->
    <h2 class="section-title">Seguridad</h2>
    <div class="list">
      <div class="item highlight" @click="goTo('/emergencies')">
        <span class="icon">🚨</span>
        <p>Emergencias</p>
        <span class="arrow">›</span>
      </div>

      <div class="item disabled">
        <span class="icon">🛡️</span>
        <p>Consejos de seguridad</p>
        <span class="badge">Próx.</span>
      </div>

      <div class="item disabled">
        <span class="icon">📢</span>
        <p>Alertas por zona</p>
        <span class="badge">Próx.</span>
      </div>
    </div>

    <!-- UTILIDAD -->
    <h2 class="section-title">Utilidad</h2>
    <div class="list">
      <div class="item disabled">
        <span class="icon">📶</span>
        <p>Modo sin conexión</p>
        <span class="badge">Próx.</span>
      </div>

      <div class="item disabled">
        <span class="icon">🌙</span>
        <p>Modo oscuro</p>
        <span class="badge">Próx.</span>
      </div>

      <div class="item disabled">
        <span class="icon">⚙️</span>
        <p>Configuración</p>
        <span class="badge">Próx.</span>
      </div>
    </div>

    <!-- SOBRE LA APP -->
    <h2 class="section-title">Sobre la web app</h2>
    <div class="list">
      <div class="item disabled">
        <span class="icon">ℹ️</span>
        <p>Acerca de Santander Travel</p>
        <span class="badge">Próx.</span>
      </div>

      <div class="item disabled">
        <span class="icon">💬</span>
        <p>Enviar sugerencias</p>
        <span class="badge">Próx.</span>
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
  padding-bottom: 120px;
}

/* HERO */
.hero {
  background: linear-gradient(135deg, #000, #1a1a1a);
  color: white;
  padding: 28px;
  border-radius: 0 0 32px 32px;
}

.back {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
}

.hero-content {
  text-align: center;
}

.hero h1 {
  margin: 12px 0 6px;
}

.hero p {
  font-size: 14px;
  opacity: .9;
}

/* QUICK ACTIONS */
.quick-actions {
  display: flex;
  justify-content: space-around;
  margin: -24px 16px 24px;
}

.quick {
  background: white;
  width: 86px;
  height: 86px;
  border-radius: 20px;
  box-shadow: 0 12px 28px rgba(0,0,0,.15);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  cursor: pointer;
  transition: transform .2s ease;
}

.quick span {
  font-size: 12px;
  margin-top: 6px;
}

.quick:active {
  transform: scale(0.95);
}

.quick.danger {
  background: linear-gradient(135deg, #ff5252, #c62828);
  color: white;
}

/* SECTION */
.section-title {
  font-size: 13px;
  color: #666;
  margin: 20px 16px 10px;
  text-transform: uppercase;
  letter-spacing: .6px;
}

/* LIST */
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 16px;
}

.item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  background: white;
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(0,0,0,.1);
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease;
}

.item:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(0,0,0,.14);
}

.item.highlight {
  border-left: 4px solid #e53935;
}

.icon {
  font-size: 22px;
}

.item p {
  flex: 1;
  margin: 0;
  font-size: 15px;
}

.arrow {
  font-size: 20px;
  color: #999;
}

/* BADGE */
.badge {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
  background: #f2f2f2;
  color: #555;
}

/* DISABLED */
.item.disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.item.disabled:hover {
  transform: none;
  box-shadow: 0 8px 24px rgba(0,0,0,.1);
}
</style>