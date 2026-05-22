<script setup>
import {
  ref,
  onMounted
} from 'vue'

import { supabase } from '../../services/supabase'

const deliveryCount = ref(0)

const fetchDeliveryCount = async () => {
  const { data, error } = await supabase
    .from('delivery_stats')
    .select('total_deliveries')
    .eq('id', 1)
    .single()

  if (error) return

  deliveryCount.value = data.total_deliveries
}

const formattedDeliveryCount = () => {
  return Number(deliveryCount.value || 0).toLocaleString()
}

onMounted(() => {
  fetchDeliveryCount()
})
</script>

<template>
  <section class="stats-sections">
    <p class="stats-intro">
      Every month, Sendnest helps people move files between devices quickly and securely. From unfinished projects to urgent transfers, we help creators, students, freelancers, and teams keep work flowing without friction.
    </p>

    <div class="stats-grid">
      <div class="stat-block">
        <span>Successful files delivered</span>

        <strong>{{ formattedDeliveryCount() }}</strong>
      </div>

      <div class="stat-divider"></div>

      <div class="stat-block">
        <span>Available in all countries</span>

        <strong>Global</strong>

        <p>Accessible anywhere with an internet connection.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-sections {
  padding: clamp(44px, 7vw, 90px) clamp(22px, 6vw, 90px);
}

.stats-intro {
  max-width: 860px;
  margin: 0 auto;
  text-align: center;
  color: var(--text-light);
  font-size: clamp(1.05rem, 2vw, 1.45rem);
  line-height: 1.65;
}

.stats-grid {
  max-width: 1040px;
  margin: 54px auto 0;
  padding: 32px;
  background: var(--card-color);
  border: 1.5px solid var(--border-color);
  border-radius: 34px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 34px;
  align-items: center;
  box-shadow: var(--shadow-sm);
}

.stat-block {
  text-align: center;
}

.stat-block span {
  color: var(--text-light);
  font-weight: 800;
  font-size: 0.9rem;
}

.stat-block strong {
  display: block;
  margin-top: 12px;
  color: var(--primary-dark);
  font-size: clamp(2.4rem, 7vw, 5rem);
  line-height: 1;
  font-weight: 900;
}

.stat-block p {
  margin-top: 10px;
  color: var(--text-light);
  font-size: 0.9rem;
}

.stat-divider {
  width: 1.5px;
  height: 120px;
  background: var(--border-color);
}

@media (max-width: 760px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .stat-divider {
    width: 100%;
    height: 1.5px;
  }
}
</style>