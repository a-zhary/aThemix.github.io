const loadText = document.querySelector('.laoding-text');
const bg = document.querySelector('.bg');

let load = 0;

let int = setInterval(bluring, 30);

const scale = (num, inMin, inMax, outMin, outMax) => {
	return (num - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

function bluring() {
	load++;

	if (load > 99) {
		clearInterval(int);
	}
	loadText.innerText = `${load}%`;
	loadText.style.opacity = scale(load, 0, 100, 1, 0);
	bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
}
