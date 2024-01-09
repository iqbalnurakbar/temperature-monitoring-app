const NotificationService = {
    showNotification: (body, timestamp) => {
      if (Notification.permission === "granted") {
        const notificationBody = `${body}\n${timestamp}`
        const options = {
          body: notificationBody,
          icon: "/icons/pwa-192x192.png",
        };
  
        // Display push notification
        navigator.serviceWorker.ready.then((registration) => {
          registration.showNotification("Monitoring Suhu", options);
        });
      } else if (Notification.permission !== "denied") {
        // If not granted, request notification permission
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            NotificationService.showNotification(body, timestamp);
          }
        });
      }
    },
  };
  
  export default NotificationService;
    