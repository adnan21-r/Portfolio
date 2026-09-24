<template>
  <section id="about" class="section">
    <div class="container">
      <SectionHead path="/about" title="The parts of a product most people never see." />

      <div class="about-grid">
        <div v-reveal class="about-text">
          <p>
            I’m a software developer who enjoys the unglamorous core of an application:
            the data model, the permission rules, and the API contract that other teams
            build against. When those are right, everything on top gets easier.
          </p>
          <p>
            Day to day I build Laravel and Livewire systems with Vue.js front ends at
            Orion Dev. Alongside work, I’m completing a BS in Computer Engineering at
            Lebanese International University with a 3.5 GPA.
          </p>
        </div>

        <dl v-reveal="2" class="record" aria-label="Profile">
          <div v-for="row in facts" :key="row.key" class="record-row">
            <dt>{{ row.key }}</dt>
            <dd>
              {{ row.value }}
              <span v-if="row.note" class="record-note">{{ row.note }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<script setup>
const facts = [
  { key: 'role', value: 'Software Developer', note: 'Orion Dev · since Jun 2025' },
  { key: 'education', value: 'BS Computer Engineering', note: 'Lebanese International University · GPA 3.5 / 4.0' },
  { key: 'based_in', value: 'Lebanon', note: 'Onsite or remote' },
  { key: 'focus', value: 'Backend architecture, REST APIs, interactive UIs' },
  { key: 'practices', value: 'Agile sprints, code review, technical documentation' },
];
</script>

<style scoped>
.about-grid {
  display: grid;
  grid-template-columns: var(--rail) minmax(0, 1fr) minmax(0, 1fr);
  gap: 2rem var(--rail-gap);
}

.about-text {
  grid-column: 2;
  font-size: 1.1rem;
  color: var(--ink-2);
}

.about-text p + p {
  margin-top: 1.25rem;
}

.record {
  grid-column: 3;
  border: 1px solid var(--rule);
  border-radius: var(--radius);
  background: var(--surface);
  overflow: hidden;
}

.record-row {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: 1rem;
  padding: 0.95rem 1.1rem;
}

.record-row + .record-row {
  border-top: 1px solid var(--rule);
}

.record dt {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--muted);
  padding-top: 0.2rem;
}

.record dd {
  font-weight: 500;
  line-height: 1.45;
}

.record-note {
  display: block;
  margin-top: 0.2rem;
  font-weight: 400;
  font-size: 0.875rem;
  color: var(--muted);
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr 1fr;
  }

  .about-text { grid-column: 1; }
  .record { grid-column: 2; }
}

@media (max-width: 760px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-text,
  .record {
    grid-column: 1;
  }
}

@media (max-width: 420px) {
  .record-row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}
</style>
