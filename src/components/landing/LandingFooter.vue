<template>
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
.landing-footer {
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
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>