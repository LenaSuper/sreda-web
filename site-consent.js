(() => {
  const key = 'sreda.analytics.v1';
  const banner = document.querySelector('#cookie-banner');
  const settings = document.querySelector('#cookie-settings');
  const details = banner.querySelector('details');
  const analytics = banner.querySelector('input');
  const counterId = 114335816;
  let choice = null;
  try {
    choice = localStorage.getItem(key);
  } catch {}
  const startAnalytics = () => {
    window.ym = (...args) => (window.ym.a ||= []).push(args);
    window.ym.l = Date.now();
    window.ym(counterId, 'init', {clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false});
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://mc.yandex.ru/metrika/tag.js?id=' + counterId;
    document.head.append(script);
  };
  if (choice === 'yes') startAnalytics();
  banner.hidden = choice === 'yes' || choice === 'no';
  settings.addEventListener('click', () => {
    banner.hidden = false;
    details.open = true;
    analytics.checked = choice === 'yes';
    analytics.focus();
  });
  banner.addEventListener('click', event => {
    const action = event.target.dataset.cookieAction;
    if (!action) return;
    const next = action === 'accept' || (action === 'save' && analytics.checked) ? 'yes' : 'no';
    const previous = choice;
    choice = next;
    let persisted = false;
    try {
      localStorage.setItem(key, next);
      persisted = true;
    } catch {}
    if (previous === 'yes' && next === 'no') {
      // Restart without the counter so its automatic listeners no longer run.
      if (persisted) {
        location.reload();
        return;
      }
      window.ym(counterId, 'destruct');
      location.reload();
      return;
    }
    if (previous !== 'yes' && next === 'yes') startAnalytics();
    banner.hidden = true;
    settings.focus();
  });
})();
