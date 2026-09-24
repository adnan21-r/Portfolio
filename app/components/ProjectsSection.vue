<template>
  <section id="projects" class="section">
    <div class="container">
      <div class="section-head">
        <p class="section-route" translate="no"><span class="method get">GET</span> /projects</p>
        <h2 class="section-title">Selected work.</h2>
      </div>

      <ul class="projects">
        <li v-for="project in projects" :key="project.title" class="project">
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
              <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
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
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 14px;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.project:hover {
  border-color: var(--ink);
  box-shadow: 0 20px 40px -28px rgba(18, 21, 28, 0.45);
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
