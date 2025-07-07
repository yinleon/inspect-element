(function ($, Drupal, cookies) {
  Drupal.behaviors.elp = {
    attach: function(context, settings) {

      $(once('ELP-Toggle', '.show-more a', context)).click(function(){
        $(this).parents('.body-toggle').toggleClass('less more');
        event.preventDefault();
      });

      $('#full_record').click(function() {
        cookies.set("full_abstract", $(this).prop('checked'));
        $('.body-toggle').toggleClass('less more');
      });

      var active = $.find('.facet-active');
      var checked = $("input[checked='checked']");
      var block = $('.elp').find('a.facets-reset-link');

      if(checked.length != 0 || active.length != 0){
        block.show();
      }
      else{
        block.hide();
      }
    },
    detach: function(context, settings, trigger) {
    //   $('.block--provider-facets .block__title').unbind();
    }
  };
})(jQuery, Drupal, window.Cookies);

