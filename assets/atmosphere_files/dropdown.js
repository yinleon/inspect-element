(function ($, Drupal, settings) {
  Drupal.behaviors.dropdown = {
    attach: function attach(context) {

      if ($('.dropdown-toggle-js').length == 0) {
        return;
      }
      // Currently used on the share button on focus area landing pages.
      // Triggers for mouse click or 'enter' keypress for accessibility
      $(once('dropdown-toggle-js-once', '.dropdown-toggle-js', context)).on('keypress click', function(e){
        if (e.type != 'click' && !(e.type == 'keypress' && e.which == 13)) {
          //was not click or enter
          return;
        }
        $(this).nextAll().slideToggle('easeInOutExpo');
        $(this).toggleClass('toggled');
        $(this).trigger('toggled');
      });
    }
  }
})(jQuery, Drupal, drupalSettings);
