function toggleMusic() {
  const music = document.getElementById("bg-music");
  music.paused ? music.play() : music.pause();
}
function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;
  addMessage("You", message);
  input.value = "";
  fetch("/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
    .then(res => res.json())
    .then(data => {
      addMessage("Sree", data.reply);
      speakMessage(data.reply);
    });
}
function addMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}
function speakMessage(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();
  const femaleVoice = voices.find(v =>
    v.name.toLowerCase().includes("female") ||
    v.name.toLowerCase().includes("zira") ||
    v.name.toLowerCase().includes("samantha")
  );
  if (femaleVoice) utterance.voice = femaleVoice;
  if (text.toLowerCase().includes("love")) {
    utterance.pitch = 1.5;
    utterance.rate = 0.9;
  } else {
    utterance.pitch = 1.2;
    utterance.rate = 1;
  }
  utterance.volume = 1;
  speechSynthesis.speak(utterance);
}
