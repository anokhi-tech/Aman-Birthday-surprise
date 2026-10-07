document.addEventListener("DOMContentLoaded", () => {

  const $ = id => document.getElementById(id);
  const screens = [...document.querySelectorAll(".screen")];

  const hearts = ["❤️", "💕", "💗", "💖", "🤍", "✨", "🌸"];

  // =========================
  // MUSIC
  // =========================

  const birthdayMusic = new Audio("song-birthday.mp3");
  const hukumMusic = new Audio("song-hukum-ka-ekka.mp3");
  const chahiyeMusic = new Audio("song-tu-chahiye.mp3");

  birthdayMusic.loop = true;
  hukumMusic.loop = true;
  chahiyeMusic.loop = true;

  birthdayMusic.volume = 0.7;
  hukumMusic.volume = 0.7;
  chahiyeMusic.volume = 0.7;

  function stopAllMusic() {
    birthdayMusic.pause();
    hukumMusic.pause();
    chahiyeMusic.pause();

    birthdayMusic.currentTime = 0;
    hukumMusic.currentTime = 0;
    chahiyeMusic.currentTime = 0;
  }

  function playMusic(song) {
    stopAllMusic();

    song.play().catch(error => {
      console.log("Music could not start:", error);
    });
  }


  // =========================
  // SCREEN CONTROL
  // =========================

  function show(id) {
    screens.forEach(s => s.classList.remove("active"));

    $(id).classList.add("active");

    window.scrollTo(0, 0);
  }


  // =========================
  // FLOATING HEARTS
  // =========================

  function heartsGo(n = 15) {

    for (let i = 0; i < n; i++) {

      const h = document.createElement("div");

      h.className = "heart";

      h.textContent =
        hearts[Math.floor(Math.random() * hearts.length)];

      h.style.left = Math.random() * 100 + "vw";

      h.style.fontSize =
        14 + Math.random() * 24 + "px";

      h.style.animationDuration =
        4 + Math.random() * 4 + "s";

      $("hearts").appendChild(h);

      setTimeout(() => h.remove(), 8500);
    }
  }


  // =========================
  // OPEN SURPRISE
  // =========================

  $("openBtn").onclick = () => {

    show("countdown");

    heartsGo(20);

    let n = 20;

    $("number").textContent = n;
    $("minutes").textContent = "seconds left ❤️";

    const t = setInterval(() => {

      n--;

      $("number").textContent = n;

      $("minutes").textContent =
        n > 1
          ? "seconds left ❤️"
          : n === 1
          ? "second left ❤️"
          : "❤️";

      $("progress").style.width =
        ((20 - n) / 20 * 100) + "%";

      heartsGo(2);

      if (n <= 0) {

        clearInterval(t);

        setTimeout(() => {

          show("birthday");

          heartsGo(35);

          // 🎵 BIRTHDAY SONG STARTS
          playMusic(birthdayMusic);

          setTimeout(showMessages, 3300);

        }, 800);
      }

    }, 1000);
  };


  // =========================
  // BIRTHDAY MESSAGES
  // =========================

  function showMessages() {

    show("messages");

    $("messageList").innerHTML = "";

    const a = [

      "Happy Birthday, Aman! 🎂❤️",

      "May this year bring you peace, growth and lots of happiness. ✨",

      "May all the hard work you do finally pay off. 🫶",

      "Stay healthy, keep smiling and keep being your ridiculous self. 😂",

      "I hope you get everything you're working for. ❤️",

      "And yes... keep annoying me forever. 🙄❤️",

      "I love you, birthday boy. 🥺❤️"

    ];

    a.forEach((x, i) => {

      setTimeout(() => {

        const d = document.createElement("div");

        d.className = "message";

        d.textContent = x;

        $("messageList").appendChild(d);

      }, i * 650);

    });

    setTimeout(() => {

      $("giftButton").classList.remove("hidden");

    }, a.length * 650 + 500);
  }


  // =========================
  // GIFT
  // =========================

  $("giftButton").onclick = () => {

    show("gift");

    heartsGo(20);
  };


  // =========================
  // TWIST
  // =========================

  function twist() {

    const a = [

      "Wait...",

      "You seriously thought...",

      "I was going to copy your video for you? 😭",

      "Seriously, Aman? 😂",

      "You really thought THIS was the whole birthday surprise? 😌❤️",

      "That was just the trailer."

    ];

    let i = 0;

    function next() {

      if (i >= a.length) {

        $("realButton").classList.remove("hidden");

        heartsGo(35);

        return;
      }

      $("twistText").style.opacity = 0;

      setTimeout(() => {

        $("twistText").textContent = a[i++];

        $("twistText").style.opacity = 1;

        setTimeout(next, 1400);

      }, 450);
    }

    next();
  }


  // =========================
  // GIFT → TWIST
  // =========================

  $("giftEmoji").onclick = () => {

    show("twist");

    twist();
  };


  $("giftEmoji").onkeydown = e => {

    if (e.key === "Enter" || e.key === " ") {

      e.preventDefault();

      show("twist");

      twist();
    }
  };


  // =========================
  // REAL SURPRISE
  // =========================

  $("realButton").onclick = () => {

    show("realStory");

    heartsGo(30);
  };


  // =========================
  // AMAN.EXE
  // =========================

  $("amanFileButton").onclick = () => {

    show("amanFile");

    heartsGo(22);
  };


  // =========================
  // WHY AMAN IS SPECIAL
  // 🎵 HUKUM KA EKKA
  // =========================

  $("whyButton").onclick = () => {

    show("why");

    heartsGo(24);

    // 🎵 SECOND SONG
    playMusic(hukumMusic);
  };


  // =========================
  // OUR STORY
  // =========================

  $("storyButton").onclick = () => {

    show("ourStory");

    heartsGo(25);

    // Make sure second song continues
    if (hukumMusic.paused) {
      hukumMusic.play().catch(() => {});
    }
  };


  // =========================
  // MEMORIES
  // =========================

  $("memoriesButton").onclick = () => {

    show("memories");

    heartsGo(25);

    // Keep Hukum Ka Ekka playing
    if (hukumMusic.paused) {
      hukumMusic.play().catch(() => {});
    }
  };


  // =========================
  // LETTER
  // 🎵 TU CHAHIYE
  // =========================

  $("letterButton").onclick = () => {

    show("letter");

    heartsGo(30);

    // 🎵 THIRD SONG
    playMusic(chahiyeMusic);
  };


  // =========================
  // FINAL
  // =========================

  $("finalButton").onclick = () => {

    show("final");

    heartsGo(45);

    // Keep Tu Chahiye playing
    if (chahiyeMusic.paused) {
      chahiyeMusic.play().catch(() => {});
    }
  };


  // =========================
  // SECRET
  // =========================

  $("secretButton").onclick = () => {

    show("secret");

    heartsGo(60);

    // Keep final song playing
    if (chahiyeMusic.paused) {
      chahiyeMusic.play().catch(() => {});
    }
  };


  // =========================
  // PHOTO ERROR HANDLING
  // =========================

  document.querySelectorAll(".gallery img").forEach(img => {

    img.addEventListener("error", () => {

      img.closest("figure").classList.add("missing");

      img.alt =
        "Photo not found — check the filename.";
    });

  });


  // Initial hearts
  heartsGo(8);

});