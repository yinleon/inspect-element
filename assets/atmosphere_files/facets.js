(function ($, Drupal, cookies) {
  Drupal.behaviors.facets = {
    attach: function(context, settings) {
      $(once('Facet-Toggle', '.block--provider-facets .block__title', context)).click(function(){
        $(this).toggleClass('open');
        $(this).attr('aria-expanded', $(this).attr('aria-expanded')=="true"? false : true);
      });
      $('.block--provider-facets .block__title', context).keydown(function(){
        if (event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          $(this).click();
        }
      });

      $(once('Facet-SubToggle', '.facet-widget-levels', context)).click(function(){
        $(this).parents('.facet-item--expanded').toggleClass('open');
        event.preventDefault();
      });

      $(once('Facet-Subtoggle-Key', '.facet-widget-levels', context)).keydown(function(){
        console.log(event.keyCode);
        if (event.keyCode === 13 || event.keyCode === 32) {
          event.preventDefault();
          $(this).click();
        }
      });

      //Work around for https://www.drupal.org/project/twig_tweak/issues/3068078
      $('li.facet-item a.is-active').closest('.block--provider-facets').addClass('facet-active').children('.block__title').addClass('open').attr('aria-expanded', true);

      $(once('Facet-Scroll-Top', [document.documentElement, document.body], context)).animate({
        scrollTop: $(".linkable-reset").offset().top
      }, 500);
    }
  };
})(jQuery, Drupal, window.Cookies);
