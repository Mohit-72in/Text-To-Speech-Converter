const text = document.getElementById("textToConvert");
const convertBtn = document.getElementById("convertBtn");
const error = document.querySelector(".error-para");
const synth = window.speechSynthesis;

convertBtn.addEventListener("click", () => {
  const enteredText = text.value.trim();

  if (!enteredText.length) {
    error.textContent = "⚠️ Nothing to Convert! Please enter some text.";
    return;
  }
  error.textContent = "";

  // अगर पहले से बोल रहा है तो cancel कर दो
  if (synth.speaking) {
    synth.cancel();
  }

  const utterance = new SpeechSynthesisUtterance(enteredText);

  // Hindi voice चुनने की कोशिश
  const voices = synth.getVoices();
  const hindiVoice = voices.find((v) => v.lang.toLowerCase().includes("hi"));
  if (hindiVoice) {
    utterance.voice = hindiVoice;
  }

  utterance.rate = 1; // थोड़ा धीमा पढ़े
  utterance.pitch = 1;

  convertBtn.textContent = "🔊 Playing...";
  utterance.onend = () => {
    convertBtn.textContent = "▶️ Play Converted Sound";
  };

  synth.speak(utterance);
});

// Chrome के लिए voices लोड करने का fix
window.speechSynthesis.onvoiceschanged = () => {};
