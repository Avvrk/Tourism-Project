<template>
  <div
    class="skeleton"
    :class="variant"
  >
    <div class="image"></div>

    <div class="info">
      <div class="line title"></div>
      <div class="line subtitle"></div>
    </div>
  </div>
</template>

<script setup>
defineOptions({ name: 'SkeletonLoader' })

defineProps({
  variant: {
    type: String,
    default: 'grid' // grid | list | horizontal
  }
})
</script>

<style scoped>
.skeleton {
  background: white;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,.06);
  animation: pulse 1.5s infinite ease-in-out;
}

/* IMAGE */
.image {
  height: 150px;
  background: linear-gradient(
    90deg,
    #eee 25%,
    #f5f5f5 37%,
    #eee 63%
  );
  background-size: 400% 100%;
}

/* INFO */
.info {
  padding: 12px;
}

.line {
  height: 12px;
  background: #eee;
  border-radius: 6px;
  margin-bottom: 8px;
}

.line.title {
  width: 70%;
}

.line.subtitle {
  width: 45%;
}

/* VARIANTS */
.skeleton.horizontal {
  display: flex;
}

.skeleton.horizontal .image {
  width: 120px;
  height: 100%;
}

.skeleton.list .image {
  height: 110px;
}

/* ANIMATION */
@keyframes pulse {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 400% 0%;
  }
}
</style>