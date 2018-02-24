$(document).ready(function() {

	// gamburger-menu
	$('#nav-icon4').click(function(){
		$('.page-header__col-nav').removeClass('col-6');
		$(this).toggleClass('open');
		if($('.page-header__col-nav').hasClass('d-none')) {
			$('.page-header__col-nav').removeClass('d-none');
			$('.page-header__search-form').addClass('fadeInUp animated');
			$('.main-nav li').addClass('fadeInUp animated');
		} else {
			$('.page-header__col-nav').addClass('d-none');
		}
	});

	// main-nav
	function insertSearch() {
		if($(window).width() <= 768) {
			$('.page-header__search-form').insertAfter('.main-nav');
		} else {
			$('.page-header__search-form').insertAfter('.header-right-side');
		}
	}
	insertSearch();
	$(window).resize(function() {
		insertSearch()
	});

	// hero auto-height
	function heightDetect() {
		$('.hero').css('height', $(window).height());
		$('.parallax-window').css('height', '100%');
	}
	heightDetect();
	$(window).resize(function() {
		heightDetect();
	})

	// smooth scrolling
	$("body").on('click', '[href*="#"]', function(e){
	  var fixed_offset = 100;
	  $('html,body').stop().animate({ scrollTop: $(this.hash).offset().top - fixed_offset }, 1000);
	  e.preventDefault();
	});

	// animation
	$('.hero__center-block').animated('bounceInLeft', 'bounceInRight')
	$('.section-title').animated('rubberBand', 'jello');
	$('.what-we-do__img').animated('zoomIn', 'zoomOut');

	// mixitup
	var mixer = mixitup('.mix-container');

	// sliphover on portfolio
	// $('.img-portfolio').sliphover({
	// 	caption: 'data-caption',
	// 	withLink: true
	// });

	// magnific-popup
	$('.img-portfolio__link').magnificPopup({
		type: 'image',
		removalDelay: 10000,
	  mainClass: 'mfp-fade'
	});

	// owl-carousel
	$(".owl-carousel").owlCarousel({
		items: 1,
		center: true,
		nav: true,
		navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>'], 
		loop: true
	});

	// clients
	$('.our-clients__logo img').hover(function() {
		var a = $(this).attr('src');
			$(this).attr('src', a.slice(0,-5) + a.slice(-4));
	}, function() {
		var a = $(this).attr('src');
		$(this).attr('src', a.slice(0,-4) + 1 + a.slice(-4));
	})

	// form
	$("#footer-form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			alert("Спасибо за заявку! Скоро мы с вами свяжемся.");
			$("#footer-form").trigger("reset");
		});
		return false;
	});

// end	
});



