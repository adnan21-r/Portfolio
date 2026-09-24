<template>
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="hero-eyebrow hero-fade" style="--delay: 0ms">
          <span class="status-dot" aria-hidden="true"></span>
          Software developer · Lebanon · Open to new roles
        </p>

        <h1 class="hero-title">
          <SplitWords text="I build the backend your product" /> <em><SplitWords text="stands on." :offset="6" /></em>
        </h1>

        <p class="hero-lede hero-fade" style="--delay: 520ms">
          I’m Adnan Al Rakka. I design Laravel systems, secure REST APIs and the
          Vue.js interfaces that sit on top of them. Currently a software developer
          at Orion Dev.
        </p>

        <div class="hero-actions hero-fade" style="--delay: 640ms">
          <a href="#projects" class="btn btn-primary">
            See my work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          </a>
          <a href="mailto:adnanalrakka_2004@hotmail.com" class="btn btn-ghost">Email me</a>
        </div>

        <ul class="hero-social hero-fade" style="--delay: 740ms">
          <li><a href="https://github.com/adnan21-r" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/adnan-al-rakka-978003338" target="_blank" rel="noopener">LinkedIn</a></li>
        </ul>
      </div>

      <div class="hero-side hero-fade" style="--delay: 380ms">
      <div class="client" role="region" translate="no" aria-label="API request returning a profile of Adnan">
        <div class="client-bar">
          <span class="client-method">GET</span>
          <code class="client-url">/api/developers/<b>adnan-al-rakka</b></code>
          <button class="client-send" :disabled="state === 'loading'" @click="send">
            {{ state === 'loading' ? 'Sending…' : 'Send' }}
          </button>
        </div>

        <div class="client-status" aria-live="polite">
          <template v-if="state === 'done'">
            <span class="status-ok">200 OK</span>
            <span>{{ latency }} ms</span>
            <span>application/json</span>
          </template>
          <span v-else-if="state === 'loading'" class="status-wait">Waiting for response…</span>
          <span v-else>&nbsp;</span>
        </div>

        <pre class="client-body"><code><span v-for="(line, i) in lines" :key="i" class="code-line" :class="{ shown: i < visibleLines }"><span class="ln" aria-hidden="true">{{ i + 1 }}</span><span v-for="(seg, j) in line" :key="j" :class="seg.c">{{ seg.t }}</span></span></code></pre>
      </div>

      <RequestTrace ref="trace" />
      <p class="trace-caption" translate="no">
        <span class="caption-dot" :class="{ busy: state === 'loading' }" aria-hidden="true"></span>
        Live request trace · press Send to replay
      </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const profile = {
  name: 'Adnan Al Rakka',
  role: 'Software Developer',
  company: 'Orion Dev',
  location: 'Lebanon',
  stack: ['Laravel', 'Livewire', 'Vue.js', 'MySQL'],
  focus: ['REST APIs', 'Auth & RBAC', 'Admin dashboards'],
  available: true,
};

const literal = (v) => (typeof v === 'string'
  ? { t: `"${v}"`, c: 'tok-str' }
  : { t: String(v), c: 'tok-lit' });

// Turn the profile into syntax-highlighted lines; short arrays stay on one line.
const buildLines = (obj) => {
  const out = [[{ t: '{', c: 'tok-punct' }]];
  const entries = Object.entries(obj);
  entries.forEach(([key, value], i) => {
    const comma = i < entries.length - 1 ? ',' : '';
    const line = [{ t: '  ' }, { t: `"${key}"`, c: 'tok-key' }, { t: ': ', c: 'tok-punct' }];
    if (Array.isArray(value)) {
      line.push({ t: '[', c: 'tok-punct' });
      value.forEach((item, k) => {
        line.push(literal(item));
        if (k < value.length - 1) line.push({ t: ', ', c: 'tok-punct' });
      });
      line.push({ t: `]${comma}`, c: 'tok-punct' });
    } else {
      line.push(literal(value), { t: comma, c: 'tok-punct' });
    }
    out.push(line);
  });
  out.push([{ t: '}', c: 'tok-punct' }]);
  return out;
};

const lines = buildLines(profile);
const trace = ref(null);
const state = ref('idle');
const visibleLines = ref(0);
const latency = ref(0);
let timers = [];

const clearTimers = () => {
  timers.forEach(clearTimeout);
  timers = [];
};

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The response only renders once the packet in the trace below has made the round trip.
const send = async () => {
  if (state.value === 'loading') return;
  clearTimers();
  latency.value = 28 + Math.floor(Math.random() * 60);

  if (prefersReducedMotion()) {
    state.value = 'done';
    visibleLines.value = lines.length;
    return;
  }

  state.value = 'loading';
  visibleLines.value = 0;
  await trace.value?.run();
  state.value = 'done';
  lines.forEach((_, i) => {
    timers.push(setTimeout(() => { visibleLines.value = i + 1; }, i * 60));
  });
};

// Wait for the entrance sequence to settle before firing the first request.
onMounted(() => {
  timers.push(setTimeout(send, prefersReducedMotion() ? 0 : 1100));
});
onBeforeUnmount(clearTimers);
</script>

<style scoped>
.hero {
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding: 7.5rem 0 5rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: clamp(2.5rem, 5vw, 4.5rem);
  align-items: center;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--ink-2);
  margin-bottom: 1.75rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--get);
  box-shadow: 0 0 0 4px rgba(11, 122, 84, 0.15);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 5.4vw, 4.75rem);
  font-weight: 750;
  line-height: 0.98;
  letter-spacing: -0.045em;
  margin-bottom: 1.75rem;
  max-width: 14ch;
}

.hero-title em {
  font-style: normal;
  white-space: nowrap;
  color: var(--accent);
}

.hero-lede {
  font-size: 1.15rem;
  color: var(--ink-2);
  max-width: 34rem;
  margin-bottom: 2.25rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.hero-social {
  display: flex;
  gap: 1.5rem;
  list-style: none;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.hero-social a {
  color: var(--ink-2);
  border-bottom: 1px solid var(--rule);
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease;
}

.hero-social a:hover {
  color: var(--accent);
  border-color: var(--accent);
}

/* Entrance sequence */
:global([data-motion]) .hero-fade {
  opacity: 0;
  animation: hero-in 0.8s var(--ease-out) forwards;
  animation-delay: var(--delay, 0ms);
}

@keyframes hero-in {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: none; }
}

/* API client */
.hero-side {
  min-width: 0;
}

.trace-caption {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.64rem;
  color: var(--muted);
}

.caption-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--get);
}

.caption-dot.busy {
  background: var(--accent);
  animation: blink 0.6s steps(2) infinite;
}

.client {
  position: relative;
  z-index: 1;
  background: var(--code-bg);
  color: var(--code-text);
  border-radius: 14px;
  overflow: hidden;
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.04) inset,
    0 30px 60px -30px rgba(18, 21, 28, 0.55);
  font-family: var(--font-mono);
}

.client-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.7rem 0.7rem 1rem;
  border-bottom: 1px solid var(--code-line);
}

.client-method {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--code-string);
}

.client-url {
  flex: 1;
  min-width: 0;
  font-family: inherit;
  font-size: 0.72rem;
  color: var(--code-dim);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.client-url b {
  font-weight: 400;
  color: var(--code-text);
}

.client-send {
  flex-shrink: 0;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  padding: 0.5rem 0.9rem;
  border: none;
  border-radius: 7px;
  background: var(--accent);
  color: #fff;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.client-send:disabled {
  opacity: 0.6;
  cursor: progress;
}

.client-status {
  display: flex;
  font-variant-numeric: tabular-nums;
  gap: 1.25rem;
  padding: 0.6rem 1rem;
  font-size: 0.68rem;
  color: var(--code-dim);
  border-bottom: 1px solid var(--code-line);
}

.status-ok {
  color: var(--code-string);
}

.status-wait {
  animation: blink 1s steps(2) infinite;
}

@keyframes blink {
  50% { opacity: 0.35; }
}

.client-body {
  margin: 0;
  padding: 1.1rem 0 1.4rem;
  font-family: inherit;
  font-size: 0.76rem;
  line-height: 1.9;
}

.code-line {
  display: block;
  /* Hanging indent: wrapped lines align after the line number */
  white-space: pre-wrap;
  padding: 0 1.25rem 0 2.75rem;
  text-indent: -2.75rem;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.code-line.shown {
  opacity: 1;
  transform: none;
}

.ln {
  display: inline-block;
  width: 2.75rem;
  padding-right: 1rem;
  text-align: right;
  color: #454c5a;
  user-select: none;
}

.tok-key { color: var(--code-key); }
.tok-str { color: var(--code-string); }
.tok-lit { color: var(--code-literal); }
.tok-punct { color: var(--code-dim); }

@media (max-width: 960px) {
  .hero-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    min-height: auto;
    padding-top: 7rem;
  }
}

@media (max-width: 480px) {
  .client-body {
    font-size: 0.68rem;
  }

  .ln {
    width: 2rem;
    padding-right: 0.6rem;
  }

  .code-line {
    padding-left: 2rem;
    text-indent: -2rem;
  }
}
</style>
