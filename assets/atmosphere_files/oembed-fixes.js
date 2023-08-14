(function($, Drupal) {
  Drupal.behaviors.oembedFigureClasses = {
    attach: function(context, settings) {
      $(once('oembedFigureClasses', '.media-oembed-content', context)).closest('figure').addClass('oembed-figure');
    },
  };
})(jQuery, Drupal);
