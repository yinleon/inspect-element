(function($, Drupal) {
  Drupal.behaviors.cardCarousel = {
    attach(context, settings) {
      $(once('cardCarousel', '.paragraph--type-content-card-rotator .owl-carousel', context)).owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
        },
      });

      $(once('cardCarousel', '.paragraph--type-image-card-rotator .owl-carousel', context)).owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
        },
        onInitialized: imageCardCarouselRepositionNavDelay,
        onChanged: imageCardCarouselRepositionNav,
        onResized: imageCardCarouselRepositionNav,
      });

      function imageCardCarouselRepositionNavDelay(event) {
        setTimeout(function() {
          imageCardCarouselRepositionNav(event);
        }, 200);
        setTimeout(function() {
          imageCardCarouselRepositionNav(event);
        }, 500);
        setTimeout(function() {
          imageCardCarouselRepositionNav(event);
        }, 1000);
      }

      function imageCardCarouselRepositionNav(event) {
        let image_height = 0;
        $('img', event.target).each(function(index) {
          const offsetHeight = this.offsetHeight;
          if (offsetHeight > image_height) {
            image_height = offsetHeight;
          }
        });
        bottom = event.target.offsetHeight - image_height;
        $('.owl-nav, .owl-dots', event.target).css('bottom', bottom);
      }
    },
  };
})(jQuery, Drupal);
