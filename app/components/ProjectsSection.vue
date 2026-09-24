<template>
  <section id="projects" class="section">
    <div class="container">
      <SectionHead path="/projects" title="Selected work." />

      <ul class="projects">
        <li
          v-for="project in projects"
          :key="project.title"
          v-reveal
          class="project"
          @pointermove="spotlight"
        >
          <div class="project-main">
            <p class="project-kind">{{ project.kind }}</p>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-desc">{{ project.description }}</p>

            <div class="project-links">
              <a v-if="project.link" :href="project.link" target="_blank" rel="noopener" class="btn btn-primary">
                Visit site
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>
              </a>
              <a :href="project.github" target="_blank" rel="noopener" class="btn btn-ghost">
                View on GitHub
              </a>
            </div>
          </div>

          <div class="project-side">
            <p class="side-label">What it does</p>
            <ul class="project-features">
              <li v-for="(feature, i) in project.features" :key="feature" :style="{ '--i': i }">{{ feature }}</li>
            </ul>

            <p class="side-label">Built with</p>
            <ul class="project-stack">
              <li v-for="tag in project.tags" :key="tag" class="chip">{{ tag }}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
// Light follows the cursor across the card.
const spotlight = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

// `link` is a live URL, or null to hide the "Visit site" button.
const projects = [
  {
    title: 'E-Commerce Titan',
    kind: 'E-commerce platform',
    description: 'An end-to-end store built with security and scalability in mind, handling complex product variants, real-time inventory and payments.',
    features: ['Product variants', 'Real-time inventory management', 'Stripe checkout', 'Automated invoicing'],
    tags: ['Laravel', 'Vue.js', 'Stripe', 'MySQL'],
    github: 'https://github.com/adnan21-r',
    link: null,
  },
  {
    title: 'Crisis Control OS',
    kind: 'Emergency management system',
    description: 'A system for tracking donor families and allocating resources during emergencies, with live geolocation and instant communication between coordinators.',
    features: ['Live geolocation tracking', 'Multi-user coordination', 'Instant alerts over WebSockets'],
    tags: ['PHP', 'JavaScript', 'Google Maps', 'WebSockets'],
    github: 'https://github.com/adnan21-r',
    link: null,
  },
  {
    title: 'This portfolio',
    kind: 'Personal site',
    description: 'Designed around the idea of a developer as an API: every section is a route, and the landing view sends a request that returns my profile.',
    features: ['Server-rendered with Nuxt 4', 'Responsive down to small phones', 'Keyboard and reduced-motion friendly'],
    tags: ['Nuxt 4', 'Vue 3', 'CSS'],
    github: 'https://github.com/adnan21-r',
    link: null,
  },
];
</script>

<style scoped>
.projects {
  list-style: none;
  display: grid;
  gap: 1.25rem;
}

.project {
  position: relative;
  isolation: isolate;
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.project::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(42, 68, 230, 0.09), transparent 65%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project:hover {
  border-color: var(--ink);
  box-shadow: 0 24px 48px -30px rgba(18, 21, 28, 0.5);
}

.project:hover::before {
  opacity: 1;
}

.project-title {
  transition: color 0.25s ease;
}

.project:hover .project-title {
  color: var(--accent);
}

:global([data-motion]) .project-features li {
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity 0.5s var(--ease-out), transform 0.5s var(--ease-out);
  transition-delay: calc(var(--i) * 80ms + 300ms);
}

:global([data-motion]) .project.is-in .project-features li {
  opacity: 1;
  transform: none;
}

.project-main {
  padding: clamp(1.5rem, 3.5vw, 2.5rem);
  display: flex;
  flex-direction: column;
}

.project-kind {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.project-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 3.2vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.05;
  margin-bottom: 1rem;
}

.project-desc {
  color: var(--ink-2);
  max-width: 36rem;
  margin-bottom: 1.75rem;
}

.project-links {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.project-side {
  padding: clamp(1.5rem, 3.5vw, 2.5rem);
  border-left: 1px solid var(--rule);
  background: var(--canvas);
}

.side-label {
  font-family: var(--font-mono);
  font-size: 0.66rem;
  color: var(--muted);
  margin-bottom: 0.75rem;
}

.project-features {
  list-style: none;
  margin-bottom: 1.75rem;
}

.project-features li {
  padding: 0.5rem 0;
  border-bottom: 1px dashed var(--rule);
  font-size: 0.95rem;
}

.project-stack {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

@media (max-width: 860px) {
  .project {
    grid-template-columns: 1fr;
  }

  .project-side {
    border-left: none;
    border-top: 1px solid var(--rule);
  }
}
</style>
