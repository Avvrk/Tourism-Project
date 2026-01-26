<template>
  <div class="page">

    <!-- HEADER -->
    <header class="header">
      <button class="back" @click="goBack">←</button>
      <div class="header-info">
        <h2>Asistente turístico</h2>
        <small>
          🟢 En línea · {{ assistantMood }}
        </small>
      </div>
    </header>

    <!-- AI PRESENCE -->
    <section class="ai-presence">
      <div class="avatar">🤖</div>
      <div class="presence-text">
        <h3>{{ assistantTitle }}</h3>
        <p>{{ assistantSubtitle }}</p>
      </div>
    </section>

    <!-- CONTEXT CARDS -->
    <section class="context-cards">
      <div class="context-card" @click="ask('¿Cómo está el clima hoy?')">
        🌦️ Clima actual
      </div>
      <div class="context-card" @click="ask('¿Hay alertas o noticias importantes?')">
        🚨 Alertas
      </div>
      <div class="context-card" @click="ask('Recomendaciones cerca de mí')">
        📍 Cerca de ti
      </div>
    </section>

    <!-- QUICK INTENTS -->
    <section class="intents">
      <h3>¿Qué quieres hacer?</h3>
      <div class="intent-grid">
        <button @click="ask('Quiero planear un viaje')">🧳 Planear</button>
        <button @click="ask('Háblame de un destino')">📍 Destino</button>
        <button @click="ask('Recomiéndame experiencias')">⭐ Experiencias</button>
        <button @click="ask('Consejos de seguridad')">🛡️ Seguridad</button>
      </div>
    </section>

    <!-- CHAT -->
    <section class="chat">
      <textarea
        v-model="prompt"
        placeholder="Pregúntame cualquier cosa sobre tu viaje..."
      />

      <button class="cta" :disabled="!prompt || loading" @click="send">
        {{ loading ? 'Pensando…' : 'Hablar con el asistente 🤖' }}
      </button>
    </section>

    <!-- AI RESPONSE -->
    <section v-if="aiResponse" class="ai-response">
      <header class="response-header">
        🤖 {{ aiResponse.title }}
      </header>

      <!-- PLAN -->
      <div v-if="aiResponse.type === 'plan'" class="response-body">
        <div
          v-for="(day, i) in aiResponse.data.days"
          :key="i"
          class="day-card"
        >
          <h4>Día {{ i + 1 }} · {{ day.place }}</h4>
          <ul>
            <li v-for="(act, j) in day.activities" :key="j">
              • {{ act }}
            </li>
          </ul>
          <small>💡 {{ day.tip }}</small>
        </div>
      </div>

      <!-- INFO -->
      <div v-if="aiResponse.type === 'info'" class="info-card">
        <p>{{ aiResponse.data }}</p>
      </div>

      <!-- ACTIONS -->
      <div class="response-actions">
        <button
          v-if="aiResponse.type === 'plan'"
          @click="savePlan"
        >
          ⭐ Guardar plan
        </button>

        <button @click="continueChat">
          💬 Seguir conversando
        </button>
      </div>
    </section>

    <!-- MEMORY -->
    <section v-if="savedPlans.length" class="memory">
      <h3>📌 Tu memoria de viaje</h3>

      <div
        v-for="(plan, i) in savedPlans"
        :key="i"
        class="memory-card"
        @click="loadPlan(plan)"
      >
        🤖 {{ plan.prompt }}
      </div>
    </section>

    <footer class="footer">
      <small>
        Asistente en evolución · Diseñado para acompañarte siempre
      </small>
    </footer>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

defineOptions({ name: 'AiPage' })

const router = useRouter()

const prompt = ref('')
const loading = ref(false)
const aiResponse = ref(null)

const savedPlans = ref(
  JSON.parse(localStorage.getItem('ai-plans') || '[]')
)

/* 🧠 Estado del asistente */
const assistantMood = computed(() =>
  loading.value ? 'Analizando contexto' : 'Listo para ayudarte'
)

const assistantTitle = computed(() =>
  aiResponse.value
    ? 'Estoy procesando tu viaje'
    : 'Soy tu asistente personal'
)

const assistantSubtitle = computed(() =>
  aiResponse.value
    ? 'Puedo ajustar esto tantas veces como quieras'
    : 'Pregúntame, guíate, explora'
)

const goBack = () => router.back()

const ask = (text) => {
  prompt.value = text
  send()
}

const send = () => {
  if (!prompt.value) return

  loading.value = true
  aiResponse.value = null

  setTimeout(() => {
    const text = prompt.value.toLowerCase()

    if (text.includes('plan')) {
      aiResponse.value = {
        type: 'plan',
        title: 'Itinerario sugerido para ti',
        data: {
          prompt: prompt.value,
          days: [
            {
              place: 'Barichara',
              activities: ['Centro histórico', 'Miradores'],
              tip: 'Ideal en la mañana'
            },
            {
              place: 'San Gil',
              activities: ['Rafting', 'Gastronomía'],
              tip: 'Reserva con anticipación'
            }
          ]
        }
      }
    } else {
      aiResponse.value = {
        type: 'info',
        title: 'Información útil',
        data:
          'Barichara es uno de los pueblos más visitados por su arquitectura colonial, clima templado y tranquilidad.'
      }
    }

    loading.value = false
  }, 1200)
}

const savePlan = () => {
  savedPlans.value.unshift({
    prompt: prompt.value,
    ...aiResponse.value.data
  })
  localStorage.setItem('ai-plans', JSON.stringify(savedPlans.value))
}

const loadPlan = (plan) => {
  prompt.value = plan.prompt
}

const continueChat = () => {
  prompt.value = ''
}
</script>

<style scoped>
.page {
  padding: 16px;
  padding-bottom: 140px;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ai-presence {
  display: flex;
  gap: 16px;
  margin: 24px 0;
}

.avatar {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: radial-gradient(circle, #222, #000);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
}

.context-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 28px;
}

.context-card {
  padding: 12px;
  background: #f4f4f4;
  border-radius: 16px;
  text-align: center;
  font-weight: 600;
}

.intent-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 24px;
}

.intent-grid button {
  padding: 14px;
  border-radius: 18px;
  background: #000;
  color: white;
  border: none;
  font-weight: 600;
}

textarea {
  width: 100%;
  min-height: 100px;
  padding: 14px;
  border-radius: 18px;
  border: none;
  background: #f4f4f4;
  margin-bottom: 14px;
}

.cta {
  width: 100%;
  padding: 14px;
  border-radius: 18px;
  background: #000;
  color: white;
  border: none;
}

.ai-response {
  margin-top: 32px;
  background: white;
  border-radius: 22px;
  box-shadow: 0 12px 32px rgba(0,0,0,.12);
}

.response-header {
  padding: 16px;
  background: linear-gradient(135deg, #111, #000);
  color: white;
}

.day-card {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.memory {
  margin-top: 40px;
}

.memory-card {
  padding: 14px;
  background: #f4f4f4;
  border-radius: 14px;
  margin-bottom: 10px;
}

.footer {
  margin-top: 48px;
  text-align: center;
  font-size: 12px;
  color: #888;
}
</style>