(function($) {
  var toggle = document.getElementById("menu-toggle");
  var menu = document.getElementById("menu");
  var close = document.getElementById("menu-close");

  toggle.addEventListener("click", function(e) {
    if (menu.classList.contains("open")) {
      menu.classList.remove("open");
    } else {
      menu.classList.add("open");
    }
  });

  close.addEventListener("click", function(e) {
    menu.classList.remove("open");
  });

  // Close menu after click on smaller screens
  $(window).on("resize", function() {
    if ($(window).width() < 846) {
      $(".main-menu a").on("click", function() {
        menu.classList.remove("open");
      });
    }
  });

  $(".owl-carousel").owlCarousel({
    items: 4,
    lazyLoad: true,
    loop: true,
    dots: true,
    margin: 30,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });

  $(".hover").mouseleave(function() {
    $(this).removeClass("hover");
  });

  $(".isotope-wrapper").each(function() {
    var $isotope = $(".isotope-box", this);
    var $filterCheckboxes = $('input[type="radio"]', this);

    var filter = function() {
      var type = $filterCheckboxes.filter(":checked").data("type") || "*";
      if (type !== "*") {
        type = '[data-type="' + type + '"]';
      }
      $isotope.isotope({ filter: type });
    };

    // 1. Initialize Isotope immediately
    $isotope.isotope({
      itemSelector: ".isotope-item",
      layoutMode: "masonry"
    });

    // 2. FORCE RE-LAYOUT ONCE PAGE IS FULLY LOADED
    // This tells the script: "Wait until all images are 100% visible, then fix the spacing."
    $(window).on('load', function() {
        $isotope.isotope('layout');
    });

    $(this).on("change", filter);
    filter();
  });

  lightbox.option({
    resizeDuration: 200,
    wrapAround: true
  });
})(jQuery);

// Function to check which video is in the center
function playNearestVideo() {
    var windowCenter = window.innerHeight / 2;
    var videos = document.querySelectorAll('video');
    var closestVideo = null;
    var minDistance = Infinity;

    // 1. Find the video closest to the center
    videos.forEach(function(video) {
        var rect = video.getBoundingClientRect();
        // Calculate the center of the video relative to the viewport
        var videoCenter = rect.top + (rect.height / 2);
        // Calculate how far this video is from the center of the screen
        var distance = Math.abs(windowCenter - videoCenter);

        if (distance < minDistance) {
            minDistance = distance;
            closestVideo = video;
        }
    });

    // 2. Play the closest one, pause the rest
    videos.forEach(function(video) {
        if (video === closestVideo) {
             // Check if the video is actually visible on screen before playing
             var rect = video.getBoundingClientRect();
             if (rect.top < window.innerHeight && rect.bottom > 0) {
                 // Play if paused
                 if (video.paused) {
                     video.play().catch(function(error) {
                         // Auto-play was prevented (usually because not muted)
                         console.log("Autoplay prevented:", error);
                     });
                 }
             } else {
                 video.pause();
             }
        } else {
            // Pause all other videos
            if (!video.paused) {
                video.pause();
            }
        }
    });
}

// 3. Run the function on Scroll, Resize, and Load
window.addEventListener('scroll', playNearestVideo);
window.addEventListener('resize', playNearestVideo);
window.addEventListener('load', playNearestVideo);