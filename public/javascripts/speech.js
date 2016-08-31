//This file loads speech synthesis.
//It register a global function "speak(msg)"
//call it anywhere and pass string to speak out

// wait on voices to be loaded before fetching list
window.speechSynthesis.onvoiceschanged = function() {

  function setupSpeak(){
    voice = window.speechSynthesis.getVoices().filter(function(voice, index){ 
      return voice.name === "Samantha" && voice.lang==="en-US"
      // return voice.name.toUpperCase() === "Google 日本語".toUpperCase() && voice.lang==="en-US"
      // return voice.name.toUpperCase() === "Google 普通话（中国大陆）".toUpperCase() && voice.lang==="zh-CN"
      // return voice.name.toUpperCase() === "Google 粤語（香港）".toUpperCase() && voice.lang==="zh-HK"
      // return voice.name.toUpperCase() === "Google 國語（臺灣）".toUpperCase() && voice.lang==="zh-TW"
    })[0];
    return function speak(msg){
      var speech = new SpeechSynthesisUtterance(msg);
      speech.voice = voice;
      speech.lang = 'en-US';
      window.speechSynthesis.speak(speech);
    }
  };
  window.speak = setupSpeak();
};