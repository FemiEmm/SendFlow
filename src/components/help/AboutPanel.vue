<script setup>
const emit = defineEmits(['re-onboard'])

const reOnboardUser = () => {
  emit('re-onboard')
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

      <div class="about-section">
        <h3>Contact us</h3>

        <div class="contact-row">
          <div class="contact-group">
            <p class="contact-email">
              cquencecomics@gmail.com
            </p>

            <a
              class="contact-button"
              href="mailto:cquencecomics@gmail.com"
            >
              <font-awesome-icon icon="envelope" />

              <span>Email us</span>
            </a>
          </div>

          <div class="instagram-row">
            <span>@thefemiolaniyi</span>

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
      </div>

      <div class="about-section">
        <h3>Onboarding</h3>

        <p>
          Restart the intro guide if you want to view the app walkthrough again.
        </p>

        <button
          type="button"
          class="re-onboard-button"
          @click="reOnboardUser"
        >
          <font-awesome-icon icon="rotate-left" />

          <span>ReOnboard me</span>
        </button>
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

.contact-row {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.contact-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.contact-email {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--text-color);
}

.contact-button,
.re-onboard-button {
  height: 42px;
  padding: 0 16px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--text-color);
  font-size: 0.84rem;
  font-weight: 800;
  text-decoration: none;
  transition: var(--transition);
}

.contact-button:hover,
.re-onboard-button:hover {
  transform: translateY(-1px);
}

.re-onboard-button {
  margin-top: 12px;
  cursor: pointer;
}

.instagram-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.instagram-row span {
  font-size: 0.84rem;
  font-weight: 700;
  color: var(--text-color);
}

.instagram-button {
  width: 42px;
  height: 42px;
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

@media (max-width: 1024px) {
  .about-panel {
    height: auto;
    max-height: none;
  }
}

@media (max-width: 640px) {
  .contact-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-group {
    width: 100%;
  }

  .contact-button,
  .re-onboard-button {
    width: 100%;
    justify-content: center;
  }
}
</style>