$(function() {
	var imgSvgArray = {};

	function imgSvg() {
		$('img.img-svg').each(function () {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			if (typeof imgSvgArray[imgURL] !== 'undefined') {
				var $svg = $(imgSvgArray[imgURL]);
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$img.replaceWith($svg);
			} else {
				$.ajax({
					url: imgURL,
					async: false,
					dataType: "xml",
					success: function (data) {
						var $svg = $(data).find('svg');
		
						if (typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
						}
		
						$svg = $svg.removeAttr('xmlns:a');
		
						if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
							$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
						}
		
						imgSvgArray[imgURL] = $svg[0].outerHTML;
		
						if (typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass + ' replaced-svg');
						}

						$img.replaceWith($svg);
					}
				});
			}
		});
	}

	imgSvg();

	$('.main').on("DOMNodeInserted", function (e) {
		imgSvg();
	});
});
$(document).ready(function() {
	//Scroll
	// var height = $(window).height() + 10;
	var headerGroup = $('.header__contacts, .header__lang, .header__logo');
	var translateGroup = $('body, .header, .main__line');
	$('.main-bg-footer__btn-go').on('click', function() {
		translateGroup.addClass('translate');
		// $('').addClass('translate');
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

	//Slider
	var slider = $('.slider');
	var sliderItem = $('.slider__item');
	var sliderPrev = $('.slider__prev');
	var sliderNext = $('.slider__next');
	var sliderDots = $('.slider__dots');
	var sliderlength= sliderItem.length;

	if( slider.length ) {
		slider.slick({
			infinite: false,
			adaptiveHeight: true,
			arrows: false,
			speed: 400,
		});
	}
	if( slider.length && sliderPrev.length ) {
		sliderPrev.on('click', function() {
			slider.slick('slickPrev');
		});
	}
	
	if( slider.length && sliderNext.length ) {
		sliderNext.on('click', function() {
			slider.slick('slickNext');
		});
	}
	if(sliderDots) {
		slider.on('afterChange', function(e, slick, currentSlide) {
			sliderDots.children('button').removeClass('active');
			sliderDots.children('button[data-id="'+currentSlide+'"]').addClass('active');
		});
	}
	if(sliderDots.length) {
		sliderDots.children('button').on('click', function() {
			var id = parseInt($(this).data('id'));
			slider.slick('slickGoTo', id);
		});
	}

	updateSliderArrows();
	slider.on('afterChange', function() {
		updateSliderArrows();
	});

	function updateSliderArrows() {
		if(sliderlength && sliderPrev.length) sliderPrev.css('display', sliderItem.first().hasClass('slick-active') ? 'none' : 'block');
		if(sliderlength && sliderNext.length) sliderNext.css('display', sliderItem.last().hasClass('slick-active') ? 'none' : 'block');
	}
});
var height = $(window).height() - 64;
function updateScroll(scroll) {
	if( scroll > height ) {
		if( !$('.header').hasClass('header_dark') ) {
			$('.header').addClass('header_dark');
		}
	} else {
		$('.header').removeClass('header_dark');
	}
}
$(window).on('scroll', function () {
	updateScroll($(this).scrollTop());
});

