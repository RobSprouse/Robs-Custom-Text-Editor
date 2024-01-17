// COMMENT: Import the required modules from the workbox library
const { offlineFallback, warmStrategyCache } = require("workbox-recipes");
const { CacheFirst } = require("workbox-strategies");
const { registerRoute } = require("workbox-routing");
const { CacheableResponsePlugin } = require("workbox-cacheable-response");
const { ExpirationPlugin } = require("workbox-expiration");
const { precacheAndRoute } = require("workbox-precaching/precacheAndRoute");
const { StaleWhileRevalidate } = require("workbox-strategies");

// COMMENT: Precache the files in the workbox manifest
precacheAndRoute(self.__WB_MANIFEST);

// COMMENT: Create a CacheFirst strategy for pages
// This  will try to fetch the latest data, and if it isn't available, it will use the cached data
const pageCache = new CacheFirst({
     cacheName: "page-cache", // Name of the cache
     plugins: [
          new CacheableResponsePlugin({
               statuses: [0, 200], // Cache responses with these status codes
          }),
          new ExpirationPlugin({
               maxAgeSeconds: 30 * 24 * 60 * 60, // Expire items in the cache after 30 days
          }),
     ],
});

// COMMENT: Warm the cache with the URLs for the home page and the index page
warmStrategyCache({
     urls: ["/index.html", "/"],
     strategy: pageCache,
});

// COMMENT: Register the page cache strategy to be used for navigation requests
registerRoute(({ request }) => request.mode === "navigate", pageCache);

// COMMENT: Create a StaleWhileRevalidate strategy for assets
// This will use the cached data first, and then update the cache in the background
const assetCache = new StaleWhileRevalidate({
     cacheName: "asset-cache", // Name of the cache
     plugins: [
          new CacheableResponsePlugin({
               statuses: [0, 200], // Cache responses with these status codes
          }),
          new ExpirationPlugin({
               maxAgeSeconds: 30 * 24 * 60 * 60, // Expire items in the cache after 30 days
          }),
     ],
});

// COMMENT: Register the asset cache strategy to be used for style, script, and image requests
registerRoute(
     ({ request }) =>
          request.destination === "style" || request.destination === "script" || request.destination === "image",
     assetCache
);
