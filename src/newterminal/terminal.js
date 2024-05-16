import $ from "jquery";
import JQTerminal from "jquery.terminal";

JQTerminal(window, $);

$(function ($, undefined) {
  var scanlines = $(".scanlines");
  var tv = $(".tv");
  function exit() {
    $(".tv").addClass("collapse");
    term.disable();
  }

  // ref: https://stackoverflow.com/q/67322922/387194
  var __EVAL = (s) => eval(`void (__EVAL = ${__EVAL}); ${s}`);

  var term = $("#terminal").terminal(
    function (command, term) {
      var cmd = $.terminal.parse_command(command);
      if (cmd.name === "exit") {
        exit();
      } else if (cmd.name === "echo") {
        term.echo(cmd.rest);
      } else if (command !== "") {
        try {
          var result = __EVAL(command);
          if (result && result instanceof $.fn.init) {
            term.echo("<#jQuery>");
          } else if (result && typeof result === "object") {
            tree(result);
          } else if (result !== undefined) {
            term.echo(new String(result));
          }
        } catch (e) {
          term.error(new String(e));
        }
      }
    },
    {
      greetings: "",
      name: "js_demo",
      onResize: set_size,
      exit: false,
      // detect iframe codepen preview
      enabled: $("body").attr("onload") === undefined,
      onInit: async function (t) {
        set_size();
        //this.echo("");
        //typeEffect(t, "testing123", 0);

        typeEffect(t, "WELCOME TO NICKCO INDUSTRIES (TM) TERMLINK\n\n").then(
          () => typeEffect(t, ">SET TERMINAL/INQUIRE\n\n")
        );
        // typeEffect(t, "RX-9000\n\n");
        // typeEffect(t, ">SET FILE/PROTECTION=OWNER:RWED ACCOUNTS.F\n\n");
        // typeEffect(t, ">SET HALT RESTART/MAINT\n\n");
        // typeEffect(
        //   t,
        //   "Initializing NickCo Industries (TM) MF Boot Agent v2.3.0\n"
        // );
        // typeEffect(t, "RETROS BIOS\n");
        // typeEffect(t, "RBIOS-4.02.08.00 52EE5.E7.E8\n");
        // typeEffect(t, "Copyright 2024-2026 NickCo Ind.\n");
        // typeEffect(t, "Uppermem: 1024 KB\n");
        // typeEffect(t, "Root (5A8)\n");
        // typeEffect(t, "Maintenance Mode\n\n");
        // typeEffect(t, ">RUN DEBUG/ACCOUNTS.F");
        // this.echo("Type [[b;#fff;]exit] to see turn off animation.");
        // this.echo(
        //   "Type and execute [[b;#fff;]grab()] function to get the scre" +
        //     "enshot from your camera"
        // );
        // this.echo(
        //   "Type [[b;#fff;]camera()] to get video and [[b;#fff;]pause()]/[[b;#fff;]play()] to stop/play"
        // );
      },
      onClear: function () {
        console.log(this.find("video").length);
        this.find("video").map(function () {
          console.log(this.src);
          return this.src;
        });
      },
      prompt: "> ",
    }
  );

  // for codepen preview
  if (!term.enabled()) {
    term.find(".cursor").addClass("blink");
  }

  async function typeEffect(term, message, index = 0) {
    if (index < message.length) {
      await term.echo(message[index], { newline: false }); // Insert the next character
      setTimeout(async function () {
        await typeEffect(term, message, index + 1); // Call the function again with the next index
      }, 95); // Adjust the delay as needed (in milliseconds)
    }
  }

  function set_size() {
    // for window height of 170 it should be 2s
    var height = $(window).height();
    var width = $(window).width();
    var time = (height * 2) / 170;
    scanlines[0].style.setProperty("--time", time);
    tv[0].style.setProperty("--width", width);
    tv[0].style.setProperty("--height", height);
  }

  function tree(obj) {
    term.echo(treeify.asTree(obj, true, true));
  }
  var constraints = {
    audio: false,
    video: {
      width: { ideal: 1280 },
      height: { ideal: 1024 },
      facingMode: "environment",
    },
  };
  var acceptStream = (function () {
    return "srcObject" in document.createElement("video");
  })();

  function camera() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      term.pause();
      var media = navigator.mediaDevices.getUserMedia(constraints);
      media.then(function (mediaStream) {
        term.resume();
        var stream;
        if (!acceptStream) {
          stream = window.URL.createObjectURL(mediaStream);
        } else {
          stream = mediaStream;
        }
        term.echo('<video data-play="true" class="self"></video>', {
          raw: true,
          onClear: function () {
            if (!acceptStream) {
              URL.revokeObjectURL(stream);
            }
            mediaStream.getTracks().forEach((track) => track.stop());
          },
          finalize: function (div) {
            var video = div.find("video");
            if (!video.length) {
              return;
            }
            if (acceptStream) {
              video[0].srcObject = stream;
            } else {
              video[0].src = stream;
            }
            if (video.data("play")) {
              video[0].play();
            }
          },
        });
      });
    }
  }

  var play = function () {
    var video = term.find("video").slice(-1);
    if (video.length) {
      video[0].play();
    }
  };

  function pause() {
    term.find("video").each(function () {
      this.pause();
    });
  }

  function grab() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      term.pause();
      var media = navigator.mediaDevices.getUserMedia(constraints);
      media
        .then(function (mediaStream) {
          const mediaStreamTrack = mediaStream.getVideoTracks()[0];
          const imageCapture = new ImageCapture(mediaStreamTrack);
          return imageCapture.takePhoto();
        })
        .then(function (blob) {
          term
            .echo(
              '<img src="' + URL.createObjectURL(blob) + '" class="self"/>',
              {
                raw: true,
                finialize: function (div) {
                  div.find("img").on("load", function () {
                    URL.revokeObjectURL(this.src);
                  });
                },
              }
            )
            .resume();
        })
        .catch(function (error) {
          term.error("Device Media Error: " + error);
        });
    }
  }

  async function pictuteInPicture() {
    var [video] = $("video");
    try {
      if (video) {
        if (video !== document.pictureInPictureElement) {
          await video.requestPictureInPicture();
        } else {
          await document.exitPictureInPicture();
        }
      }
    } catch (error) {
      term.error(error);
    }
  }
  function clear() {
    term.clear();
  }

  cssVars(); // ponyfill
});
