// firebase-messaging-sw.js
// Service Worker para Firebase Cloud Messaging em background

importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

// Configuração do Firebase (mesma do seu HTML)
firebase.initializeApp({
  apiKey: "AIzaSyBhxtjdc14dv39mr_x_WuXouZrpMyGXpuk",
  authDomain: "novahub-8f4b0.firebaseapp.com",
  projectId: "novahub-8f4b0",
  storageBucket: "novahub-8f4b0.appspot.com",
  messagingSenderId: "619675546300",
  appId: "1:619675546300:web:7be9b40b4a5282772616b9",
  measurementId: "G-G36L184ZND"
});

// Obtém instância de Messaging
const messaging = firebase.messaging();

// Trata mensagens em background
messaging.onBackgroundMessage(payload => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

