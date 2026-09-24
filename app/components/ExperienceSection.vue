<template>
  <section id="experience" class="section">
    <div class="container">
      <div class="section-head">
        <p class="section-route" translate="no"><span class="method get">GET</span> /experience</p>
        <h2 class="section-title">Where I’ve shipped production code.</h2>
      </div>

      <ol class="jobs">
        <li v-for="job in jobs" :key="job.migration" class="job">
          <div class="job-when">
            <p class="job-date">{{ job.date }}</p>
            <p class="job-migration">{{ job.migration }}</p>
            <span v-if="job.current" class="job-current">Current</span>
          </div>

          <div class="job-body">
            <h3 class="job-title">{{ job.title }} <span class="job-at">at {{ job.company }}</span></h3>
            <p class="job-type">{{ job.type }}</p>

            <ul class="job-tasks">
              <li v-for="task in job.tasks" :key="task">{{ task }}</li>
            </ul>

            <ul class="job-stack" aria-label="Stack">
              <li v-for="tech in job.stack" :key="tech" class="chip">{{ tech }}</li>
            </ul>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
const jobs = [
  {
    title: 'Software Developer',
    company: 'Orion Dev',
    type: 'Onsite',
    date: 'Jun 2025 – Present',
    current: true,
    migration: '2025_06_01_join_orion_dev.php',
    tasks: [
      'Build Laravel + Livewire systems with Vue.js front-end integration',
      'Design and document secure RESTful APIs, shipped with Postman collections for consuming teams',
      'Deliver admin dashboards and control panels in agile sprint cycles',
      'Implement authentication and role-based access control',
    ],
    stack: ['Laravel', 'Livewire', 'Vue.js', 'MySQL', 'Postman', 'Git'],
  },
  {
    title: 'Backend Developer',
    company: 'Xpertbot',
    type: 'Remote',
    date: 'Mar 2025 – Sep 2025',
    migration: '2025_03_01_join_xpertbot.php',
    tasks: [
      'Proposed and built scalable backend services in Laravel',
      'Produced ERDs, migrations, models and authentication APIs',
      'Added advanced validation, JWT authentication and a modular architecture',
      'Worked with front-end teams to keep API integration smooth',
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'JWT Auth', 'REST APIs', 'Git'],
  },
];
</script>

<style scoped>
.jobs {
  list-style: none;
}

.job {
  display: grid;
  grid-template-columns: var(--rail) 1fr;
  gap: 1rem var(--rail-gap);
  padding: 2.25rem 0;
  border-top: 1px dashed var(--rule);
}

.job:first-child {
  border-top: none;
  padding-top: 0;
}

.job-date {
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.job-migration {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--muted);
  word-break: break-all;
}

.job-current {
  display: inline-block;
  margin-top: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--get);
  padding: 0.2rem 0.5rem;
  border: 1px solid currentColor;
  border-radius: 999px;
}

.job-title {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.4vw, 1.75rem);
  font-weight: 650;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.job-at {
  color: var(--muted);
  font-weight: 500;
}

.job-type {
  font-size: 0.9rem;
  color: var(--muted);
  margin: 0.25rem 0 1.25rem;
}

.job-tasks {
  list-style: none;
  max-width: 44rem;
  margin-bottom: 1.5rem;
}

.job-tasks li {
  position: relative;
  padding-left: 1.4rem;
  color: var(--ink-2);
}

.job-tasks li + li {
  margin-top: 0.5rem;
}

.job-tasks li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--accent);
}

.job-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  list-style: none;
}

@media (max-width: 800px) {
  .job {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
