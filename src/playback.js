var howler = require('howler');

var sound = new howler.Howl({
    src: ['test.flac']
  });

var isPlaying = false;

$('#playpause').click(() => {
    console.log("click")
    console.log(sound.duration())
    console.log(sound.seek())
    if (!isPlaying) {
        sound.play();
        isPlaying = true;
    } else {
        sound.pause();
        isPlaying = false;
    }
});