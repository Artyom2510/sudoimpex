$(window).on('wheel', function (e) {
	var headerGroup = $('.header__logo, .header__contacts, .header__lang');
	var translateGroup = $('.main__bg, .main__sliders, .main__line');
	var dotsAndArrow = $('.slider__dots-footer, .slider__next, .slider__prev');
	//Scroll
	// var delta = e.originalEvent.wheelDelta || e.originalEvent.deltaY || e.originalEvent.detail;
	if( e.originalEvent.wheelDelta > 0 || e.originalEvent.deltaY < 0 ) {
		$('.js-tgl-popup').addClass('close');
		$('.slider__popup').removeClass('visible display');
	}
	if( $(window).scrollTop() === 0 ) {
		if( e.originalEvent.wheelDelta < 0 || e.originalEvent.deltaY > 0 ) {
			if( !headerGroup.hasClass('translate') ) {
				translateGroup.addClass('translate');
				dotsAndArrow.addClass('fixed');
				$('body').addClass('no-overflow');
				setTimeout(function(){
					headerGroup.addClass('gray');
				}, 1);
			}
		} else {
			translateGroup.removeClass('translate');
			$('body').removeClass('no-overflow');
			dotsAndArrow.removeClass('fixed');
			setTimeout(function(){
				headerGroup.removeClass('gray');
			}, 300);
		}
	}
});
//Высота линий
function updateLineheight() {
	if( $(window).width() < 1280 ) {
		var heightSlidersSection = $('.sliders').outerHeight(true) - 140;
		$('.main__line').height(heightSlidersSection);
	}
}
//Click
$(document).ready(function() {
	var headerGroup = $('.header__logo, .header__contacts, .header__lang');
	var translateGroup = $('.main__bg, .main__sliders, .main__line');
	var dotsAndArrow = $('.slider__dots-footer, .slider__next, .slider__prev');
	$('.main-bg-footer__btn-go').on('click', function() {
		$('body').addClass('no-overflow');
		translateGroup.addClass('translate');
		setTimeout(function(){
			updateLineheight();
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
