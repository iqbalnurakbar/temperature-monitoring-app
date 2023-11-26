import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { clientsClaim } from 'workbox-core'

self.skipWaiting()
clientsClaim()
cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("sync", (event) => {
  if (event.tag === "syncNotification" && event.data) {
    event.waitUntil(showNotificationInBackground(event.data));
  }
});

function showNotificationInBackground(data) {
  const { body, timestamp } = data;
  const notificationBody = `${body}\n${timestamp}`;
  console.log(notificationBody);
  const options = {
    body: notificationBody,
    icon: "/icons/pwa-192x192.png",
  };

  return self.registration.showNotification("Monitoring Suhu", options);
}
