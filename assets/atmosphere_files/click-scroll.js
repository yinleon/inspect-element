(function ($, Drupal) {
  Drupal.behaviors.clickScroll = {
    attach: function (context, settings) {
      // Currently used on the share button on focus area landing pages and
      // the explainer content type next and previous buttons
      $(once('clickScroll', '.clickScroll', context)).click(function(){
        //sometimes browser will not blur (un-focus) clicked item, so force it to blur item
        $(this).trigger('blur');
        var offset = $('.scrollTarget').offset().top;
        $('html, body').animate({scrollTop: offset }, 'slow');
      });
    }
  }
})(jQuery, Drupal);
