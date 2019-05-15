$(window).on('wheel', function (e) {
	var headerGroup = $('.header__contacts, .header__lang, .header__logo');
	var translateGroup = $('body, .header, .main__line');
	//Scroll
	// var delta = e.originalEvent.wheelDelta || e.originalEvent.deltaY || e.originalEvent.detail;
	if( $(window).width() > 767 ) {
		if( e.originalEvent.wheelDelta > 0 || e.originalEvent.deltaY < 0 ) {
			$('.js-tgl-popup').addClass('close');
			$('.slider__popup').removeClass('visible display');
		}
		if( e.originalEvent.wheelDelta < 0 || e.originalEvent.deltaY > 0 ) {
			if( !headerGroup.hasClass('translate') ) {
				translateGroup.addClass('translate');
				setTimeout(function(){
					headerGroup.addClass('gray');
				}, 1);
			}
		} else {
			translateGroup.removeClass('translate');
			setTimeout(function(){
				headerGroup.removeClass('gray');
			}, 300);
		}
	}
	// } else {
	// 	// var height = $(window).height() - 40;
	// 	var height = 64;
	// 	console.log(height);
	// 	function updateScroll(scroll) {
	// 		console.log(scroll);
	// 		if( scroll > height ) {
	// 			if( !headerGroup.hasClass('gray') ) {
	// 				headerGroup.addClass('gray');
	// 				$('.header').addClass('translate');
	// 			}
	// 		} else {
	// 			headerGroup.removeClass('gray');
	// 			$('.header').removeClass('translate');
	// 		}
	// 	}
	// 	$(window).on('scroll', function () {
	// 		updateScroll($(this).scrollTop());
	// 	});
});
$(document).ready(function() {
	//Click
	var headerGroup = $('.header__contacts, .header__lang, .header__logo');
	var translateGroup = $('body, .header, .main__line');
	$('.main-bg-footer__btn-go').on('click', function() {
		translateGroup.addClass('translate');
		setTimeout(function(){
			headerGroup.addClass('gray');
		}, 200);
	});
	$('.sliders__btn-go').on('click', function() {
		translateGroup.removeClass('translate');
		setTimeout(function(){
			headerGroup.removeClass('gray');
		}, 200);
	});
});
