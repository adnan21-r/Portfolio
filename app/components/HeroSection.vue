<template>
  <section class="hero">
    <div class="container hero-container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="pulse"></span>
          <span class="badge-text">Available for opportunities</span>
        </div>

        <h1 class="hero-title">
          <span class="line">Crafting</span>
          <span class="line gradient-text">Digital Excellence</span>
          <span class="line">Through Code</span>
        </h1>

        <p class="hero-description">
          I'm <strong>Adnan Al Rakka</strong> — a passionate Software Developer 
          specializing in building secure, scalable backend systems and stunning 
          interactive experiences. Transforming ideas into powerful digital realities.
        </p>

        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-number">2<span class="accent">+</span></span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">10<span class="accent">+</span></span>
            <span class="stat-label">Projects Built</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-number">3.3</span>
            <span class="stat-label">GPA • LIU</span>
          </div>
        </div>

        <div class="hero-actions">
          <a href="#projects" class="btn btn-primary">
            <span>Explore My Work</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M7 17L17 7M17 7H7M17 7V17"/>
            </svg>
          </a>
          <a href="#contact" class="btn btn-outline">
            <span>Get In Touch</span>
          </a>
        </div>

        <div class="hero-social">
          <a href="https://www.linkedin.com/in/adnan-al-rakka-978003338" target="_blank" class="social-link" aria-label="LinkedIn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a href="https://github.com/adnan21-r" target="_blank" class="social-link" aria-label="GitHub">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="mailto:adnanalrakka_2004@hotmail.com" class="social-link" aria-label="Email">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="floating-card card-1">
          <div class="card-icon">⚡</div>
          <div class="card-text">Laravel Expert</div>
        </div>
        <div class="floating-card card-2">
          <div class="card-icon">🎨</div>
          <div class="card-text">Vue.js</div>
        </div>
        <div class="floating-card card-3">
          <div class="card-icon">🔐</div>
          <div class="card-text">Secure APIs</div>
        </div>

        <div class="code-sphere">
          <div class="sphere-ring ring-1"></div>
          <div class="sphere-ring ring-2"></div>
          <div class="sphere-ring ring-3"></div>
          <div class="sphere-core"></div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="mouse">
        <div class="wheel"></div>
      </div>
      <span>Scroll to explore</span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  padding: 8rem 0 4rem;
}

.hero-container {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 4rem;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1.25rem;
  background: rgba(74, 222, 128, 0.1);
  border: 1px solid rgba(74, 222, 128, 0.3);
  border-radius: 3rem;
  margin-bottom: 2rem;
}

.pulse {
  width: 10px;
  height: 10px;
  background: var(--accent);
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74, 222, 128, 0.5); }
  50% { box-shadow: 0 0 0 10px rgba(74, 222, 128, 0); }
}

.badge-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--accent);
}

.hero-title {
  margin-bottom: 1.5rem;
}

.hero-title .line {
  display: block;
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.hero-description {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 550px;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.hero-description strong {
  color: var(--text-primary);
  font-weight: 600;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2.5rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
}

.stat-number .accent {
  color: var(--primary);
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: var(--border-subtle);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.hero-social {
  display: flex;
  gap: 1rem;
}

.social-link {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-radius: 0.75rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.social-link:hover {
  color: var(--primary);
  border-color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px var(--glow-primary);
}

/* Visual Side */
.hero-visual {
  position: relative;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-card {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--bg-glass);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: float 6s ease-in-out infinite;
  z-index: 10;
}

.card-icon {
  font-size: 1.5rem;
}

.card-text {
  font-weight: 600;
  white-space: nowrap;
}

.card-1 {
  top: 10%;
  left: 0;
  animation-delay: 0s;
}

.card-2 {
  top: 45%;
  right: 0;
  animation-delay: -2s;
}

.card-3 {
  bottom: 15%;
  left: 10%;
  animation-delay: -4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-15px) rotate(2deg); }
  75% { transform: translateY(10px) rotate(-2deg); }
}

/* Code Sphere */
.code-sphere {
  position: relative;
  width: 300px;
  height: 300px;
}

.sphere-ring {
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-radius: 50%;
  animation: orbit 10s linear infinite;
}

.ring-1 {
  border-top-color: var(--primary);
  border-right-color: var(--primary);
  animation-duration: 8s;
}

.ring-2 {
  inset: 20px;
  border-bottom-color: var(--secondary);
  border-left-color: var(--secondary);
  animation-duration: 12s;
  animation-direction: reverse;
}

.ring-3 {
  inset: 40px;
  border-top-color: var(--tertiary);
  border-right-color: var(--tertiary);
  animation-duration: 15s;
}

@keyframes orbit {
  from { transform: rotateX(60deg) rotateZ(0deg); }
  to { transform: rotateX(60deg) rotateZ(360deg); }
}

.sphere-core {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, var(--primary), var(--primary-dark));
  border-radius: 50%;
  box-shadow: 
    0 0 60px var(--glow-primary),
    inset 0 0 30px rgba(255, 255, 255, 0.2);
  animation: pulse-core 3s ease-in-out infinite;
}

@keyframes pulse-core {
  0%, 100% { box-shadow: 0 0 60px var(--glow-primary); }
  50% { box-shadow: 0 0 100px var(--glow-primary), 0 0 150px var(--glow-secondary); }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.mouse {
  width: 26px;
  height: 42px;
  border: 2px solid var(--text-muted);
  border-radius: 13px;
  position: relative;
}

.wheel {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 10px;
  background: var(--primary);
  border-radius: 2px;
  animation: scroll-wheel 2s infinite;
}

@keyframes scroll-wheel {
  0%, 100% { opacity: 1; top: 8px; }
  50% { opacity: 0.3; top: 20px; }
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-social {
    justify-content: center;
  }

  .hero-visual {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
  }

  .stat-divider {
    width: 50px;
    height: 1px;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn {
    width: 100%;
  }
}
</style>
