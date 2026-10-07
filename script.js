document.addEventListener("DOMContentLoaded", () => {

  const $ = id => document.getElementById(id);
  const screens = [...document.querySelectorAll(".screen")];

  const hearts = ["❤️", "💕", "💗", "💖", "🤍", "✨", "🌸"];


  /* =====================================
     🎵 MUSIC
  ===================================== */

  const birthdaySong = new Audio("./song-birthday.mp3");
  const hukumSong = new Audio("./song-hukum-ka-ekka.mp3");
  const tuChahiyeSong = new Audio("./song-tu-chahiye.mp3");

  birthdaySong.preload = "auto";
  hukumSong.preload = "auto";
  tuChahiyeSong.preload = "auto";

  birthdaySong.volume = 0.7;
  hukumSong.volume = 0.7;
  tuChahiyeSong.volume = 0.7;

  birthdaySong.loop = false;
  hukumSong.loop = true;
  tuChahiyeSong.loop = true;


  function stopAllMusic() {

    birthdaySong.pause();
    hukumSong.pause();
    tuChahiyeSong.pause();

  }


  function playBirthdaySong() {

    stopAllMusic();

    birthdaySong.currentTime = 0;

    birthdaySong.play()
      .then(() => {
        console.log("🎂 Birthday song playing");
      })
      .catch(error => {
        console.log("Birthday song error:", error);
      });

  }


  function playHukumSong() {

    stopAllMusic();

    hukumSong.currentTime = 0;

    hukumSong.play()
      .then(() => {
        console.log("❤️ Hukum Ka Ekka playing");
      })
      .catch(error => {
        console.log("Hukum song error:", error);
      });

  }


  function playTuChahiyeSong() {

    stopAllMusic();

    tuChahiyeSong.currentTime = 0;

    tuChahiyeSong.play()
      .then(() => {
        console.log("🥺 Tu Chahiye playing");
      })
      .catch(error => {
        console.log("Tu Chahiye error:", error);
      });

  }


  /* =====================================
     📱 SCREEN CHANGE
  ===================================== */

  function show(id) {

    screens.forEach(screen => {
      screen.classList.remove("active");
    });

    const target = $(id);

    if (target) {
      target.classList.add("active");
    }

    window.scrollTo(0, 0);
  }


  /* =====================================
     ❤️ HEARTS
  ===================================== */

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

      setTimeout(() => {
        h.remove();
      }, 8500);

    }

  }


  /* =====================================
     💌 OPEN BUTTON
  ===================================== */

  $("openBtn").onclick = () => {

    /*
      IMPORTANT:
      Browser ko user click mil gaya.
      Isliye audio elements ko yahin initialize
      kar rahe hain.
    */

    birthdaySong.load();
    hukumSong.load();
    tuChahiyeSong.load();

    show("countdown");

    heartsGo(20);

    let n = 20;

    $("number").textContent = n;
    $("minutes").textContent = "seconds left ❤️";
    $("progress").style.width = "0%";


    const timer = setInterval(() => {

      n--;

      $("number").textContent = n;


      if (n > 1) {

        $("minutes").textContent =
          "seconds left ❤️";

      }

      else if (n === 1) {

        $("minutes").textContent =
          "second left ❤️";

      }

      else {

        $("minutes").textContent = "❤️";

      }


      $("progress").style.width =
        ((20 - n) / 20 * 100) + "%";


      heartsGo(2);


      /* =================================
         🎂 COUNTDOWN FINISHED
         BIRTHDAY SONG STARTS
      ================================= */

      if (n <= 0) {

        clearInterval(timer);

        setTimeout(() => {

          show("birthday");

          heartsGo(35);

          playBirthdaySong();

          setTimeout(showMessages, 3300);

        }, 800);

      }

    }, 1000);

  };


  /* =====================================
     🎂 BIRTHDAY MESSAGES
  ===================================== */

  function showMessages() {

    show("messages");

    $("messageList").innerHTML = "";


    const messages = [

      "Happy Birthday, Aman! 🎂❤️",

      "May this year bring you peace, growth and lots of happiness. ✨",

      "May all the hard work you do finally pay off. 🫶",

      "Stay healthy, keep smiling and keep being your ridiculous self. 😂",

      "I hope you get everything you're working for. ❤️",

      "And yes... keep annoying me forever. 🙄❤️",

      "I love you, birthday boy. 🥺❤️"

    ];


    messages.forEach((message, index) => {

      setTimeout(() => {

        const div = document.createElement("div");

        div.className = "message";

        div.textContent = message;

        $("messageList").appendChild(div);

      }, index * 650);

    });


    setTimeout(() => {

      $("giftButton").classList.remove("hidden");

    }, messages.length * 650 + 500);

  }


  /* =====================================
     🎁 GIFT
  ===================================== */

  $("giftButton").onclick = () => {

    show("gift");

    heartsGo(20);

  };


  /* =====================================
     😂 TWIST
  ===================================== */

  function twist() {

    const lines = [

      "Wait...",

      "You seriously thought...",

      "I was going to copy your video for you? 😭",

      "Seriously, Aman? 😂",

      "You really thought THIS was the whole birthday surprise?😌❤️",

      "That was just the trailer."

    ];


    let i = 0;


    function nextLine() {

      if (i >= lines.length) {

        $("realButton").classList.remove("hidden");

        heartsGo(35);

        return;

      }


      $("twistText").style.opacity = 0;


      setTimeout(() => {

        $("twistText").textContent = lines[i];

        i++;

        $("twistText").style.opacity = 1;

        setTimeout(nextLine, 1400);

      }, 450);

    }


    nextLine();

  }


  $("giftEmoji").onclick = () => {

    show("twist");

    twist();

  };


  $("giftEmoji").onkeydown = event => {

    if (
      event.key === "Enter" ||
      event.key === " "
    ) {

      event.preventDefault();

      show("twist");

      twist();

    }

  };


  /* =====================================
     ❤️ REAL STORY
  ===================================== */

  $("realButton").onclick = () => {

    show("realStory");

    heartsGo(30);

  };


  /* =====================================
     🧑 AMAN.EXE
  ===================================== */

  $("amanFileButton").onclick = () => {

    show("amanFile");

    heartsGo(22);

  };


  /* =====================================
     ❤️ WHY SPECIAL
     🎵 HUKUM KA EKKA
  ===================================== */

  $("whyButton").onclick = () => {

    show("why");

    heartsGo(24);

    playHukumSong();

  };


  /* =====================================
     📖 STORY
  ===================================== */

  $("storyButton").onclick = () => {

    show("ourStory");

    heartsGo(25);

  };


  /* =====================================
     📸 MEMORIES
  ===================================== */

  $("memoriesButton").onclick = () => {

    show("memories");

    heartsGo(25);

  };


  /* =====================================
     💌 LETTER
     🎵 TU CHAHIYE
  ===================================== */

  $("letterButton").onclick = () => {

    show("letter");

    heartsGo(30);

    playTuChahiyeSong();

  };


  /* =====================================
     🎂 FINAL
  ===================================== */

  $("finalButton").onclick = () => {

    show("final");

    heartsGo(45);

  };


  /* =====================================
     👀 SECRET
  ===================================== */

  $("secretButton").onclick = () => {

    show("secret");

    heartsGo(60);

  };


  /* =====================================
     📸 IMAGE ERROR
  ===================================== */

  document
    .querySelectorAll(".gallery img")
    .forEach(img => {

      img.addEventListener("error", () => {

        const figure = img.closest("figure");

        if (figure) {
          figure.classList.add("missing");
        }

        img.alt =
          "Photo not found — check the filename in the photos folder.";

      });

    });


  /* =====================================
     ❤️ INITIAL HEARTS
  ===================================== */

  heartsGo(8);

});