alert("Turn Mic on")

window.AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioContext = new AudioContext();

    navigator.mediaDevices.getUserMedia({audio: true})
    .then(
      //stream is what is returned
      (stream) =>
    {
      //returns a MediaStreamAudioSourceNode.
      const microphoneIn = audioContext.createMediaStreamSource(stream);
      const filter = audioContext.createBiquadFilter();
      const analyser = audioContext.createAnalyser();
      //const analyser = audioContext.frequencyBinCount ()

        // microphone -> filter ->  analyzer->destination
        microphoneIn.connect(filter);
      //use the analyzer object to get some properties ....
      filter.connect(analyser);

      //console console.log(frequencyBinCount);

      analyser.connect(audioContext.destination);
