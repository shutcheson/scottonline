/*======== Window Load Function ========*/
$(window).on("load", function () {
  /*======== Preloader ========*/
  $(".loader").fadeOut();
  $(".preloader").delay(1000).fadeOut();

  /*======== Isotope Portfolio Setup ========*/
  if ($(".portfolio-items").length) {
    var $elements = $(".portfolio-items"),
      $filters = $(".portfolio-filter ul li");
    $elements.isotope();

    $filters.on("click", function () {
      $filters.removeClass("active");
      $(this).addClass("active");
      var selector = $(this).data("filter");
      $(".portfolio-items").isotope({
        filter: selector,
        hiddenStyle: {
          transform: "scale(.2) skew(30deg)",
          opacity: 0,
        },
        visibleStyle: {
          transform: "scale(1) skew(0deg)",
          opacity: 1,
        },
        transitionDuration: ".5s",
      });
    });
  }
});

/*======== Document Ready Function ========*/
$(document).ready(function () {
  "use strict";

  /*======== SimpleBar Setup ========*/
  $(".pt-page").each(function () {
    var $id = "#" + $(this).attr("id");
    new SimpleBar($($id)[0]);
  });

  $(document).on("mouseup", function (e) {
    var headerContainer = $(".header-main");

    if (
      !headerContainer.is(e.target) &&
      headerContainer.has(e.target).length === 0 &&
      $(e.target).closest(".header-toggle").length === 0
    ) {
      $(".header-content").removeClass("on");
    }
  });

  /*======== Fitty Setup ========*/
  fitty(".header-name", {
    multiLine: false,
    maxSize: 20,
    minSize: 10,
  });

  /*======== Active Current Link ========*/
  $(".nav-menu a").on("click", function () {
    if ($(".header-content.on").length) {
      $(".header-content").removeClass("on");
    }
  });

  /*======== Mobile Toggle Click Setup ========*/
  $(".header-toggle").on("click", function () {
    $(".header-content").toggleClass("on");
  });

  /*======== Skills Progress Animation ========*/
  if ($(".skills").length > 0) {
    var el = new SimpleBar(
      $("#resume .simplebar-content-wrapper")[0]
    ).getScrollElement();

    //When scrolled to Progress
    $(el).on("scroll", function () {
      animateProgress();
    });

    //When Resume Section have page-active on page load
    if ($("#resume").hasClass("page-active")) {
      animateProgress();
    }

    //When Resume Link is clicked
    $('a[href="#resume"]').on("click", function () {
      animateProgress();
    });

    function animateProgress() {
      $(".progress .progress-bar").each(function () {
        var bottom_object = $(this).offset().top + $(this).outerHeight();
        var bottom_window = $(window).scrollTop() + $(window).height();
        var progressWidth = $(this).data("progress-value") + "%";
        if (bottom_window > bottom_object) {
          $(this).css({
            width: progressWidth,
          });
          $(this)
            .find(".progress-value")
            .animate(
              {
                countNum: parseInt(progressWidth, 10),
              },
              {
                duration: 2000,
                easing: "swing",
                step: function () {
                  $(this).text(Math.floor(this.countNum) + "%");
                },
                complete: function () {
                  $(this).text(this.countNum + "%");
                },
              }
            );
        }
      });
    }
  }

  /*======== Portfolio Ajax Link Setup ========*/
  ajaxPortfolioSetup(
    $(".portfolio-items .ajax-link"),
    $(".ajax-portfolio-popup")
  );

  /*======== Portfolio Tilt Setup ========*/
  $("#portfolio .item figure").tilt({
    maxTilt: 3,
    glare: true,
    maxGlare: 0.6,
    reverse: true,
  });
});

/*********** Function Ajax Portfolio Setup **********/
function ajaxPortfolioSetup($ajaxLink, $ajaxContainer) {
  $ajaxLink.on("click", function (e) {
    var link = $(this).attr("href");

    if (link === "#") {
      e.preventDefault();
      return;
    }

    $ajaxContainer.find(".content-wrap .popup-content").empty();

    $ajaxContainer.addClass("on");
    $.ajax({
      url: link,
      beforeSend: function () {
        $ajaxContainer.find(".ajax-loader").show();
      },
      success: function (result) {
        $ajaxContainer.find(".content-wrap .popup-content").html(result);
      },
      complete: function () {
        $ajaxContainer.find(".ajax-loader").hide();
      },
      error: function (e) {
        $ajaxContainer.find(".ajax-loader").hide();
        $ajaxContainer
          .find(".content-wrap .popup-content")
          .html(
            '<h1 class="text-center">Something went wrong! Retry or refresh the page.</h1>'
          );
      },
    });
    e.preventDefault();
  });

  $ajaxContainer.find(".popup-close").on("click", function () {
    $ajaxContainer.removeClass("on");
  });
}

/*********** Hide # of url **********/

document.querySelectorAll(".pt-link").forEach((link) => {
  link.addEventListener("click", () => {
    const targetId = link.getAttribute("data-target");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});
