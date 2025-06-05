<template>
  <section class="bg-black py-1 px-0">
    <div class="tradingview-widget-container">
      <div class="tradingview-widget-container__widget"></div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'

onMounted(() => {
  // Create script element
  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
  script.async = true
  script.type = 'text/javascript'
  
  // Widget configuration
  const config = {
    symbols: [
      { proName: 'FOREXCOM:EURUSD', title: 'EUR/USD' },
      { proName: 'FOREXCOM:GBPUSD', title: 'GBP/USD' },
      { proName: 'FOREXCOM:USDJPY', title: 'USD/JPY' },
      { proName: 'BITSTAMP:BTCUSD', title: 'BTC/USD' },
      { proName: 'OANDA:XAUUSD', title: 'Gold' }
    ],
    showSymbolLogo: true,
    colorTheme: 'dark',
    isTransparent: true,
    displayMode: 'adaptive',
    locale: 'fr',
    height: 46
  }

  script.innerHTML = JSON.stringify(config)

  // Append script to widget container
  const widgetContainer = document.querySelector('.tradingview-widget-container__widget')
  if (widgetContainer) {
    widgetContainer.appendChild(script)
  }
})

onBeforeUnmount(() => {
  // Cleanup widget script on component unmount
  const scriptElement = document.querySelector('script[src*="embed-widget-ticker-tape.js"]')
  if (scriptElement) {
    scriptElement.remove()
  }
})
</script>

<style scoped>
.tradingview-widget-container {
  width: 100%;
  height: 46px;
  overflow: hidden;
  background-color: transparent;
}
</style>