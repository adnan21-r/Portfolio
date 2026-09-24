<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section-head">
        <p class="section-route" translate="no"><span class="method get">GET</span> /skills</p>
        <h2 class="section-title">What I reach for.</h2>
      </div>

      <div class="stack-grid">
        <div v-for="group in groups" :key="group.label" class="stack-group">
          <h3 class="group-label">{{ group.label }}</h3>
          <p class="group-hint">{{ group.hint }}</p>
          <ul class="group-items">
            <li v-for="item in group.items" :key="item">{{ item }}</li>
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
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.2vw, 1.6rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.35;
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
