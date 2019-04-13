$(document).ready(function() {

	//

	var $status = $('.slick-count .count');
  var $slickElement = $('.slick-gallery');

	$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$status.html('<b>' + i + '</b>' + ' / ' + slick.slideCount);
		if (slick.slideCount == 1) {
			$('.overlay').css('opacity', '1').css('visibility', 'visible');
			$('.slick-count').css('display', 'none');
		}
	});

	$slickElement.slick({
		prevArrow: '<button type="button" class="slick-prev"><i class="icon-right"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="icon-right"></i></button>',
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	$('.slick-price').slick({
		prevArrow: '<button type="button" class="slick-prev"><i class="icon-right"></i></button>',
		nextArrow: '<button type="button" class="slick-next"><i class="icon-right"></i></button>',
		arrows: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});

	//

	var
		$sliderMain = $('#fullpage.main');
		$sliderKaraoke = $('#fullpage.karaoke');
		$sliderWater = $('#fullpage.water');
		$count = $('#fullpage .section').length;
		$progressBar = $('.progressbar');
	$sliderMain.fullpage({
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
		normalScrollElements: '.overflow',
		responsiveWidth: 1199,
		anchors: ['banner', 'advantages', 'navigation',  'thermal'],
		afterLoad: function(origin, destination, direction) {
			var calculate = 100 / $count;
			if (destination.index == 0) {
				$('header').css('position', 'fixed');
				$('header').addClass('no-active');
				$('header').removeClass('no-start');
				$('footer').css('position', 'absolute').addClass('no-active');
				$progressBar
					.css('background-size', calculate + '% 100%')
					.attr('value-now', calculate );	
			}
			if (destination.index > 0) {
				$('header').css('position', 'fixed');
				$('footer').css('position', 'absolute').addClass('no-active');
			}
			if (destination.index == 1) {
				$('header').removeClass('no-active');
				$('header').addClass('no-start');
			}
			if (destination.index == 3) {
				$('footer').removeClass('no-active');
			}
		},
		onLeave: function(origin, destination, direction) {
			var calculate = ((destination.index + 1) / $count) * 100;
			$progressBar
				.css('background-size', calculate + '% 100%')
				.attr('value-now', calculate );
			if (destination.index == 0) {
				$('header').addClass('no-active');
				$('header').removeClass('no-start');
			}
			if (destination.index == 1) {
				$('header').removeClass('no-active');
				$('header').addClass('no-start');
			}
			if (destination.index >= 1) {
				$('footer').addClass('no-active');
			}
			if (destination.index == 2) {
				$('header').removeClass('no-start');
			}
			if (destination.index == 3) {
				$('footer').removeClass('no-active');
			}
		}
	});
	$sliderKaraoke.fullpage({
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
		normalScrollElements: '.overflow',
		responsiveWidth: 1199,
		anchors: ['banner', 'karaoke'],
		afterLoad: function(origin, destination, direction) {
			if (destination.index == 0) {
				$('header').css('position', 'fixed');
				$('header').addClass('no-active');
			}
			if (destination.index > 0) {
				$('header').css('position', 'fixed');
			}
		},
		onLeave: function(origin, destination, direction) {
			if (destination.index == 0) {
				$('header').addClass('no-active');
			}
			if (destination.index == 1) {
				$('header').removeClass('no-active');
			}
		}
	});
	$sliderWater.fullpage({
		licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
		normalScrollElements: '.overflow',
		responsiveWidth: 1199,
		anchors: ['water'],
		controlArrows: false,
		slidesNavigation: true,
		paddingTop: '60px',
		paddingBottom: '79px',
		afterLoad: function(origin, destination, direction) {
			if (destination.index == 0) {
				$('header').css('position', 'fixed');
			}
		}
	});
	$('.fp-slidesNav ul li:first-child a').html('<b>1</b><span>польза термальной воды</span><img src="img/icons/right.svg" />');
	$('.fp-slidesNav ul li:nth-child(2) a').html('<b>2</b><span>лечение</span><img src="img/icons/right.svg" />');
	$('.fp-slidesNav ul li:last-child a').html('<b>3</b><span>показание и противопоказания</span><img src="img/icons/right.svg" />');

	//

	$('.trigger-open-menu').click(function(t) {
		t.preventDefault();
		var i = $(this).closest('.interactive-map__menu');
		i.toggleClass('open');
	});
	$('body').click(function(t) {
		if ($(t.target).closest('.interactive-map').length) {
			if (0 == $(t.target).closest('.interactive-map__menu').length) {
				var i = $('.interactive-map__menu');
				i.removeClass('open');
			}
			0 == $(t.target).closest('.interactive-map__description').length 
			&& 0 == $(t.target).closest('.trigger-bullet').length && $('.interactive-map__description').removeClass('open')
		}
	});
	$('.trigger-bullet').click(function(t) {
		if (t.preventDefault(), $('.interactive-map__description.open').removeClass('open'), $(this).data('description')) {
			var i = $(this).data('description');
			$('#' + i).length && $('#' + i).addClass('open')
		}
	});

	//

	$('header .toggle').click(function() {
		$('.nav').toggleClass('open');
	});
	$('.nav .close').click(function() {
		$('.nav').toggleClass('open');
	});
	$('.nav-map .box .box-icon span:nth-child(3)').click(function() {
		$('.nav-map .box .box-icon').removeClass('open');
		$(this).parent().addClass('open');
	});
	$('.nav-map .box .box-icon span:last-child').click(function() {
		$(this).parent().removeClass('open');
	});
	$('.events .box-info .item:first-child')
		.addClass('active')
		.find('.item-info').clone()
		.appendTo('.events .box-text .overflow');
	$('.events .box-info .item').click(function() {
		$('.events .box-info .item').removeClass('active');
		$('.events .box-text .item-info').remove();
		$(this)
			.addClass('active')
			.find('.item-info').clone()
			.appendTo('.events .box-text .overflow .simplebar-content')
			.css('opacity', '0')
			.delay(300).animate({'opacity': '1'}, 'slow');
	});
	$(document).mouseup(function (e){
		var icon = $('.nav-map .box .box-icon');
		if (!icon.is(e.target) && icon.has(e.target).length === 0) { 
			icon.removeClass('open');
		}
	});

	//

	function ObjectFitIt() {
		$('img.obj').each(function(){
			var imgSrc = $(this).attr('src');
			var fitType = 'cover';

			if($(this).data('fit-type')) {
				fitType = $(this).data('fit-type');
			}

			$(this).parent().css({ 'background' : 'transparent url("' + imgSrc + '") no-repeat center center/' + fitType, });
			$('img.obj').css('display','none'); });
	}
	if('objectFit' in document.documentElement.style === false) {
		ObjectFitIt();
	}

	//

	$(window).load(function() {
		$('.pulse').fadeOut();
		$('.preloader').delay(400).fadeOut('slow');
		updateContainer();
	});

	function updateContainer() {
		var $containerWidth = $(window).width();
		if ($containerWidth <= 749) {
			$('header .menu li:nth-child(-n+2)').clone().appendTo('.nav .box-menu ul');
		}
		if ($containerWidth > 750) {
			$('.nav .box-menu li:nth-last-child(-n+2)').clone().appendTo('header .menu ul');
			$('header .menu li:nth-last-child(-n+2)').remove();
		}
		if ($containerWidth <= 1199) {
			$('.box-visual.box-big .box-btn').appendTo('.box-visual.box-big ~ .box-info');
			$('.box-visual.box-big .box-double').appendTo('.box-visual.box-big ~ .box-info');
		}
		if ($containerWidth > 1200) {
			$('.box-visual.box-big ~ .box-info .box-btn').appendTo('.box-visual.box-big');
			$('.box-visual.box-big ~ .box-info .box-double').appendTo('.box-visual.box-big');
		}
	}

	//
	
});