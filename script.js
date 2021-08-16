const $ = e => document.querySelector(e);

let pathImage = 'assets/images/';
let pathAudio = 'assets/audio/';

let initial = 0;
let position;
let playerPlay = false;

let media = []

const actions = {
	insertMusic(initial) {
		$('#album-image').src = media[initial].image;
		$('.music-title').innerHTML = media[initial].name;
		$('#actions-audio').src = media[initial].audio;
		$('#download-link').href = media[initial].audio;

		actions.play()
	},

	next() {
		if(initial < media.length - 1) {
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
		if(initial > 0) {
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
		$('.position').innerHTML = `${initial + 1} / ${media.length}`;
	},

	play() {
		$('#actions-audio').play();
		$('#paused').classList.add('fa-pause');
		$('#paused').classList.remove('fa-play');
		$('#paused').style.paddingLeft = 0
	},

	pause() {
		$('#actions-audio').pause();
		$('#paused').classList.remove('fa-pause');
		$('#paused').classList.add('fa-play');
		$('#paused').style.paddingLeft = "5px";
	},

	pausePlay() {
		playerPlay === true ? playerPlay = false : playerPlay = true; 
		playerPlay ? actions.play()	: actions.pause()
	},

	timeMusic() {
		setInterval(() => {
			let time = $('#actions-audio').currentTime;
			let dur = $('#actions-audio').duration;

			$('#time-audio').max = dur;
			$('#time-audio').value = time;

			if (dur === time) {
				actions.next()
			}
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

fetch('./data.json')
	.then(elem => elem.json())
	.then(data => {

		data.map(elem => {
			try {
				let dados = {
					"name" : elem.name,
					"image" : pathImage + elem.image,
					"audio" : pathAudio + elem.audio
				}

			 	media.push(dados);
			} catch (e) {
				console.log("my error and:" + e)
			}

		});
		
		actions.insertMusic(initial);

	}).catch(err => console.log(err));

actions.musicPosition();
actions.timeMusic();
actions.volumeAudio();

$('#time-audio').addEventListener('change', actions.musicChange);
$('.fa-forward').addEventListener('click', actions.next);
$('.fa-backward').addEventListener('click', actions.previus);
$('#paused').addEventListener('click', actions.pausePlay);
$('#vol-audio').addEventListener('change', actions.volumeAudio);
