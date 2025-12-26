<template>
  <section id="experience" class="section">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow">Career Path</span>
        <h2 class="section-title">Work <span class="gradient-text">Experience</span></h2>
      </div>

      <div class="experience-timeline">
        <div class="timeline-line">
          <div class="line-progress"></div>
        </div>

        <div v-for="(job, index) in jobs" :key="index" class="timeline-item">
          <div class="timeline-dot">
            <div class="dot-inner"></div>
            <div class="dot-ring"></div>
          </div>

          <div class="timeline-card glass-card">
            <div class="card-header">
              <div class="card-meta">
                <span class="job-date">{{ job.date }}</span>
                <span class="job-type tag">{{ job.type }}</span>
              </div>
              <h3 class="job-title">{{ job.title }}</h3>
              <p class="job-company">
                <Briefcase :size="16" class="company-icon" />
                {{ job.company }}
              </p>
            </div>

            <ul class="job-responsibilities">
              <li v-for="(task, i) in job.tasks" :key="i">
                <span class="task-bullet"></span>
                {{ task }}
              </li>
            </ul>

            <div class="job-stack">
              <span v-for="tech in job.stack" :key="tech" class="stack-item">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Briefcase } from 'lucide-vue-next';
const jobs = [
  {
    title: 'Software Developer',
    company: 'Orion Dev',
    type: 'Onsite',
    date: 'Jun 2025 – Present',
    tasks: [
      'Architecting and developing Laravel + Livewire systems with Vue.js frontend integration',
      'Designing and documenting secure RESTful APIs with comprehensive Postman collections',
      'Building interactive admin dashboards and control panels in agile sprint cycles',
      'Implementing authentication systems and role-based access control'
    ],
    stack: ['Laravel', 'Livewire', 'Vue.js', 'MySQL', 'Postman', 'Git']
  },
  {
    title: 'Backend Developer',
    company: 'Xpertbot',
    type: 'Remote',
    date: 'Mar 2025 – Sep 2025',
    tasks: [
      'Proposed and implemented scalable backend services using Laravel framework',
      'Created comprehensive ERD diagrams, migrations, models, and authentication APIs',
      'Integrated advanced validation rules, JWT token-based auth, and modular architecture',
      'Collaborated with frontend teams to ensure seamless API integration'
    ],
    stack: ['Laravel', 'PHP', 'MySQL', 'JWT Auth', 'REST APIs', 'Git']
  }
];
</script>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.experience-timeline {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
}

/* Timeline Line */
.timeline-line {
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--border-subtle);
}

.line-progress {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, var(--primary), var(--secondary), var(--tertiary));
  transform-origin: top;
  animation: line-grow 2s ease-out forwards;
}

@keyframes line-grow {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

/* Timeline Item */
.timeline-item {
  position: relative;
  padding-left: 70px;
  padding-bottom: 3rem;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

/* Timeline Dot */
.timeline-dot {
  position: absolute;
  left: 10px;
  top: 2rem;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot-inner {
  width: 14px;
  height: 14px;
  background: var(--primary);
  border-radius: 50%;
  z-index: 2;
}

.dot-ring {
  position: absolute;
  inset: 0;
  border: 2px solid var(--primary);
  border-radius: 50%;
  opacity: 0.3;
  animation: dot-pulse 2s infinite;
}

@keyframes dot-pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.5); opacity: 0; }
}

/* Card */
.timeline-card {
  padding: 2rem;
}

.card-header {
  margin-bottom: 1.5rem;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.job-date {
  font-family: var(--font-mono);
  font-size: 0.875rem;
  color: var(--primary);
}

.job-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.job-company {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
}

.company-icon {
  color: var(--primary);
}

/* Responsibilities */
.job-responsibilities {
  list-style: none;
  margin-bottom: 1.5rem;
}

.job-responsibilities li {
  display: flex;
  gap: 1rem;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
  line-height: 1.7;
}

.task-bullet {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-top: 0.6rem;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  border-radius: 50%;
}

/* Tech Stack */
.job-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.stack-item {
  padding: 0.375rem 0.875rem;
  font-size: 0.8rem;
  font-weight: 500;
  background: var(--bg-deep);
  border: 1px solid var(--border-subtle);
  border-radius: 0.5rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.stack-item:hover {
  border-color: var(--primary);
  color: var(--primary);
}

@media (max-width: 768px) {
  .timeline-line {
    left: 14px;
  }

  .timeline-item {
    padding-left: 50px;
  }

  .timeline-dot {
    left: 0;
  }

  .timeline-card {
    padding: 1.5rem;
  }
}
</style>
