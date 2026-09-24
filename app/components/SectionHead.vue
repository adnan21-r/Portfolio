<template>
  <div v-reveal class="section-head reveal-words" @reveal="respond">
    <p class="section-route" translate="no">
      <span class="method" :class="method.toLowerCase()">{{ method }}</span> {{ path }}
      <span class="route-status" :class="{ on: status }" aria-hidden="true">{{ status }}</span>
    </p>
    <h2 class="section-title"><SplitWords :text="title" /></h2>
  </div>
</template>

<script setup>
defineProps({
  method: { type: String, default: 'GET' },
  path: { type: String, required: true },
  title: { type: String, required: true },
});

// Each section "answers" its route once it scrolls into view.
const status = ref('');
const respond = () => {
  setTimeout(() => {
    status.value = `200 · ${12 + Math.floor(Math.random() * 30)}ms`;
  }, 420);
};
</script>
