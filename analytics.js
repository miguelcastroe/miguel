(() => {
  const STORAGE_KEY = 'mc_internal';
  const MEASUREMENT_ID = 'G-29HHTM40HS';
  const params = new URLSearchParams(window.location.search);

  if (params.get('internal') === '1') {
    localStorage.setItem(STORAGE_KEY, 'true');
  } else if (params.get('internal') === '0') {
    localStorage.removeItem(STORAGE_KEY);
  }

  if (localStorage.getItem(STORAGE_KEY) === 'true') {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', MEASUREMENT_ID);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
})();
