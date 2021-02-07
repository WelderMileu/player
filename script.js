const $ = e => document.querySelector(e);

let pathImage = 'assets/albums/';
let pathMusic = 'assets/audio/';

let musics = [
	{
		name: "Quando o que e santo vier",
		image: pathImage + "quando-o-que-e-santo-vier.jpg",
		music: pathMusic + "ID2-Quando-o-que-e-Santo-Vier.mp3"
	},
	{
		name: "Sonho de Deus",
		image: pathImage + "sonho-de-deus.jpg",
		music: pathMusic + "ID2-Sonho-de-Deus.mp3"
	},
	{
		name: "Tua Casa",
		image: pathImage + "tua-casa.jpg",
		music: pathMusic + "ID2-Tua-Casa.mp3"
	},
	{
		name: "Ousado Amor",
		image: pathImage + "ousado-amor.jpg",
		music: pathMusic + "ousado-amor.mp3"
	}
];	

let initial = 0;
let position;
let playerPlay = false;

const actions = {
	insertMusic(initial) {
		$('#album-image').src = musics[initial].image;
		$('.music-title').innerHTML = musics[initial].name;
		$('#actions-audio').src = musics[initial].music;
		$('#actions-audio').play();
	},

	next() {
		if(initial < musics.length - 1) {
			initial++;
			actions.insertMusic(initial);
		} else {
			initial = 0;
			actions.insertMusic(initial);
		}

		position = initial;
		actions.musicPosition();
	},

	previus () {
		if(initial < 0) {
			initial--;
			actions.insertMusic(initial);
		} else {
			initial = 0;
			actions.insertMusic(initial);
		}

		position = initial;
		actions.musicPosition();
	},

	musicPosition() {
		$('.position').innerHTML = `${initial + 1}/${musics.length}`;
	},

	pausePlay() {
		playerPlay === true ? playerPlay = false : playerPlay = true; 

		if (playerPlay) {
			$('#actions-audio').pause();
			$('#paused').classList.remove('fa-pause');
			$('#paused').classList.add('fa-play');
		} else {
			$('#actions-audio').play();
			$('#paused').classList.add('fa-pause');
			$('#paused').classList.remove('fa-play');
		}
	},

	timeMusic() {
		setInterval(() => {
			let time = $('#actions-audio').currentTime;
			let dur = $('#actions-audio').duration;

			$('#time-audio').max = dur;
			$('#time-audio').value = time;
		}, 1000)
	},

	musicChange() {
		let col = $('#time-audio').value;
		$('#actions-audio').currentTime = col;
	},

	volumeAudio() {
		let valor = $('#vol-audio').value;
		let time = $('#actions-audio').volume = `0.${valor}`;
		
		$('#vol-cont').innerHTML = valor;
	}
};

actions.insertMusic(initial);
actions.musicPosition();
actions.timeMusic();
actions.volumeAudio();

$('#time-audio').addEventListener('change', actions.musicChange);
$('.fa-forward').addEventListener('click', actions.next);
$('.fa-backward').addEventListener('click', actions.previus);
$('#paused').addEventListener('click', actions.pausePlay);
$('#vol-audio').addEventListener('change', actions.volumeAudio);