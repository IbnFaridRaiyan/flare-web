const previewVideo = document.querySelector("#preview-video");
const playToggle = document.querySelector("#video-play-toggle");
const muteToggle = document.querySelector("#video-mute-toggle");
const videoStatus = document.querySelector("#video-status");

function showVideoStatus(message) {
  videoStatus.textContent = message;
  videoStatus.hidden = false;
}

function updatePlayToggle() {
  const isPlaying = !previewVideo.paused;
  const action = isPlaying ? "Pause" : "Play";
  playToggle.textContent = `${action} preview`;
  playToggle.setAttribute("aria-label", `${action} preview`);
}

function updateMuteToggle() {
  const action = previewVideo.muted ? "Unmute" : "Mute";
  muteToggle.textContent = `${action} preview`;
  muteToggle.setAttribute("aria-label", `${action} preview`);
}

previewVideo.addEventListener("playing", updatePlayToggle);
previewVideo.addEventListener("pause", updatePlayToggle);
previewVideo.addEventListener("volumechange", updateMuteToggle);
previewVideo.addEventListener("error", () => {
  showVideoStatus("The preview could not be loaded.");
});

playToggle.addEventListener("click", () => {
  if (previewVideo.paused) {
    previewVideo.play().catch(() => {
      showVideoStatus("The preview could not be played.");
    });
  } else {
    previewVideo.pause();
  }
});

muteToggle.addEventListener("click", () => {
  previewVideo.muted = !previewVideo.muted;
});

updatePlayToggle();
updateMuteToggle();
previewVideo.play().catch(() => {
  showVideoStatus("Autoplay was blocked. Select Play preview to start.");
});
