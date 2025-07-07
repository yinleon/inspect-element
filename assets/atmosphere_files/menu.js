(function ($, Drupal) {
  Drupal.behaviors.landingPageMenu = {
    attach: function (context, settings) {
      if ($('.menu--landing-page-menus .expander').length > 0) {
        $(once('landingPageMenu', '.menu--landing-page-menus')).superclick({speed: 'fast', delay: 400});
      }
    }
  }

  Drupal.behaviors.rightSidebarMenu = {
    attach: function (context, settings) {
      $(once('rightSidebarMenu', '.menu--right-sidebar .has-subnav-indicator', context)).click(function(){
        $(this).toggleClass('open').parent().toggleClass('open');
      });

      var attrs = { };
      if ($(".menu--right-sidebar a.is-active").length > 0) {
        $.each($(".menu--right-sidebar a.is-active")[0].attributes, function (idx, attr) {
          attrs[attr.nodeName] = attr.nodeValue;
        });
        $(".menu--right-sidebar a.is-active").replaceWith(function () {
          return $("<div />", attrs).append($(this).contents());
        });
      }
      $(once('rightSidebarMenu', ".menu--right-sidebar div.is-active", context)).siblings('.has-subnav-indicator').removeClass('open').parent().removeClass('open');
    }
  }

  Drupal.behaviors.mainMenuBurger = {
    attach: function (context, settings) {
      $(once('mainMenuBurger', '.l-navigation .menu--main .menu__item', context)).first().append( "<div class=\"mobile-menu-button open\">&nbsp;</div>\n" +
        "<div class=\"mobile-menu-button close\">&nbsp;</div>" );
    }
  }

  Drupal.behaviors.slideMenu = {
    attach: function (context, settings) {

      var tabletBreakpoint = 900;
      //var tablet = false;
      var mobileBreakpoint = 480;
      //var mobile = false;
      var menuTabWidthMobile = 0;
      var menuTabWidthDesktop = 65;
      var menuTabWidth = menuTabWidthDesktop;
      var menuWidthMobile = 232;
      var menuWidthDesktop = 260;
      var menuWidth = menuWidthDesktop;
      var mainMenu = $('.l-navigation', context);

      //if the menu doesn't exist on the page do nothing
      if (!mainMenu.length) {
        return;
      }

      $(window).on('load resize',function(){
        resetMenu();
      });

      function resetMenu() {
        menuWidth = menuWidthDesktop;
        menuTabWidth = menuTabWidthDesktop;
        if (window.innerWidth <= mobileBreakpoint) {
          menuWidth = menuWidthMobile;
        }
        if (window.innerWidth <= tabletBreakpoint) {
          menuTabWidth = menuTabWidthMobile;
          mainMenu.removeClass("open");
          $('.site-header .mobile-menu-button.open').removeClass("hidden");
          $('.site-header .mobile-menu-button.close').addClass("hidden");
          $('#not-navigation').css('padding-left', menuTabWidth);
        }
        mainMenu.css('width', menuTabWidth);
        mainMenu.removeClass('open');
      }

      $(once('slide-menu-mobile', '.l-navigation, .site-header .mobile-menu-button.open', context)).click(function(e){
        if (!mainMenu.hasClass('open')) {
          //ignore links, just open the menu
          e.preventDefault();
          slideOpen();
          $('.site-header .mobile-menu-button').toggleClass("hidden");
          //provide a trigger for others to act on
          $(mainMenu).trigger('mainMenu-opened');
        }
      });
      $(once('slide-menu-mobile', '.mobile-menu-button.close', context)).click(function(e){
        if (mainMenu.hasClass('open')) {
          slideClosed();
          $('.site-header .mobile-menu-button').toggleClass("hidden");
          //provide a trigger for others to act on
          $(mainMenu).trigger('mainMenu-closed');
        }
      });

      function slideOpen() {
        // The part of D7 menu without icons.  Not relevant in new D8 theme?
        //$('.region-menu-region #block-menu_block-2').show()//showing to allow tabbing to while menu is open
        mainMenu.animate({"width": menuWidth });
        $('#not-navigation').animate({"padding-left": '+=' + (menuWidth - menuTabWidth)}, function(){
          jQuery(document).trigger('menuMoved');
          mainMenu.addClass('open');
        });
      }
      function slideClosed() {
        mainMenu.animate({"width": menuTabWidth});
        $('#not-navigation').animate({"padding-left": 0}, function(){
          jQuery(document).trigger('menuMoved');
          mainMenu.removeClass('open');
          // The part of D7 menu without icons.  Not relevant in new D8 theme?
          //$('.region-menu-region #block-menu_block-2').hide()//hiding to prevent tabbing to while menu is closed
        });
      }
    }
  }
})(jQuery, Drupal);
