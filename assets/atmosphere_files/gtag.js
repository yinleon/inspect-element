window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('set', 'developer_id.dMDhkMT', true);

(function (drupalSettings) {
  const config = drupalSettings.gtag;
  if (config.tagId.length !== 0) {
    const script = document.createElement('script')
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + config.tagId
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  const additionalConfigInfo = config.additionalConfigInfo || []
  if (additionalConfigInfo.length === 0) {
    gtag('config', config.tagId);
  } else {
    gtag('config', config.tagId, additionalConfigInfo);
  }

  const otherIds = config.otherIds || []
  otherIds.forEach(id => gtag('config', id))

  const events = config.events || []
  events.forEach(event => gtag('event', event.name, event.data))
})(drupalSettings);
