<template>
  <section id="skills" class="section">
    <div class="container">
      <SectionHead path="/skills" title="What I reach for." />

      <div class="stack-grid">
        <div v-for="(group, g) in groups" :key="group.label" v-reveal="g" class="stack-group">
          <h3 class="group-label">{{ group.label }}</h3>
          <p class="group-hint">{{ group.hint }}</p>
          <ul class="group-items">
            <li v-for="(item, i) in group.items" :key="item" :style="{ '--i': i + g * 2 }">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const groups = [
  {
    label: 'Daily in production',
    hint: 'What I ship with at work',
    items: ['Laravel', 'PHP', 'Livewire', 'Vue.js', 'JavaScript', 'MySQL', 'REST APIs', 'Authentication & RBAC', 'MVC architecture'],
  },
  {
    label: 'Also comfortable with',
    hint: 'Used on projects and coursework',
    items: ['Nuxt.js', 'Python', 'Java'],
  },
  {
    label: 'Tooling',
    hint: 'Around the code',
    items: ['Git', 'Postman', 'Docker', 'VS Code', 'Figma'],
  },
];
</script>

<style scoped>
.stack-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  border-top: 1px solid var(--ink);
}

.stack-group {
  padding: 1.5rem 2rem 0 0;
}

.stack-group + .stack-group {
  padding-left: 2rem;
  border-left: 1px solid var(--rule);
}

.group-label {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 500;
}

.group-hint {
  font-size: 0.85rem;
  color: var(--muted);
  margin-bottom: 1.5rem;
}

.group-items {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.2rem 1.1rem;
}

.group-items li {
  position: relative;
  cursor: default;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.2vw, 1.6rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.35;
}

.group-items li::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.1em;
  height: 2px;
  background: var(--accent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s var(--ease-out);
}

.group-items li:hover::after {
  transform: none;
}

@media (max-width: 860px) {
  .stack-grid {
    grid-template-columns: 1fr;
  }

  .stack-group,
  .stack-group + .stack-group {
    padding: 1.5rem 0;
    border-left: none;
  }

  .stack-group + .stack-group {
    border-top: 1px solid var(--rule);
  }
}
</style>
