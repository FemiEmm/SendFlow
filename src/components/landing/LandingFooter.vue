<script setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const message = ref('')
const submitted = ref(false)

const submitForm = () => {
  submitted.value = true

  firstName.value = ''
  lastName.value = ''
  email.value = ''
  message.value = ''
}
</script>

<template>
  <section class="contact-section">
    <div class="contact-copy">
      <h2>Need help?</h2>

      <p>
        Questions, partnerships, advertising inquiries, support requests, or feedback. We would love to hear from you.
      </p>
    </div>

    <form
      class="contact-form"
      @submit.prevent="submitForm"
    >
      <div class="form-row">
        <label>
          <span>First name</span>

          <input
            v-model="firstName"
            type="text"
            required
          />
        </label>

        <label>
          <span>Last name</span>

          <input
            v-model="lastName"
            type="text"
            required
          />
        </label>
      </div>

      <label>
        <span>Email</span>

        <input
          v-model="email"
          type="email"
          required
        />
      </label>

      <label>
        <span>Message</span>

        <textarea
          v-model="message"
          rows="5"
          required
        ></textarea>
      </label>

      <button type="submit">
        Submit
      </button>

      <p
        v-if="submitted"
        class="form-success"
      >
        Message received.
      </p>
    </form>
  </section>

  <footer class="landing-footer">
    <div class="footer-grid">
      <div class="footer-brand">
        <img
          src="/Logo/SendNest.svg"
          alt="Sendnest logo"
        />

        <p>
          Fast temporary file sharing for modern workflows.
        </p>
      </div>

      <div class="footer-column">
        <h3>Product</h3>

        <a href="#">
          Overview
        </a>

        <a href="#">
          Sendnest
        </a>

        <a href="#">
          Pricing
        </a>
      </div>

      <div class="footer-column">
        <h3>About us</h3>

        <a href="#">
          Company
        </a>

        <a href="#">
          Advertising
        </a>

        <a href="#">
          Newsroom
        </a>
      </div>
    </div>

    <div class="footer-line"></div>

    <div class="footer-bottom">
      <div class="socials">
        <a
          href="https://instagram.com/thefemiolaniyi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <font-awesome-icon :icon="['fab', 'instagram']" />
        </a>

        <a href="#">
          X
        </a>

        <a href="#">
          in
        </a>

        <a href="#">
          ▶
        </a>
      </div>

      <div class="legal">
        <a href="#">
          Terms
        </a>

        <a href="#">
          Privacy
        </a>
      </div>
    </div>

    <p class="copyright">
      © Sendnest 2026. All rights reserved.
    </p>
  </footer>
</template>

<style scoped>
.contact-section {
  padding: clamp(48px, 8vw, 110px) clamp(22px, 6vw, 90px);
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(34px, 6vw, 80px);
  align-items: start;
}

.contact-copy h2 {
  color: var(--text-color);
  font-size: clamp(3rem, 8vw, 6.5rem);
  line-height: 0.92;
  font-weight: 900;
}

.contact-copy p {
  max-width: 520px;
  margin-top: 22px;
  color: var(--text-light);
  font-size: 1.05rem;
  line-height: 1.65;
}

.contact-form {
  padding: 26px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 30px;
  box-shadow: var(--shadow-sm);
  display: grid;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

label {
  display: grid;
  gap: 8px;
}

label span {
  color: var(--text-color);
  font-size: 0.82rem;
  font-weight: 900;
}

input,
textarea {
  width: 100%;
  padding: 14px 16px;
  background: var(--bg-color);
  border: 1.5px solid var(--border-color);
  border-radius: 18px;
  color: var(--text-color);
  font: inherit;
  outline: none;
}

textarea {
  resize: vertical;
}

button {
  height: 52px;
  background: var(--primary-dark);
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  color: var(--card-color);
  font-weight: 900;
  cursor: pointer;
}

.form-success {
  color: var(--primary-dark);
  font-weight: 900;
}

.landing-footer {
  margin-top: 90px;
  padding: clamp(40px, 7vw, 80px) clamp(22px, 6vw, 90px) 34px;
  background: var(--card-color);
  border-top: 1.5px solid var(--border-color);
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: 34px;
}

.footer-brand img {
  width: 52px;
  height: 52px;
  object-fit: contain;
}

.footer-brand p {
  max-width: 320px;
  margin-top: 14px;
  color: var(--text-light);
  line-height: 1.55;
}

.footer-column {
  display: grid;
  align-content: start;
  gap: 10px;
}

.footer-column h3 {
  margin-bottom: 8px;
  color: var(--text-color);
  font-size: 0.95rem;
  font-weight: 900;
}

.footer-column a,
.legal a,
.socials a {
  color: var(--text-light);
  text-decoration: none;
  font-weight: 800;
}

.footer-line {
  height: 1.5px;
  margin: 38px 0 20px;
  background: var(--border-color);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.socials,
.legal {
  display: flex;
  align-items: center;
  gap: 16px;
}

.socials a {
  width: 38px;
  height: 38px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: 50%;
  color: var(--primary-dark);
  display: flex;
  align-items: center;
  justify-content: center;
}

.copyright {
  margin-top: 24px;
  color: var(--text-light);
  font-size: 0.82rem;
  font-weight: 700;
}

@media (max-width: 900px) {
  .contact-section {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>