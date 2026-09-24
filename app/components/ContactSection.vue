<template>
  <section id="contact" class="contact">
    <div class="container">
      <div v-reveal class="reveal-words">
      <p class="contact-route" translate="no"><span class="method-post">POST</span> /contact</p>
      <h2 class="contact-title"><SplitWords text="Have a system that needs building? Let’s talk." /></h2>
      </div>
      <p v-reveal="2" class="contact-lede">
        I’m open to full-time roles and freelance backend work. The fastest way to
        reach me is email, or you can book a short call.
      </p>

      <div v-reveal="3" class="contact-email">
        <a :href="`mailto:${email}`" class="email-link" translate="no">{{ email }}</a>
        <button class="copy-btn" @click="copyEmail">
          {{ copied ? 'Copied' : 'Copy email' }}
        </button>
        <span class="visually-hidden" aria-live="polite">{{ copied ? 'Email address copied' : '' }}</span>
      </div>

      <div v-reveal="4" class="contact-actions">
        <a :href="calendlyUrl" class="btn btn-invert" target="_blank" rel="noopener" @click.prevent="openCalendly">
          Book a call
        </a>
        <div class="contact-links">
          <a href="https://www.linkedin.com/in/adnan-al-rakka-978003338" target="_blank" rel="noopener" class="contact-link">LinkedIn</a>
          <a href="https://github.com/adnan21-r" target="_blank" rel="noopener" class="contact-link">GitHub</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const email = 'adnanalrakka_2004@hotmail.com';
const calendlyUrl = 'https://calendly.com/adnanalrakka_2004/new-meeting-1';
const copied = ref(false);

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email);
    copied.value = true;
    setTimeout(() => { copied.value = false; }, 2000);
  } catch {
    window.location.href = `mailto:${email}`;
  }
};

// Load Calendly only when someone actually wants to book.
const loadCalendly = () => new Promise((resolve, reject) => {
  if (window.Calendly) return resolve();
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://assets.calendly.com/assets/external/widget.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = 'https://assets.calendly.com/assets/external/widget.js';
  script.async = true;
  script.onload = resolve;
  script.onerror = reject;
  document.head.appendChild(script);
});

const openCalendly = async () => {
  try {
    await loadCalendly();
    window.Calendly.initPopupWidget({ url: calendlyUrl });
  } catch {
    window.open(calendlyUrl, '_blank', 'noopener');
  }
};
</script>

<style scoped>
.contact {
  background: var(--code-bg);
  color: var(--code-text);
  padding: var(--section-space) 0;
}

.contact-route {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--code-dim);
  margin-bottom: 1.5rem;
}

.method-post {
  color: var(--code-literal);
  font-weight: 500;
}

.contact-title {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 6vw, 4.75rem);
  font-weight: 750;
  line-height: 1;
  letter-spacing: -0.045em;
  color: #fff;
  max-width: 15ch;
  margin-bottom: 1.5rem;
}

.contact-lede {
  font-size: 1.1rem;
  max-width: 34rem;
  color: var(--code-dim);
  margin-bottom: 3rem;
}

.contact-email {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem 0;
  border-top: 1px solid var(--code-line);
  border-bottom: 1px solid var(--code-line);
  margin-bottom: 2rem;
}

.email-link {
  font-family: var(--font-mono);
  font-size: clamp(0.85rem, 2.4vw, 1.4rem);
  color: #fff;
  overflow-wrap: anywhere;
  transition: color 0.2s ease;
}

.email-link {
  background: linear-gradient(currentColor, currentColor) left bottom / 0 1px no-repeat;
  transition: color 0.2s ease, background-size 0.35s var(--ease-out);
}

.email-link:hover {
  color: var(--code-key);
  background-size: 100% 1px;
}

.copy-btn {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 0.4rem 0.8rem;
  background: transparent;
  color: var(--code-text);
  border: 1px solid var(--code-line);
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.copy-btn:hover {
  border-color: var(--code-dim);
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem 2rem;
}

.contact-links {
  display: flex;
  gap: 1.5rem;
}

.btn-invert {
  background: #fff;
  color: var(--ink);
}

.btn-invert:hover {
  background: var(--code-key);
}

.contact-link {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--code-text);
  border-bottom: 1px solid var(--code-line);
  padding-bottom: 2px;
  transition: border-color 0.2s ease, color 0.2s ease;
}

.contact-link:hover {
  color: #fff;
  border-color: #fff;
}

.contact :focus-visible {
  outline-color: var(--code-key);
}
</style>
