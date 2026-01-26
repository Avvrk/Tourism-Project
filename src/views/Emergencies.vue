<template>
  <div class="page">

    <!-- HERO -->
    <section class="hero">
      <button class="back" @click="goBack">←</button>

      <div class="hero-content">
        <span class="shield">🛡️</span>
        <h1>Centro de Seguridad</h1>
        <p>
          Tu respaldo inmediato mientras exploras Santander, Colombia.
        </p>
      </div>
    </section>

    <!-- PANIC BUTTON -->
    <section class="panic">
      <button class="panic-btn" @click="callEmergency">
        🚨 Emergencia inmediata
        <small>Llama al 123</small>
      </button>
    </section>

    <!-- EMERGENCY SERVICES -->
    <section class="actions">

      <a href="tel:123" class="emergency-card red">
        <span class="icon">🚑</span>
        <div>
          <strong>Emergencias Médicas</strong>
          <small>Ambulancia • 123</small>
        </div>
      </a>

      <a href="tel:112" class="emergency-card blue">
        <span class="icon">🚓</span>
        <div>
          <strong>Policía Nacional</strong>
          <small>Seguridad • 112</small>
        </div>
      </a>

      <a href="tel:119" class="emergency-card orange">
        <span class="icon">🔥</span>
        <div>
          <strong>Bomberos</strong>
          <small>Rescate • 119</small>
        </div>
      </a>

    </section>

    <!-- LOCATION SHARE -->
    <section class="location">
      <h2>📍 Tu ubicación</h2>
      <p>
        Comparte tu ubicación actual con un familiar o servicio de emergencia.
      </p>

      <button class="secondary-btn" @click="shareLocation">
        Compartir ubicación
      </button>

      <button class="secondary-btn outline" @click="openHospitals">
        Ver hospitales cercanos
      </button>
    </section>

    <!-- SAFETY TIPS -->
    <section class="tips">
      <h2>🧠 Consejos de seguridad</h2>

      <ul>
        <li>• Guarda capturas de tus documentos</li>
        <li>• Evita caminar solo de noche en zonas rurales</li>
        <li>• Mantén batería y datos activos</li>
        <li>• Pregunta siempre a locales o guías oficiales</li>
      </ul>
    </section>

    <!-- FOOTER NOTE -->
    <section class="note">
      <p>
        ℹ️ Este centro está diseñado para ayudarte a actuar rápido y con calma.
      </p>
    </section>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineOptions({ name: 'EmergenciesPage' })

const router = useRouter()

const goBack = () => router.back()

const callEmergency = () => {
  window.location.href = 'tel:123'
}

const openHospitals = () => {
  window.open('https://www.google.com/maps/search/hospital+cercano')
}

const shareLocation = () => {
  if (!navigator.geolocation) {
    alert('La geolocalización no está disponible')
    return
  }

  navigator.geolocation.getCurrentPosition(pos => {
    const { latitude, longitude } = pos.coords
    const url = `https://maps.google.com/?q=${latitude},${longitude}`
    navigator.share
      ? navigator.share({
          title: 'Mi ubicación actual',
          text: 'Estoy aquí:',
          url
        })
      : window.open(url)
  })
}
</script>

<style scoped>
.page {
  padding-bottom: 140px;
  background: #f6f6f6;
}

/* HERO */
.hero {
  background: linear-gradient(135deg, #000, #1c1c1c);
  color: white;
  padding: 32px 24px;
  border-radius: 0 0 36px 36px;
}

.back {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
}

.hero-content {
  text-align: center;
  margin-top: 12px;
}

.shield {
  font-size: 44px;
}

/* PANIC */
.panic {
  padding: 20px 16px;
}

.panic-btn {
  width: 100%;
  background: linear-gradient(135deg, #d32f2f, #b71c1c);
  color: white;
  border: none;
  padding: 18px;
  border-radius: 22px;
  font-size: 18px;
  font-weight: 600;
  box-shadow: 0 14px 36px rgba(211,47,47,.4);
}

.panic-btn small {
  display: block;
  font-size: 13px;
  opacity: .9;
}

/* ACTIONS */
.actions {
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.emergency-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: white;
  padding: 16px;
  border-radius: 20px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 10px 28px rgba(0,0,0,.12);
}

.emergency-card .icon {
  font-size: 32px;
}

.red { border-left: 6px solid #e53935 }
.blue { border-left: 6px solid #1e88e5 }
.orange { border-left: 6px solid #fb8c00 }

/* LOCATION */
.location {
  margin: 24px 16px;
  background: white;
  padding: 20px;
  border-radius: 22px;
  box-shadow: 0 10px 28px rgba(0,0,0,.1);
}

.secondary-btn {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
  border-radius: 16px;
  border: none;
  background: #000;
  color: white;
}

.secondary-btn.outline {
  background: transparent;
  border: 1px solid #000;
  color: #000;
}

/* TIPS */
.tips {
  margin: 24px 16px;
}

.tips ul {
  background: white;
  padding: 18px;
  border-radius: 20px;
  list-style: none;
  box-shadow: 0 10px 28px rgba(0,0,0,.08);
}

.tips li {
  margin-bottom: 8px;
  font-size: 14px;
}

/* NOTE */
.note {
  text-align: center;
  margin: 24px;
  font-size: 13px;
  color: #777;
}
</style>