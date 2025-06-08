import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../components/App';

// import '../scss/base.scss';

// Bot detection
const isBot = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  const botPatterns = [
    'bot', 'crawler', 'spider', 'slurp', 'search', 'mediapartners',
    'nagios', 'curl', 'wget', 'monitoring', 'whatsapp', 'facebook',
    'twitter', 'linkedin', 'pinterest', 'instagram', 'googlebot',
    'bingbot', 'yandexbot', 'duckduckbot', 'baiduspider',
    'sogou', 'exabot', 'ia_archiver', 'archive.org_bot'
  ];
  
  return botPatterns.some(pattern => userAgent.includes(pattern));
};

// Check if prerender is available
const isPrerender = () => {
  return document.visibilityState === 'prerender' || 
         document.webkitVisibilityState === 'prerender' ||
         document.msVisibilityState === 'prerender';
};

// Initialize the app
const initializeApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
};

// Handle bot detection and prerender
if (isBot() || isPrerender()) {
  // For bots and prerender, we'll let the server handle the rendering
  console.log('Bot or prerender detected, letting server handle rendering');
} else {
  // For regular users, initialize the React app
  initializeApp();
}