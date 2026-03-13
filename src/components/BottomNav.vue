<template>
  <!-- EMERGENCY FLOATING BUTTON -->
  <RouterLink
    to="/emergencies"
    class="emergency-fab"
    title="Emergencias"
  >
    🚨
  </RouterLink>

  <!-- BOTTOM NAV -->
  <nav class="bottom-nav">
    <RouterLink to="/home" class="nav-item">
      🏠
      <span>Inicio</span>
    </RouterLink>

    <RouterLink to="/explore" class="nav-item">
      🧭
      <span>Explorar</span>
    </RouterLink>

    <!-- CENTER FAVORITES -->
    <RouterLink to="/favorites" class="nav-item center">
      ❤️
      <span>Favoritos</span>

      <span
        v-if="favorites.length"
        class="badge"
      >
        {{ favorites.length }}
      </span>
    </RouterLink>

    <RouterLink to="/ai" class="nav-item">
      🤖
      <span>AI</span>
    </RouterLink>

    <RouterLink to="/more" class="nav-item">
      ⋯
      <span>Más</span>
    </RouterLink>
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
  height: 68px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  background: rgba(255,255,255,.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);

  border-top: 1px solid rgba(0,0,0,.08);
  z-index: 50;
}

/* ============================= */
/* NAV ITEMS */
/* ============================= */
.nav-item {
  position: relative;
  text-decoration: none;
  color: #666;
  font-size: 11px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;

  transition: color .2s ease, transform .2s ease;
}

.nav-item:active {
  transform: scale(0.94);
}

.nav-item span {
  font-size: 10px;
}

/* ============================= */
/* ACTIVE INDICATOR */
/* ============================= */
.router-link-active {
  color: #000;
  font-weight: 600;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  width: 18px;
  height: 3px;
  border-radius: 999px;
  background: #000;
}

/* ============================= */
/* CENTER FAVORITES (HERO ITEM) */
/* ============================= */
.center {
  transform: translateY(-16px);
  background: white;
  padding: 12px 16px;
  border-radius: 22px;
  font-size: 22px;

  box-shadow:
    0 12px 28px rgba(0,0,0,.18),
    0 4px 12px rgba(0,0,0,.08);

  transition: transform .25s ease;
}

.center:active {
  transform: translateY(-14px) scale(0.95);
}

/* ============================= */
/* FAVORITES BADGE */
/* ============================= */
.badge {
  position: absolute;
  top: -6px;
  right: -6px;

  background: #e53935;
  color: white;
  font-size: 10px;
  padding: 3px 7px;
  border-radius: 999px;
  font-weight: 600;
}

/* ============================= */
/* EMERGENCY FLOATING ACTION BTN */
/* ============================= */
.emergency-fab {
  position: fixed;
  bottom: 88px;
  right: 16px;

  width: 58px;
  height: 58px;

  background: radial-gradient(circle at top, #ff5252, #b71c1c);
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 24px;
  color: white;
  text-decoration: none;

  box-shadow:
    0 18px 40px rgba(183,28,28,.55);

  z-index: 100;
  animation: pulse 2.4s infinite;
}

/* ============================= */
/* PULSE ANIMATION (SAFETY) */
/* ============================= */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(211,47,47,.6);
  }
  70% {
    box-shadow: 0 0 0 18px rgba(211,47,47,0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(211,47,47,0);
  }
}
</style>