document.addEventListener("DOMContentLoaded", () => {
  const introPage = document.getElementById("intro-page");
const bookPage = document.getElementById("book-page");
const book = document.getElementById("book");
const bgMusic = document.getElementById("bg-music");

  // Transition from Intro to Book
  introPage.addEventListener("click", () => {
  bgMusic.play(); // 🔥 PLAY LAGU

    introPage.style.opacity = "0";
    setTimeout(() => {
      introPage.classList.add("hidden");
      bookPage.classList.remove("hidden");
      // Trigger reflow
      void bookPage.offsetWidth;
      bookPage.style.opacity = "1";
    }, 1000);
  });

  // Book Flip Logic
  let currentLocation = 1;
  const numOfPapers = 3;
  const maxLocation = numOfPapers + 1;

  const papers = [
    document.getElementById("p1"),
    document.getElementById("p2"),
    document.getElementById("p3"),
  ];

  book.addEventListener("click", () => {
    if (currentLocation < maxLocation) {
      const paper = papers[currentLocation - 1];
      openBook(paper);
      currentLocation++;
    } else {
      // Transition to Box Page
      bookPage.style.opacity = "0";
      setTimeout(() => {
        bookPage.classList.add("hidden");
        const boxPage = document.getElementById("box-page");
        boxPage.classList.remove("hidden");
        void boxPage.offsetWidth;
        boxPage.style.opacity = "1";

        // Trigger Photo Animation
        setTimeout(() => {
          const container = document.getElementById("photos-container");
          container.classList.add("box-open");

          // Show Next Button after photos appear
          setTimeout(() => {
            const nextBtn = document.getElementById("to-music-page");
            nextBtn.classList.remove("hidden");
          }, 2000);
        }, 500);
      }, 1000);
    }
  });

  // Transition to Music Page
  const toMusicBtn = document.getElementById("to-music-page");
  const boxPage = document.getElementById("box-page");
  const musicPage = document.getElementById("music-page");
  const cassetteWrapper = document.getElementById("cassette-wrapper");
  const spotifyWrapper = document.getElementById("spotify-wrapper");
  const toVideoBtn = document.getElementById("to-video-page");

  toMusicBtn.addEventListener("click", () => {
  bgMusic.pause(); // 🛑 STOP LAGU
  bgMusic.currentTime = 0;

    boxPage.style.opacity = "0";
    setTimeout(() => {
      boxPage.classList.add("hidden");
      musicPage.classList.remove("hidden");
      void musicPage.offsetWidth;
      musicPage.style.opacity = "1";

      // Trigger Cassette -> Spotify Animation
      setTimeout(() => {
        cassetteWrapper.classList.add("slide-out");
        spotifyWrapper.classList.remove("hidden");
        // Small delay to start slide-in after slide-out starts
        setTimeout(() => {
          spotifyWrapper.classList.add("slide-in");

          // Show Next Button (to Video) after Spotify appears
          setTimeout(() => {
            toVideoBtn.classList.remove("hidden");
          }, 2000);
        }, 500);
      }, 1500); // Wait a bit before starting animation
    }, 1000);
  });

  // Transition to Video Page
  const videoPage = document.getElementById("video-page");
  const mainVideo = document.getElementById("main-video");
  const backBtn = document.getElementById("back-to-start");

  toVideoBtn.addEventListener("click", () => {
    musicPage.style.opacity = "0";
    setTimeout(() => {
      musicPage.classList.add("hidden");
      videoPage.classList.remove("hidden");
      void videoPage.offsetWidth;
      videoPage.style.opacity = "1";
    }, 1000);
  });

  // Video Ended Event
  mainVideo.addEventListener("ended", () => {
    backBtn.classList.remove("hidden");
  });

  // Back to Start
  backBtn.addEventListener("click", () => {
    // Reload the page to reset everything
    location.reload();
  });

  function openBook(paper) {
    paper.classList.add("flipped");
    // Adjust z-index for stacking on the left
    if (paper.id === "p1") {
      paper.style.zIndex = 1;
    } else if (paper.id === "p2") {
      paper.style.zIndex = 2;
    } else if (paper.id === "p3") {
      paper.style.zIndex = 3;
    }
  }

  function closeBook(papers) {
    papers.forEach((paper) => {
      paper.classList.remove("flipped");
      // Reset z-indexes to initial state
      if (paper.id === "p1") paper.style.zIndex = 3;
      if (paper.id === "p2") paper.style.zIndex = 2;
      if (paper.id === "p3") paper.style.zIndex = 1;
    });
  }
});

// Lightbox Functions (Global scope)
function openLightbox(element) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const img = element.querySelector("img");

  lightbox.classList.remove("hidden");
  lightboxImg.src = img.src;
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.add("hidden");
}
