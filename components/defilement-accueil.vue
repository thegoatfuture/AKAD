<template>
  <section class="bg-black py-1 px-0">
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (window.TradingView) return

  const script = document.createElement('script')
  script.src =
    'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
  script.async = true
  script.innerHTML = JSON.stringify({
    symbols: [
      { proName: 'FOREXCOM:EURUSD', title: 'EUR/USD' },
      { proName: 'FOREXCOM:GBPUSD', title: 'GBP/USD' },
      { proName: 'FOREXCOM:USDJPY', title: 'USD/JPY' },
      { proName: 'OANDA:XAUUSD', title: 'XAU/USD' },
      { proName: 'BITSTAMP:BTCUSD', title: 'BTC/USD' },
    ],
    showSymbolLogo: true,
    colorTheme: 'dark', // Affiche le texte en blanc
    isTransparent: true, // Fond transparent
    displayMode: 'adaptive',
    locale: 'fr',
  })

  document
    .querySelector('.tradingview-widget-container__widget')
    ?.appendChild(script)
})
</script>
