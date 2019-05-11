$(window).on('wheel', function (e) {
	if( $(window).width() > 767 ) {
		//Scroll
		var headerGroup = $('.header__contacts, .header__lang, .header__logo');
		var translateGroup = $('body, .header, .main__line');
		// var delta = e.originalEvent.wheelDelta || e.originalEvent.deltaY || e.originalEvent.detail;
		if( e.originalEvent.wheelDelta < 0 || e.originalEvent.deltaY > 0 ) {
			if( !headerGroup.hasClass('translate') ) {
				translateGroup.addClass('translate');
				setTimeout(function(){
					headerGroup.addClass('gray');
				}, 200);
			}
		} else {
			translateGroup.removeClass('translate');
			setTimeout(function(){
				headerGroup.removeClass('gray');
			}, 200);
		}
	}
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
