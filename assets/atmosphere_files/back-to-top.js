(function ($, Drupal) {
  Drupal.behaviors.backToTop = {
    attach(context, settings) {
      const threshold = 200;
      const smoothScroll = true;
      const backToTop = context.querySelector('.c-back-to-top');
      const footerHeight = ($('.section-footer').outerHeight() ?? 0)
        + ($('.site-footer').outerHeight() ?? 0)
        + ($('.block--id-noaa-core-content-footer').outerHeight() ?? 0);
      if (backToTop) {
        if (!Number.isNaN(threshold) && threshold > 0) {
          backToTop.setAttribute('aria-hidden', 'true');
          backToTop.setAttribute('tabIndex', '-1');
          const scrollHandler = () => {
            if (
              window.scrollY >= threshold &&
              backToTop.getAttribute('aria-hidden') === 'true'
            ) {
              backToTop.setAttribute('aria-hidden', 'false');
              backToTop.removeAttribute('tabIndex');
            } else if (
              window.scrollY < threshold &&
              backToTop.getAttribute('aria-hidden', 'false')
            ) {
              backToTop.setAttribute('aria-hidden', 'true');
              backToTop.setAttribute('tabIndex', '-1');
            }
            if (
              window.scrollY >= threshold &&
              (window.innerHeight + window.scrollY) >= document.body.offsetHeight - footerHeight
            ) {
              var bottomCalc = 20 + ((window.innerHeight + window.scrollY) - (document.body.offsetHeight - footerHeight));
              backToTop.setAttribute('style', 'bottom: ' + bottomCalc + 'px;');
            } else if (
              (window.scrollY < threshold || (window.scrollY >= threshold &&
              (window.innerHeight + window.scrollY) < document.body.offsetHeight - footerHeight)) &&
              backToTop.getAttribute('style')
            ) {
              backToTop.removeAttribute('style');
            }
          };
          let stillScrolling = false;
          window.addEventListener('scroll', () => {
            if (stillScrolling !== false) {
              clearTimeout(stillScrolling);
            }
            stillScrolling = setTimeout(scrollHandler, 10);
          });
        } else {
          backToTop.setAttribute('aria-hidden', 'false');
          backToTop.removeAttribute('tabIndex');
        }
        if (smoothScroll) {
          backToTop.addEventListener('click', event => {
            const targetId = backToTop.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
              event.preventDefault();
              const coords = target.getBoundingClientRect();
              target.setAttribute('tabIndex', '-1');
              window.scrollTo({
                top: coords.top,
                behavior: 'smooth',
              });
              target.focus();
            }
          });
        }
      }
    },
  }
})(jQuery, Drupal);
