$(function(){
  var voice = 'en-US_AllisonVoice';
  var audio = $('.audio').get(0);
  $('.download-button').click(function() {
    var utteranceDownloadOptions = {
      text: "Hello, Ken is awesome",
      voice: voice,
      download: true
    };
    synthesizeRequest(utteranceDownloadOptions);
  });

  $('.speak-button').click(function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    // $('.result').hide();

    // $('#textArea').focus();
    var text = "Mayday mayday!Mayday mayday!Mayday mayday!"
    // if (validText(voice, text)) {
      var utteranceOptions = {
        text: text,
        voice: voice,
        sessionPermissions: 1
      };

      synthesizeRequest(utteranceOptions, audio);
    // }
    return false;
  });
});

function synthesizeRequest(options, audio) {
    var sessionPermissions = "false";
    var downloadURL = '/api/synthesize' +
      '?voice=' + options.voice +
      '&text=' + encodeURIComponent(options.text) +
      '&X-WDC-PL-OPT-OUT=' +  sessionPermissions;

    if (options.download) {
      downloadURL += '&download=true';
      window.location.href = downloadURL;
      return true;
    }
    audio.pause();
    audio.src = downloadURL;
    // enableButtons(true);
    audio.addEventListener('canplaythrough', onCanplaythrough);
    audio.muted = true;
    audio.play();
    $('body').css('cursor', 'wait');
    $('.speak-button').css('cursor', 'wait');
    return true;
}

  function onCanplaythrough() {
    console.log('onCanplaythrough');
    var audio = $('.audio').get(0);
    audio.removeEventListener('canplaythrough', onCanplaythrough);
    try {
      audio.currentTime = 0;
    }
    catch(ex) {
      // ignore. Firefox just freaks out here for no apparent reason.
    }
    audio.controls = true;
    audio.muted = false;
    // $('.result').show();
    // $('.error-row').css('visibility','hidden');
    // $('html, body').animate({scrollTop: $('.audio').offset().top}, 500);
    $('body').css('cursor', 'default');
    $('.speak-button').css('cursor', 'pointer');
  }

