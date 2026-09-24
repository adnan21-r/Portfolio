<template>
  <div ref="root" class="trace" aria-hidden="true">
    <svg viewBox="0 0 480 150" preserveAspectRatio="xMidYMin meet">
      <path
        v-for="(d, key) in paths"
        :key="key"
        :ref="(el) => { if (el) pathEls[key] = el }"
        class="wire"
        :class="{ hot: hotWire === key }"
        :d="d"
      />

      <g
        v-for="node in nodes"
        :key="node.id"
        class="node"
        :class="{ lit: lit === node.id }"
        :transform="`translate(${node.x} ${node.y})`"
      >
        <rect :x="-node.w / 2" y="-15" :width="node.w" height="30" rx="7" />
        <text y="4" text-anchor="middle">{{ node.label }}</text>
      </g>

      <circle
        v-for="(p, i) in ambient"
        :key="i"
        :ref="(el) => { if (el) ambientEls[i] = el }"
        class="pkt"
        r="2.4"
        cx="-10"
        cy="-10"
      />
      <circle ref="reqEl" class="pkt-req" :class="{ on: requesting }" r="4.5" cx="-10" cy="-10" />
    </svg>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';

// A request from the client above travels: client → API → MySQL → API → client.
const paths = {
  trunk: 'M240 0 V39',
  db: 'M240 69 C240 94 80 86 80 108',
  cache: 'M240 69 V108',
  queue: 'M240 69 C240 94 400 86 400 108',
};

const nodes = [
  { id: 'api', label: 'Laravel API', x: 240, y: 54, w: 136 },
  { id: 'db', label: 'MySQL', x: 80, y: 123, w: 100 },
  { id: 'cache', label: 'Redis', x: 240, y: 123, w: 100 },
  { id: 'queue', label: 'Queue', x: 400, y: 123, w: 100 },
];

// Background traffic: small packets moving between the API and its services.
const ambient = [
  { path: 'db', speed: 0.00042, phase: 0 },
  { path: 'cache', speed: 0.00055, phase: 0.4 },
  { path: 'queue', speed: 0.00035, phase: 0.7 },
  { path: 'db', speed: 0.00042, phase: 0.5 },
];

const root = ref(null);
const reqEl = ref(null);
const pathEls = reactive({});
const ambientEls = [];
const lit = ref('');
const hotWire = ref('');
const requesting = ref(false);

let frame = 0;
let visible = false;
let reduced = false;
let observer = null;
let request = null; // { steps, index, start, resolve }

const place = (el, key, t) => {
  const path = pathEls[key];
  if (!path || !el) return;
  const p = path.getPointAtLength(path.getTotalLength() * t);
  el.setAttribute('cx', p.x);
  el.setAttribute('cy', p.y);
};

const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

const tick = (now) => {
  ambient.forEach((a, i) => {
    // Ping-pong along the wire so traffic flows both ways.
    const saw = (now * a.speed + a.phase) % 2;
    place(ambientEls[i], a.path, saw < 1 ? saw : 2 - saw);
  });

  if (request) {
    const step = request.steps[request.index];
    request.start ??= now;
    const t = Math.min((now - request.start) / step.ms, 1);
    hotWire.value = step.path;
    place(reqEl.value, step.path, step.reverse ? 1 - ease(t) : ease(t));
    if (t === 1) {
      if (step.arrive) lit.value = step.arrive;
      request.index += 1;
      request.start = null;
      if (request.index === request.steps.length) {
        const done = request.resolve;
        request = null;
        requesting.value = false;
        hotWire.value = '';
        setTimeout(() => { lit.value = ''; }, 250);
        done();
      }
    }
  }

  frame = visible || request ? requestAnimationFrame(tick) : 0;
};

const start = () => {
  if (!frame && !reduced) frame = requestAnimationFrame(tick);
};

// Plays the request animation; resolves when the response is back at the client.
const run = () => new Promise((resolve) => {
  if (reduced) return resolve();
  requesting.value = true;
  request = {
    steps: [
      { path: 'trunk', ms: 260, arrive: 'api' },
      { path: 'db', ms: 320, arrive: 'db' },
      { path: 'db', ms: 320, reverse: true, arrive: 'api' },
      { path: 'trunk', ms: 260, reverse: true },
    ],
    index: 0,
    start: null,
    resolve,
  };
  start();
});

defineExpose({ run });

onMounted(() => {
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
  });
  observer.observe(root.value);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(frame);
  observer?.disconnect();
});
</script>

<style scoped>
.trace {
  width: 100%;
}

svg {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}

.wire {
  fill: none;
  stroke: var(--rule);
  stroke-width: 1.25;
  stroke-dasharray: 3 4;
  transition: stroke 0.2s ease;
}

.wire.hot {
  stroke: var(--accent);
}

.node rect {
  fill: var(--surface);
  stroke: var(--rule);
  stroke-width: 1;
  transition: stroke 0.2s ease, fill 0.2s ease;
}

.node text {
  font-family: var(--font-mono);
  font-size: 10px;
  fill: var(--ink-2);
  transition: fill 0.2s ease;
}

.node.lit rect {
  stroke: var(--accent);
  fill: #fff;
}

.node.lit text {
  fill: var(--accent);
}

.pkt {
  fill: var(--muted);
  opacity: 0.55;
}

.pkt-req {
  fill: var(--accent);
  opacity: 0;
  filter: drop-shadow(0 0 4px rgba(42, 68, 230, 0.6));
}

.pkt-req.on {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .pkt {
    display: none;
  }
}
</style>
