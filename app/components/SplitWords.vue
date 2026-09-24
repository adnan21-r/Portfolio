<template><template v-for="(word, i) in words" :key="i"><span class="w"><span :style="{ '--i': i + offset }">{{ word }}</span></span>{{ i < words.length - 1 ? ' ' : '' }}</template></template>

<script setup>
// Wraps each word in a mask so it can rise into place. `offset` continues
// the stagger when a sentence is split across several SplitWords.
const props = defineProps({
  text: { type: String, required: true },
  offset: { type: Number, default: 0 },
});

const words = computed(() => props.text.split(' '));
</script>
