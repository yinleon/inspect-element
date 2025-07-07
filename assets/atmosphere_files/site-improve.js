(function() {
  if(location.hostname == 'www.noaa.gov') {
    var sz = document.createElement('script');
    sz.type = 'text/javascript';
    sz.async = true;
    sz.src = '//siteimproveanalytics.com/js/siteanalyze_6017903.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(sz, s);
  }
})();
