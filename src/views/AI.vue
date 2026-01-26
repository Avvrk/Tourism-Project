<template>
  <div class="page">
    <!-- HEADER -->
    <div class="header">
      <button class="back" @click="goBack">← Volver</button>
    </div>

    <h1 class="title">Asistente turístico 🤖</h1>

    <p class="subtitle">
      Dime qué tipo de viaje quieres y te ayudo a planearlo ✨
    </p>

    <!-- QUICK SUGGESTIONS -->
    <div class="suggestions">
      <button @click="ask('Plan de 2 días en San Gil')">
        🏞️ 2 días en San Gil
      </button>
      <button @click="ask('Viaje familiar en Santander')">
        👨‍👩‍👧 Viaje familiar
      </button>
      <button @click="ask('Aventura extrema en Santander')">
        🧗 Aventura extrema
      </button>
    </div>

    <!-- INPUT -->
    <textarea
      v-model="prompt"
      placeholder="Ej: ¿Qué hacer un fin de semana en Barichara?"
    />

    <button class="cta" @click="send" :disabled="!prompt">
      Preguntar
    </button>

    <!-- RESPONSE -->
    <div v-if="response" class="response">
      <strong>Respuesta:</strong>
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'AiPage' })

const router = useRouter()

const prompt = ref('')
const response = ref('')

const goBack = () => {
  router.back()
}

const ask = (text) => {
  prompt.value = text
  send()
}

const send = () => {
  if (!prompt.value) return

  // 🔮 Mock de IA (luego aquí conectas API real)
  response.value = `✨ Plan sugerido para: "${prompt.value}"

• Lugares recomendados
• Actividades principales
• Tips de viaje
• Mejor época para visitar

(Próximamente con IA real 🤖)`
}
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 80px;
  position: relative;
  overflow-x: hidden;
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

/* TITLES */
.title {
  margin-bottom: 6px;
}

.subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

/* SUGGESTIONS */
.suggestions {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  margin-bottom: 16px;
}

.suggestions button {
  padding: 10px 14px;
  border-radius: 20px;
  border: none;
  background: #f2f2f2;
  cursor: pointer;
  white-space: nowrap;
}

/* INPUT */
textarea {
  width: 100%;
  min-height: 90px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  resize: none;
  margin-bottom: 16px;
  font-family: inherit;
}

/* CTA */
.cta {
  width: 100%;
  padding: 14px;
  border: none;
  background: #000;
  color: white;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
}

.cta:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* RESPONSE */
.response {
  margin-top: 24px;
  background: white;
  padding: 16px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0,0,0,.08);
}

.response p {
  margin-top: 8px;
  line-height: 1.5;
}
</style>