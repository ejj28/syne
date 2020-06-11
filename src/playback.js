var howler = require('howler');

var sound = new howler.Howl({
    src: ['test.flac']
  });

var isPlaying = false;

$("#seekBar").bootstrapSlider('option',{min: 0, max: Math.round(sound.duration())});

$('#playpause').click(() => {
    console.log("click")
    console.log(Math.round(sound.duration()))
    console.log(Math.round(sound.seek()))
    if (!isPlaying) {
        sound.play();
        isPlaying = true;
    } else {
        sound.pause();
        isPlaying = false;
    }
});

setInterval(() => {
    updateBar();
}, 250);

function updateBar() {
    $("#seekBar").bootstrapSlider('value',Math.round(sound.seek()));
}