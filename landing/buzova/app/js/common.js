$(function () {

	let audioSlider = $('.audio-slider');
	let audioNav = $('.audio-nav');
	let prevSlide = $('.control-list__item--prev');
	let nextSlide = $('.control-list__item--next');
	let playButton = $('.control-list__item--play');



	let buzPlayer = $("#buzPlayer")[0];

	let isPlaying = false;

	audioSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		songSrc = $('.audio-slider__item[data-slick-index=' + nextSlide + ']').attr('data-song');
		$(buzPlayer).attr('src', songSrc);
		buzPlayer.pause();
		isPlaying = false;
		playButton.text('Слушать');
	});

	function togglePlay() {
		if (isPlaying) {
			buzPlayer.pause();
			playButton.text('Слушать');
		} else {
			buzPlayer.play();
			playButton.text('Стоп');

		}
	};
	buzPlayer.onplaying = function () {
		isPlaying = true;
	};
	buzPlayer.onpause = function () {
		isPlaying = false;
	};

	playButton.on('click', function () {
		togglePlay();
	});

	audioSlider.slick({
		slidesToShow: 2,
		arrows: false,
		variableWidth: true,
		asNavFor: '.audio-nav',
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	audioNav.slick({
		slidesToShow: 2,
		arrows: false,
		asNavFor: '.audio-slider',
		variableWidth: true,
		responsive: [
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	prevSlide.on('click', function () {
		audioSlider.slick('slickPrev');
	});
	nextSlide.on('click', function () {
		audioSlider.slick('slickNext');
	});


	new WOW().init();

});
