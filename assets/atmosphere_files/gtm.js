const dl = drupalSettings.gtm.settings.data_layer || 'dataLayer'
window[dl] = window[dl] || [];

(function (drupalSettings) {
    const config = drupalSettings.gtm;

    window[dl].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
    const gtmSettings = config.settings;
    if (gtmSettings.include_classes === true) {
      window[dl].push({
        'gtm.allowlist': gtmSettings.allowlist_classes ?? [],
        'gtm.blocklist': gtmSettings.blocklist_classes ?? [],
      });
    }
    config.tagIds.forEach(function(tagId) {
        const script = document.createElement('script')
        script.async = true;
        const dLink = dl!='dataLayer'?'&l='+dl:'';
        script.src = 'https://www.googletagmanager.com/gtm.js?id=' + tagId + dLink;
        script.type = 'text/javascript'
        document.getElementsByTagName('head')[0].appendChild(script);
    });
})(drupalSettings);
