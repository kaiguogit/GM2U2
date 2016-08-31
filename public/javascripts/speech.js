// wait on voices to be loaded before fetching list
window.speechSynthesis.onvoiceschanged = function() {

  function setupSpeak(){
    voice = window.speechSynthesis.getVoices().filter(function(voice, index){ 
      // return voice.name === "Samantha" && voice.lang==="en-US"
      return voice.name === "Google US English" && voice.lang==="en-US"
    })[0];
    return function speak(msg){
      var speech = new SpeechSynthesisUtterance(msg);
      speech.voice = voice;
      window.speechSynthesis.speak(speech);
    }
  };
  window.speak = setupSpeak();
};