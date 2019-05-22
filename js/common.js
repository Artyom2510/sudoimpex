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

	//Slider
	var slider = $('.slider');
	var sliderItem = $('.slider__item');
	var sliderPrev = $('.slider__prev');
	var sliderNext = $('.slider__next');
	var sliderDots = $('.slider__dots');
	var sliderDotsPrev = $('.slider__prev div');
	var sliderDotsNext = $('.slider__next div');
	var groupTranslate = $('.slider__annotation, .slider__img, .slider__desc, .slider__title, .slider__agree');

	if( slider.length ) {
		slider.slick({
			infinite: false,
			adaptiveHeight: true,
			arrows: false,
			speed: 500,
			fade: true,
			cssEase: 'linear'
		});
		// $('.slick-current').find(groupTranslate).addClass('translate');
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
			var current = sliderDots.children('button[data-id="'+currentSlide+'"]');
			var allDots = sliderDots.children('button');
			allDots.removeClass('active');
			current.addClass('active');
			sliderDotsPrev.attr('data-text', allDots.eq(current.index() - 1).text());
			sliderDotsNext.attr('data-text', allDots.eq(current.index() + 1).text());
		});
	}

	if(sliderDots.length) {
		sliderDots.children('button').on('click', function() {
			var id = parseInt($(this).data('id'));
			slider.slick('slickGoTo', id);
		});
	}

	updateSliderArrows();
	slider.on('beforeChange', function() {
		groupTranslate.addClass('translate-left');
		groupTranslate.removeClass('translate');
	});

	slider.on('afterChange', function() {
		updateSliderArrows();
		updateLineheight();
		groupTranslate.removeClass('translate-left');
		$('.slick-current').find(groupTranslate).addClass('translate');
	});

	function updateSliderArrows() {
		if(sliderItem.length && sliderPrev.length) sliderPrev.css('display', sliderItem.first().hasClass('slick-active') ? 'none' : 'block');
		if(sliderItem.length && sliderNext.length) sliderNext.css('display', sliderItem.last().hasClass('slick-active') ? 'none' : 'block');
	}
	//Высота линий
	function updateLineheight() {
		var heightSlidersSection = $('.sliders').outerHeight(true);
		$('.main__line').height(heightSlidersSection);
	}
	//Popup
	$('.js-tgl-popup').on('click', function() {
		var _ = $(this);
		var parentSlide = _.parents('.slider__item');
		var thisPopup = parentSlide.find('.slider__popup');
		if( !thisPopup.hasClass('display') ) {
			$('.js-tgl-popup').addClass('close');
			_.removeClass('close');
			_.addClass('open');
			$('.slider__popup').removeClass('visible display');
			thisPopup.addClass('display');
			setTimeout(function(){
				thisPopup.addClass('visible');
			}, 1);
		} else {
			_.addClass('close');
			thisPopup.removeClass('visible');
			setTimeout(function(){
				thisPopup.removeClass('display');
			}, 300);
		}
	});

	//Отклчюение события прокрутке на попапе
	$('.popup').on('wheel', function(e) {
		e.stopPropagation();
	});

	//высота линий на странице контакты
	if( $(window).width() < 768 ) {
		$('.main-contacts__line').height($('.main-contacts').outerHeight(true));
	}
});
