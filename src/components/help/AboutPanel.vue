```vue
<script setup>
const emit = defineEmits([
  're-onboard',
  'open-landing'
])

const reOnboardUser = () => {
  emit('re-onboard')
}

const openCompanyPage = () => {
  emit('open-landing')
}
</script>

<template>
  <section class="card about-panel">
    <div class="about-content">
      <div class="panel-header">
        <div class="panel-icon">
          <font-awesome-icon icon="circle-info" />
        </div>

        <div>
          <h2 class="title">About Sendnest</h2>

          <p class="subtitle">
            A simple file transfer tool for quick device-to-device sharing.
          </p>
        </div>
      </div>

      <div class="about-section">
        <h3>How it works</h3>

        <p>
          Upload files, generate a transfer code, then enter that code on another device to download the files.
        </p>
      </div>

      <div class="about-section compact-contact">
        <h3>Contact developer</h3>

        <div class="compact-contact-row">
          <a
            class="contact-button"
            href="mailto:cquencecomics@gmail.com"
          >
            cquencecomics@gmail.com
          </a>

          <a
            class="instagram-button"
            href="https://instagram.com/thefemiolaniyi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
        </div>
      </div>

      <div class="about-section">
        <h3>Onboarding</h3>

        <p>
          Visit Company or reset onboarding.
        </p>

        <div class="button-row">
          <button
            type="button"
            class="company-button"
            @click="openCompanyPage"
          >
            <font-awesome-icon icon="building" />

            <span>Who are we?</span>
          </button>

          <button
            type="button"
            class="reset-button"
            @click="reOnboardUser"
          >
            <font-awesome-icon icon="rotate-left" />

            <span>Reset</span>
          </button>
        </div>
      </div>

      <div class="about-section">
        <h3>Copyright</h3>

        <p>
          © 2026 Sendnest. All rights reserved.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-panel {
  height: max(620px, calc(100svh - 300px));
  min-height: 360px;
  overflow: hidden;
}

.about-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

   scrollbar-width: none;
  -ms-overflow-style: none;
}

.about-content::-webkit-scrollbar {
  display: none;
}

.panel-header {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.panel-icon {
  width: 48px;
  height: 48px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-dark);
  font-size: 1.1rem;
  flex-shrink: 0;
}

.about-section {
  padding: 14px;
  background: var(--primary-light);
  border: 1.5px solid var(--border-color);
  border-radius: var(--radius-md);
}

.about-section h3 {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-color);
}

.about-section p {
  margin-top: 6px;
  font-size: 0.84rem;
  line-height: 1.5;
  color: var(--text-light);
}

.compact-contact {
  padding-bottom: 18px;
}

.compact-contact-row {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.contact-button {
  height: 40px;
  padding: 0 16px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  color: var(--text-color);
  font-size: 0.82rem;
  font-weight: 800;
  text-decoration: none;
  transition: var(--transition);
}

.contact-button:hover {
  transform: translateY(-1px);
}

.instagram-button {
  width: 40px;
  height: 40px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e1306c;
  font-size: 1rem;
  text-decoration: none;
  transition: var(--transition);
}

.instagram-button:hover {
  transform: translateY(-1px);
}

.button-row {
  margin-top: 12px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.company-button,
.reset-button {
  height: 42px;
  padding: 0 18px;
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 0.84rem;
  font-weight: 800;
  cursor: pointer;
  transition: var(--transition);
}

.company-button {
  background: var(--card-color);
  color: var(--text-color);
}

.reset-button {
  background: var(--primary-dark);
  color: var(--card-color);
}

.company-button:hover,
.reset-button:hover {
  transform: translateY(-1px);
}

@media (max-width: 1024px) {
  .about-panel {
    height: auto;
    max-height: none;
  }
}

@media (max-width: 640px) {
  .compact-contact-row {
    flex-direction: column;
    align-items: stretch;
  }

  .contact-button,
  .company-button,
  .reset-button {
    width: 100%;
  }

  .instagram-button{
    justify-content: center;
    align-self: center;
   }


  .button-row {
    flex-direction: column;
  }
}
</style>
```
