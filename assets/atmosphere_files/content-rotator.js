(function ($, Drupal, settings) {
  Drupal.behaviors.contentRotator = {
    attach: function attach(context) {

      $(once('contentRotator', '.paragraph--type-content-rotator .content-rotator-content, .paragraph--type-paragraph-rotator .content-rotator-content', context)).each(function(num, elem) {
        elem.dataset.columns = elem.dataset.columns > elem.children.length ? elem.children.length : elem.dataset.columns;
        var options = {
          infinite: true,
          prevArrow: '.paragraph--type-'+elem.dataset.rotator_type+' #'+elem.parentNode.id+' .prev-button',
          nextArrow: '.paragraph--type-'+elem.dataset.rotator_type+' #'+elem.parentNode.id+' .next-button',
          slidesToShow: elem.dataset.columns,
          accessibility: true,
          responsive: [
            {
              breakpoint: 1500,
              settings: {
                slidesToShow: elem.dataset.columns < 4 ? elem.dataset.columns : 4,
              }
            },
            {
              breakpoint: 901,
              settings: {
                slidesToShow: elem.dataset.columns < 3 ? elem.dataset.columns : 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: elem.dataset.columns < 2 ? elem.dataset.columns : 2,
              }
            },
            {
              breakpoint: 400,
              settings: {
                slidesToShow: 1,
              }
            }
          ]
        };

        $(elem).slick(options);
      });

      locateArrows();

      $(window).resize(function(){
        locateArrows();
      });

      $(once('contentRotator', 'details', context)).on('toggle', function() {
        if (this.hasAttribute("open")) {
          $('.paragraph--type-content-rotator .content-rotator-content, .paragraph--type-paragraph-rotator .content-rotator-content', this).each(function(num, elem) {
            $(elem).slick("refresh");;
          });
          locateArrows();
        }
      });


      function locateArrows() {
        $('.paragraph--type-content-rotator .content-rotator-content, .paragraph--type-paragraph-rotator .content-rotator-content').each(function(num, elem) {
          var slides = $('.slick-slide', elem);
          if (elem.dataset.rotator_type == 'content-rotator' && slides.length > 0 && $('img', slides[0]).height() > 50) {
            /* set proper positioning of controls */
            var top = ($('img', slides[0]).height() / 2) - ($('.prev-button', $(elem).parent()).height() / 2);
            $('.prev-button, .next-button', $(elem).parent()).css({'margin-top': top});
          }
          else if (elem.dataset.rotator_type == 'paragraph-rotator') {
            /* set proper positioning of controls */
            var height_min = $('section', slides[0]).height();
            var height_max = height_min;
            slides.each(function(index, item) {
              var temp_height = $('section', item).height();
              if (temp_height < height_min) {
                height_min = temp_height;
              }
              if (temp_height > height_max) {
                height_max = temp_height;
              }
            });
            var top = ((height_min + height_max) / 4) - ($('.prev-button', $(elem).parent()).height() / 2);
            $('.prev-button, .next-button', $(elem).parent()).css({'margin-top': top});
          }
        });
      }

    }
  }

})(jQuery, Drupal, drupalSettings);

