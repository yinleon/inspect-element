(function ($, Drupal) {
  Drupal.behaviors.quickFacts = {
    attach: function (context, settings) {

      var qf_index = 0;
      $(once('quickFacts1', '.paragraph--type-quick-facts', context)).each(function(index) {
        var qf_id = 'paragraph--type-quick-facts-id-'+qf_index;
        qf_index++;
        $(this).attr('id', qf_id);

        $facts = $('.facts-wrapper', this);
        var count = $('.paragraph--type-quick-fact-item', $facts).length;
        console.log(count);

        if (count === 0) {
          $(this).addClass('no-facts');
        } else if (count === 1) {
          $(this).addClass('single-fact');
        } else {
          $(this).addClass('multiple-facts');
        }

        var options = {
          infinite: true,
          accessibility: false,
          nextArrow: '#' + qf_id + ' .next-fact',
          prevArrow: '',
          slidesToShow: 1,
          fade: true
        }
        if ($(this).length > 0) {
          options.adaptiveHeight = true;
        }
        $facts.slick(options);

        $(once('quickFacts2', '.next-fact', this)).on('keypress', function (e) {
          if (!(e.type == 'keypress' && e.which == 13)) {
            //was not "enter" keypress
            return;
          }
          this.click();
        });
      });

    }
  }
})(jQuery, Drupal);
