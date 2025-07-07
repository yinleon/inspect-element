(function ($, Drupal) {
  Drupal.behaviors.mobileSearch = {
    attach: function (context, settings) {
      $(once('mobileSearch', '.mobile-search-button', context)).click(function (e) {
        $('#block-headermobilelogo').hide();
        $(this).hide();
        $('#block-noaasearch').css('width', '85%').css('margin-top', 0)
        $('#block-noaasearch form').show();
      });
    }
  }
})(jQuery, Drupal);
