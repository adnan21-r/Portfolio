<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-content">
          <span class="section-eyebrow">Connect</span>
          <h2 class="section-title">Ready for the Next <span class="gradient-text">Big Idea?</span></h2>
          <p class="contact-text">
            I'm always looking for ambitious projects and innovative teams. 
            Drop a message, let's build something exceptional together.
          </p>

          <div class="contact-methods">
            <div class="method-card glass-card">
              <div class="method-icon">📍</div>
              <div class="method-info">
                <span>Location</span>
                <p>Lebanon / Remote</p>
              </div>
            </div>
            <div class="method-card glass-card">
              <div class="method-icon">⚡</div>
              <div class="method-info">
                <span>Availability</span>
                <p>Open for opportunities</p>
              </div>
            </div>
          </div>

          <div class="social-circles">
            <a href="https://www.linkedin.com/in/adnan-al-rakka-978003338" target="_blank" class="circle-link li">
              <span class="tooltip">LinkedIn</span>
            </a>
            <a href="https://github.com/adnan21-r" target="_blank" class="circle-link gh">
              <span class="tooltip">GitHub</span>
            </a>
            <a href="mailto:adnanalrakka_2004@hotmail.com" class="circle-link em">
              <span class="tooltip">Email</span>
            </a>
          </div>
        </div>

        <div class="contact-form-wrap">
          <form class="contact-form glass-card" @submit.prevent="submitForm">
            <div class="form-row">
              <div class="form-group">
                <label>First Name</label>
                <div class="input-wrap">
                  <input type="text" placeholder="Adnan" required v-model="form.firstName">
                  <div class="input-focus"></div>
                </div>
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <div class="input-wrap">
                  <input type="text" placeholder="Al Rakka" required v-model="form.lastName">
                  <div class="input-focus"></div>
                </div>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Email</label>
                <div class="input-wrap">
                  <input type="email" placeholder="adnanalrakka_2004@hotmail.com" required v-model="form.email">
                  <div class="input-focus"></div>
                </div>
              </div>
              <div class="form-group">
                <label>Phone</label>
                <div class="input-wrap">
                  <input type="tel" placeholder="+961 70 000 000" v-model="form.phone">
                  <div class="input-focus"></div>
                </div>
              </div>
            </div>
            
            <div class="form-group">
              <label>Service Interest</label>
              <div class="select-wrap">
                <select v-model="form.productInterest">
                  <option value="" disabled selected>Select a service</option>
                  <option>Web Application</option>
                  <option>Backend System</option>
                  <option>Mobile App</option>
                  <option>Consulting</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label>Message</label>
              <div class="input-wrap">
                <textarea rows="4" placeholder="Tell me about your vision..." required v-model="form.message"></textarea>
                <div class="input-focus"></div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-shine" :disabled="isSubmitting">
              <span v-if="!isSubmitting">Launch Message</span>
              <span v-else>Ignition...</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  productInterest: '',
  message: ''
})

const isSubmitting = ref(false)
const nuxtApp = useNuxtApp()
let mailService = null

// Initialize mail service safely
onMounted(() => {
  try {
    mailService = nuxtApp.$mail
  } catch (e) {
    console.warn('Mail service not available')
  }
})

// Also try to get it immediately
try {
  mailService = nuxtApp.$mail
} catch (e) {
  // Will be set in onMounted
}

const resetForm = () => {
  form.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    productInterest: '',
    message: ''
  }
}

const submitForm = async () => {
  isSubmitting.value = true

  const fullName = `${form.value.firstName} ${form.value.lastName}`.trim()

  const textBody = `New contact request from Adnan's Portfolio

Name: ${fullName}
Email: ${form.value.email}
Phone: ${form.value.phone || 'Not provided'}
Service Interest: ${form.value.productInterest || 'Not specified'}

Message:
${form.value.message}`

  const htmlBody = `
    <h2>New contact request from Adnan's Portfolio</h2>
    <p><strong>Name:</strong> ${fullName}</p>
    <p><strong>Email:</strong> ${form.value.email}</p>
    <p><strong>Phone:</strong> ${form.value.phone || 'Not provided'}</p>
    <p><strong>Service Interest:</strong> ${form.value.productInterest || 'Not specified'}</p>
    <p><strong>Message:</strong></p>
    <p>${form.value.message.replace(/\n/g, '<br>')}</p>
  `

  try {
    if (!mailService) {
      throw new Error('Email service not available')
    }

    await mailService.send({
      subject: `Portfolio Inquiry: ${fullName || 'New Message'}`,
      text: textBody,
      html: htmlBody
    })

    resetForm()
    alert('Thank you for your message! I\'ll get back to you soon.')
  } catch (error) {
    console.error('Failed to send contact form message', error)
    alert('We\'re sorry, there was a problem sending your message. Please try again later.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 6rem;
  align-items: center;
}

.contact-text {
  font-size: 1.2rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 3rem;
}

.contact-methods {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.method-card {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  align-items: center;
}

.method-icon {
  width: 50px;
  height: 50px;
  background: var(--bg-elevated);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.method-info span {
  font-size: 0.8rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.method-info p {
  font-weight: 700;
  font-size: 1.1rem;
}

/* Social Circles */
.social-circles {
  display: flex;
  gap: 1.5rem;
}

.circle-link {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.4s ease;
  background: var(--bg-card);
}

.circle-link::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  z-index: -1;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.circle-link:hover::before {
  opacity: 1;
}

.circle-link:hover {
  transform: translateY(-5px);
  border-color: transparent;
  box-shadow: 0 0 20px var(--glow-primary);
}

.tooltip {
  position: absolute;
  bottom: -40px;
  background: var(--bg-elevated);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-size: 0.75rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.circle-link:hover .tooltip {
  opacity: 1;
  transform: translateY(0);
}

/* Form */
.contact-form {
  padding: 4rem;
  border-width: 2px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-group label {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.input-wrap {
  position: relative;
}

input, select, textarea {
  width: 100%;
  background: var(--bg-deep);
  border: 1px solid var(--border-subtle);
  border-radius: 0.875rem;
  padding: 1.25rem;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
  transition: all 0.3s ease;
}

textarea {
  resize: vertical;
}

.input-focus {
  position: absolute;
  inset: 0;
  border: 1px solid var(--primary);
  border-radius: 0.875rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  box-shadow: 0 0 15px var(--glow-primary);
}

input:focus + .input-focus,
textarea:focus + .input-focus {
  opacity: 1;
}

input:focus, textarea:focus {
  outline: none;
  border-color: transparent;
}

.btn-shine {
  width: 100%;
  height: 60px;
}

.btn-shine:disabled {
  opacity: 0.7;
  cursor: wait;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
}

@media (max-width: 640px) {
  .contact-form {
    padding: 2rem;
  }
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>
