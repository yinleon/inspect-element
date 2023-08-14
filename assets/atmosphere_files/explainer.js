(function ($, Drupal) {
  Drupal.behaviors.explainerSlides = {
    attach: function (context, settings) {

      var explainer = $('.explainer-bodies .field--name-field-explainer-sections > .field__items, .explainer-titles');
      var pagerTitleWrapper = $('.explainer-tabs .explainer-tab-items');
      //prevent jquery cycle2 plugin from logging to the console
      $.each([explainer, pagerTitleWrapper], function(){
        $(this).attr('data-cycle-log', 'false');
      });

      var options = {
        timeout: 0,
        slides: '> div',
        pager: pagerTitleWrapper,
        pagerTemplate: '',
        prev: '#prev',
        next: '#next',
        caption: '#custom-caption',
        captionTemplate: '<span class="part">Part {{slideNum}}</span> of {{slideCount}}',
        allowWrap: false,
        autoHeight: 'container',
      };
      explainer.cycle(options);

      //set the initial value for the next tile
      var nextPagerTitle = $('.explainer-tabs .explainer-tab-items .explainer-item-tab:eq(1) .tab-title').text();
      $('.node-page--node-type-explainer .pager-prev-next #next .title').text(nextPagerTitle);

      explainer.on( 'cycle-after', function( event, opts ) {
        var prevSlideNum = opts.slideNum - 1;
        var nextSlideNum = opts.slideNum + 1;
        //have to subtract 1 from values as eq uses zero based index
        var prevPagerTitle = $('.explainer-tabs > div > .explainer-item-tab:eq(' + (prevSlideNum -1) + ') .tab-title').text();
        var nextPagerTitle = $('.explainer-tabs > div > .explainer-item-tab:eq(' + (nextSlideNum - 1) + ') .tab-title').text();

        $('.node-page--node-type-explainer .pager-prev-next #prev .part').text('Part ' + prevSlideNum);
        $('.node-page--node-type-explainer .pager-prev-next #prev .title').text(prevPagerTitle);
        $('.node-page--node-type-explainer .pager-prev-next #next .part').text('Part ' + nextSlideNum);
        $('.node-page--node-type-explainer .pager-prev-next #next .title').text(nextPagerTitle);
      });

      $('details').click(function(){
        $(window).resize();
      });

      var tab = parseInt(window.location.hash.replace("#tab", ""));
      if (!isNaN(tab)) {
        tab = tab-1;
        explainer.cycle('goto', tab);
        $('.explainer-tabs > div > .explainer-item-tab:eq('+tab+')').click();
      }
    }
  }

  Drupal.behaviors.explainerMobileTabs = {
    attach: function (context, settings) {

      var pagerItems = $('.explainer-tabs .explainer-tab-items');
      //var firstItem = $('.explainer-pager .field-name-field-explainer-section > .field-items > .field-item').eq(0);
      var pagerTitle = $('.explainer-tabs .mobile-tab-dropdown');
      var explainer = $('.explainer-bodies .field--name-field-explainer-sections > .field__items');

      // On mobile the pager is a dropdown.
      $(once('explainerMobileTabs', $(pagerTitle), context)).click(function(){
        pagerTitle.toggleClass('open').next('.explainer-tab-items').slideToggle();
      });

      if (explainer.length == 0) {
        return;
      }
      // Update the pager title text after it cycles.
      explainer.on( 'cycle-after', function( event, opts ) {
        var activePagerItem = $('.explainer-tabs .explainer-tab-items .cycle-pager-active');
        pagerTitle.html(activePagerItem.html());
        if ($(window).width() <= 900) {
          pagerItems.slideUp();
          pagerTitle.toggleClass('open');
        }
      });

      // Set initial dropdown
      var activePagerItem = $('.explainer-tabs .explainer-tab-items .explainer-item-tab:first');
      pagerTitle.html(activePagerItem.html());
    }
  }
})(jQuery, Drupal);
