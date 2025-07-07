(function ($, Drupal) {
  Drupal.behaviors.usaBanner = {
    attach: function (context, settings) {
      $(once('usaBanner', '.usa-accordion-button', context)).on('click', function () {
        if($(this).attr('aria-expanded') == 'true') {
          $(this).attr('aria-expanded', 'false');
        }
        else {
          $(this).attr('aria-expanded', 'true');
        }
        if($('.usa-accordion-content').attr('aria-hidden') == 'true') {
          $('.usa-accordion-content').attr('aria-hidden', 'false');
        }
        else {
          $('.usa-accordion-content').attr('aria-hidden', 'true');
        }
      });
    }
  };
})(jQuery, Drupal);
