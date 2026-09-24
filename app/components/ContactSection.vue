<template>
  <section id="contact" class="contact">
    <div class="container">
      <div v-reveal class="reveal-words">
      <p class="contact-route" translate="no"><span class="method-post">POST</span> /contact</p>
      <h2 class="contact-title"><SplitWords text="Have a system that needs building? Let’s talk." /></h2>
      </div>
      <p v-reveal="2" class="contact-lede">
        I’m open to full-stack roles and freelance backend work. The fastest way to
        reach me is by email, or you can book a short call below.
      </p>

      <div v-reveal="3" class="contact-email">
        <a :href="`mailto:${email}`" class="email-link" translate="no">{{ email }}</a>
        <button class="copy-btn" @click="copyEmail">
          {{ copied ? 'Copied' : 'Copy email' }}
        </button>
        <span class="visually-hidden" aria-live="polite">{{ copied ? 'Email address copied' : '' }}</span>
      </div>

      <div v-reveal="4" class="contact-actions">
        <button type="button" class="btn btn-invert" @click="openCallDialog">
          Book a call
        </button>
        <div class="contact-links">
          <a href="https://www.linkedin.com/in/adnan-al-rakka-978003338" target="_blank" rel="noopener" class="contact-link">LinkedIn</a>
          <a href="https://github.com/adnan21-r" target="_blank" rel="noopener" class="contact-link">GitHub</a>
        </div>
      </div>
    </div>

    <dialog ref="callDialog" class="call-dialog" aria-labelledby="call-title" @click="onBackdropClick">
      <form class="call-form" @submit.prevent="submitCallRequest">
        <div class="call-head">
          <p class="contact-route" translate="no"><span class="method-post">POST</span> /call-request</p>
          <h3 id="call-title" class="call-title">Book a short call</h3>
          <p class="call-note">
            Pick a time that suits you and I’ll confirm by email with a meeting link.
          </p>
        </div>

        <div class="call-grid">
          <label class="field">
            <span>Name</span>
            <input v-model.trim="call.name" type="text" name="name" autocomplete="name" required>
          </label>
          <label class="field">
            <span>Email</span>
            <input v-model.trim="call.email" type="email" name="email" autocomplete="email" required>
          </label>
          <label class="field">
            <span>Preferred date</span>
            <input v-model="call.date" type="date" name="date" :min="today" required>
          </label>
          <label class="field">
            <span>Preferred time <small>({{ timezone }})</small></span>
            <input v-model="call.time" type="time" name="time" step="900" required>
          </label>
          <label class="field">
            <span>Duration</span>
            <select v-model="call.duration" name="duration">
              <option>15 minutes</option>
              <option>30 minutes</option>
              <option>45 minutes</option>
            </select>
          </label>
          <label class="field field-wide">
            <span>What would you like to discuss?</span>
            <textarea v-model.trim="call.topic" name="topic" rows="3" placeholder="A role, a project, a backend you need built…"></textarea>
          </label>
        </div>

        <p v-if="sent" class="call-sent" role="status">
          Your email app should now open with the request ready to send.
          If it didn’t, <button type="button" class="link-btn" @click="copyRequest">copy the request</button>
          and email it to {{ email }}.
          <span v-if="requestCopied"> Copied.</span>
        </p>

        <div class="call-actions">
          <button type="button" class="copy-btn" @click="closeCallDialog">Cancel</button>
          <button type="submit" class="btn btn-invert">Send request</button>
        </div>
      </form>
    </dialog>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';

const email = 'adnanalrakka_2004@hotmail.com';
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

const callDialog = ref(null);
const sent = ref(false);
const requestCopied = ref(false);
const call = reactive({ name: '', email: '', date: '', time: '', duration: '30 minutes', topic: '' });
const timezone = ref('your time');
const today = ref('');

onMounted(() => {
  timezone.value = Intl.DateTimeFormat().resolvedOptions().timeZone || 'your time';
  const now = new Date();
  today.value = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
});

const openCallDialog = () => {
  sent.value = false;
  requestCopied.value = false;
  callDialog.value?.showModal();
};

const closeCallDialog = () => callDialog.value?.close();

// Close when clicking the backdrop, but not inside the form.
const onBackdropClick = (e) => {
  if (e.target === callDialog.value) closeCallDialog();
};

const requestText = () => [
  'Hi Adnan,',
  '',
  'I’d like to book a short call.',
  '',
  `Name: ${call.name}`,
  `Email: ${call.email}`,
  `Preferred time: ${call.date} at ${call.time} (${timezone.value})`,
  `Duration: ${call.duration}`,
  call.topic ? `Topic: ${call.topic}` : null,
].filter((line) => line !== null).join('\n');

const submitCallRequest = () => {
  const subject = `Call request from ${call.name}`;
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(requestText())}`;
  sent.value = true;
};

const copyRequest = async () => {
  try {
    await navigator.clipboard.writeText(requestText());
    requestCopied.value = true;
  } catch {
    requestCopied.value = false;
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

.call-dialog {
  width: min(40rem, calc(100vw - 2rem));
  max-height: calc(100vh - 2rem);
  margin: auto;
  padding: 0;
  background: var(--code-bg);
  color: var(--code-text);
  border: 1px solid var(--code-line);
  border-radius: var(--radius);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
}

.call-dialog::backdrop {
  background: rgba(8, 10, 14, 0.7);
}

.call-form {
  padding: clamp(1.25rem, 4vw, 2rem);
}

.call-title {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 0.5rem;
}

.call-head .contact-route {
  margin-bottom: 0.75rem;
}

.call-note {
  color: var(--code-dim);
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.call-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--code-text);
}

.field small {
  color: var(--code-dim);
}

.field-wide {
  grid-column: 1 / -1;
}

.field input,
.field select,
.field textarea {
  font: inherit;
  font-size: 0.95rem;
  padding: 0.65rem 0.75rem;
  background: #0c0e13;
  color: #fff;
  border: 1px solid var(--code-line);
  border-radius: 6px;
  color-scheme: dark;
  transition: border-color 0.2s ease;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: var(--code-key);
  outline: none;
}

.field textarea {
  resize: vertical;
}

.call-sent {
  margin-top: 1.25rem;
  font-size: 0.9rem;
  color: var(--code-string);
}

.link-btn {
  font: inherit;
  color: #fff;
  background: none;
  border: 0;
  border-bottom: 1px solid currentColor;
  cursor: pointer;
  padding: 0;
}

.call-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

@media (max-width: 540px) {
  .call-grid {
    grid-template-columns: 1fr;
  }
}

.contact :focus-visible,
.call-dialog :focus-visible {
  outline-color: var(--code-key);
}
</style>
