(function ($, Drupal) {
  Drupal.behaviors.scrollFixed = {
    attach: function (context, settings) {

      var stickyElementWrapper = $('.sticky-top-js');
      var stickyElement = $('.sticky-top-js .sticky-top-js-container');
      var stickyElementWrapperWidth = stickyElementWrapper.outerWidth();

      //if page has no sticky element, do nothing
      if (stickyElementWrapper.length == 0) {
        return;
      }

      //need to set the height of the wrapper, when its contents become fixed the wrapper would collapse otherwise.
      //when wrapper collapses it can cause the page to be shorter and hit the "sticky point" causing the page to jump down
      //and you can never actually scroll to the top
      stickyElementWrapper.css('height' , stickyElementWrapper.outerHeight());

      $(window).scroll(function(){
        //check for visibility, when blind is open element gets set to sticky and a width of 0 otherwise
        if (stickyElement.is(':visible')) {
          setFixed();
        }
        if (stickyElement.hasClass('fixed') && stickyElement.is(':visible')) {
          setWidth();
          setLeft();
        }
      });
      $(window).resize(function(){

        //when resizing the window the element may go above the page top
        setFixed();

        if (stickyElement.hasClass('fixed')) {
          //on resize keep the fixed element same width as parent
          setWidth();
          //since the left position is set after the menu closes we must update the left pos on resize
          setLeft();
        } else {
          stickyElement.width('');
        }
      });

      //this event haapens in menu.js when the menu closing animation is finished after window load
      $(document).on('menuMoved', function() {
        setLeft();
      });

      function setWidth() {
        var stickyElementWrapperWidth = stickyElementWrapper.outerWidth();
        stickyElement.width(stickyElementWrapperWidth);
      }

      function setLeft() {
        var leftPos = stickyElementWrapper.offset().left + 'px';
        stickyElement.css('left' , leftPos);
      }

      function setFixed() {
        //if element goes above page top set it to fixed.
        //if it goes below unset fixed position
        var windowTop = $(window).scrollTop();
        var elementTop = stickyElementWrapper.offset().top;

        if (windowTop >= elementTop) {
          stickyElement.addClass('fixed');
          //once its fixed the width changes because it no longer has the same parent, so set the width to the parent width;
          stickyElement.width(stickyElementWrapperWidth);
        } else {
          stickyElement.removeClass('fixed');
        }
      }
    }
  }
})(jQuery, Drupal);
