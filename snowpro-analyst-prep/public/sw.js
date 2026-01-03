const CACHE_NAME = 'snowpro-prep-v1';

// URLs essenciais para funcionar offline
const STATIC_ASSETS = [
  '/',
  '/flashcards',
  '/quiz',
  '/progress',
  '/exam-simulator',
  '/domains',
  '/manifest.json',
  '/favicon.svg'
];

// Install - cache arquivos essenciais
self.addEventListener('install', (event) => {
  console.log('[SW] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching app shell and static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      console.log('[SW] Install complete');
    })
  );
  // Ativa imediatamente sem esperar
  self.skipWaiting();
});

// Activate - limpa caches antigos
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Assume controle imediatamente
  self.clients.claim();
});

// Fetch - Cache First, then Network strategy
self.addEventListener('fetch', (event) => {
  // Ignora requests não-GET e externos
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Ignora requests para outros domínios
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se está no cache, retorna do cache
      if (cachedResponse) {
        // Atualiza o cache em background (stale-while-revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {});
        
        return cachedResponse;
      }

      // Se não está no cache, busca da rede
      return fetch(event.request).then((networkResponse) => {
        // Cache responses válidas
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Se offline e é navegação, retorna a página principal
        if (event.request.mode === 'navigate') {
          return caches.match('/');
        }
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});

// Mensagem para forçar atualização do cache
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data === 'CACHE_ALL') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }).then(() => {
        // Notifica todos os clients
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({ type: 'CACHE_COMPLETE' });
          });
        });
      })
    );
  }
});

