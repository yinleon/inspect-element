(function ($, Drupal) {
  Drupal.behaviors.toggleLinkList = {
    attach: function (context, settings) {
      $(once('toggleLinkList1', '.paragraph--type-link-list, .paragraph--type-link-list-advanced', context)).each(function () {
        var wrapper = this;
        $(once('toggleLinkList2', '.links-show-more, .links-show-less', wrapper)).on('click', function () {
          $(wrapper).toggleClass('collapsed');
        });
      });
    }
  };
})(jQuery, Drupal);
