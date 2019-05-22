$(window).on('wheel', function (e) {
	var headerGroup = $('.header__logo, .header__contacts, .header__lang');
	var translateGroup = $('.main__bg, .main__sliders, .main__line');
	//Scroll
	// var delta = e.originalEvent.wheelDelta || e.originalEvent.deltaY || e.originalEvent.detail;
	if( $(window).width() > 1023 ) {
		if( e.originalEvent.wheelDelta > 0 || e.originalEvent.deltaY < 0 ) {
			$('.js-tgl-popup').addClass('close');
			$('.slider__popup').removeClass('visible display');
		}
		if( e.originalEvent.wheelDelta < 0 || e.originalEvent.deltaY > 0 ) {
			if( !headerGroup.hasClass('translate') ) {
				translateGroup.addClass('translate');
				$('body').addClass('no-overflow');
				setTimeout(function(){
					headerGroup.addClass('gray');
				}, 1);
			}
		} else {
			translateGroup.removeClass('translate');
			$('body').removeClass('no-overflow');
			setTimeout(function(){
				headerGroup.removeClass('gray');
			}, 300);
		}
	}
});
$(document).ready(function() {
	//Click + высота линий по высоте секции
	var headerGroup = $('.header__logo, .header__contacts, .header__lang');
	var translateGroup = $('.main__bg, .main__sliders, .main__line');
	var dotsAndArrow = $('.slider__dots-footer, .slider__next, .slider__prev');
	$('.main-bg-footer__btn-go').on('click', function() {
		// var heightSlidersSection = $('.sliders').outerHeight(true);
		$('body').addClass('no-overflow');
		// $('.main__line').height(heightSlidersSection);
		translateGroup.addClass('translate');
		setTimeout(function(){
			dotsAndArrow.addClass('fixed');
			headerGroup.addClass('gray');
		}, 200);
	});
	$('.sliders__btn-go').on('click', function() {
		translateGroup.removeClass('translate');
		$('body').removeClass('no-overflow');
		headerGroup.removeClass('gray');
		dotsAndArrow.removeClass('fixed');
	});
});
