if('serviceWorker' in navigator) navigator.serviceWorker.register('/temperature-monitoring-app/dev-sw.js?dev-sw', { scope: '/temperature-monitoring-app/', type: 'classic' })