$(function () {

	let audioSlider = $('.audio-slider');
	let audioNav = $('.audio-nav');
	let prevSlide = $('.control-list__item--prev');
	let nextSlide = $('.control-list__item--next');
	let playButton = $('.control-list__item--play');

	let songSrc = '';
	let buzPlayer = new Audio('audio/recieve-me.mp3');
	let isPlaying = false;

	$(audioSlider).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
		songSrc = $('.audio-slider__item[data-slick-index=' + nextSlide + ']').attr('data-song');
		buzPlayer = new Audio(songSrc);
	});

	function togglePlay() {

		if (isPlaying) {
			buzPlayer.pause()
		} else {
			buzPlayer.play();
		}

	};

	if (buzPlayer) {
		buzPlayer.onplaying = function () {
			isPlaying = true;
		};
	}
	if (buzPlayer) {
		buzPlayer.onpause = function () {
			isPlaying = false;
		};
	}

	playButton.on('click', function () {
		togglePlay()
	});

	audioSlider.slick({
		slidesToShow: 2,
		arrows: false,
		variableWidth: true,
		asNavFor: '.audio-nav',
	});

	audioNav.slick({
		slidesToShow: 2,
		arrows: false,
		asNavFor: '.audio-slider',
		variableWidth: true,
	});

	prevSlide.on('click', function () {
		audioSlider.slick('slickPrev');
	});
	nextSlide.on('click', function () {
		audioSlider.slick('slickNext');
	});


	new WOW().init();

});
