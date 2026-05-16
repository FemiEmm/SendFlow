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
            A simple file transfer tool created for quick device-to-device sharing.
          </p>
        </div>
      </div>

      <div class="about-section">
        <h3>Who created it</h3>

        <p>
          Sendnest was created by Olufemi Olaniyi as a lightweight web app for sending files with short transfer codes.
        </p>
      </div>

      <div class="about-section">
        <h3>How it works</h3>

        <p>
          Upload files, generate a code, then enter that code on another device to download the files.
        </p>
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
  height: min(500px, calc(100svh - 300px));
  min-height: 360px;
  overflow: hidden;
}

.about-content {
  height: 100%;

  display: flex;
  flex-direction: column;

  gap: 16px;
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

@media (max-width: 1024px) {
  .about-panel {
    height: auto;
    max-height: none;
  }
}
</style>