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
  const script = document.createElement('script')
  script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js'
  script.async = true
  script.type = 'text/javascript'
  
  // Configure the widget
  script.innerHTML = JSON.stringify({
    symbols: [
      {
        proName: 'FOREXCOM:EURUSD',
        title: 'EUR/USD'
      },
      {
        proName: 'FOREXCOM:GBPUSD',
        title: 'GBP/USD'
      },
      {
        proName: 'FOREXCOM:USDJPY',
        title: 'USD/JPY'
      },
      {
        proName: 'BITSTAMP:BTCUSD',
        title: 'BTC/USD'
      },
      {
        proName: 'OANDA:XAUUSD',
        title: 'Gold'
      }
    ],
    colorTheme: 'dark',
    isTransparent: true,
    displayMode: 'adaptive',
    locale: 'fr',
    showSymbolLogo: true,
    width: '100%',
    height: 46
  })

  // Only append if widget container exists and script hasn't been added yet
  const widgetContainer = document.querySelector('.tradingview-widget-container__widget')
  if (widgetContainer && !document.querySelector('script[src*="embed-widget-ticker-tape.js"]')) {
    widgetContainer.appendChild(script)
  }

  // Cleanup on component unmount
  return () => {
    const scriptElement = document.querySelector('script[src*="embed-widget-ticker-tape.js"]')
    if (scriptElement) {
      scriptElement.remove()
    }
  }
})
</script>

<style scoped>
.tradingview-widget-container {
  width: 100%;
  height: 46px;
  overflow: hidden;
}
</style>