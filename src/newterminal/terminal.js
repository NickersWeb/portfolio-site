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
      const { name, rest } = $.terminal.parse_command(command);

      switch (name) {
        case "exit":
          exit();
          break;
        case "echo":
          term.echo(rest);
          break;
        default:
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
          break;
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
        await typeEffect(t, "WELCOME TO NICKCO INDUSTRIES (TM) TERMLINK\n\n");
        await typeEffect(t, ">SET TERMINAL/INQUIRE\n\n");
        await typeEffect(t, "RX-9000\n\n");
        await typeEffect(t, ">SET FILE/PROTECTION=OWNER:RWED ACCOUNTS.F\n\n");
        await typeEffect(t, ">SET HALT RESTART/MAINT\n\n");
        await typeEffect(
          t,
          "Initializing NickCo Industries (TM) MF Boot Agent v2.3.0\n"
        );
        await typeEffect(t, "RETROS BIOS\n");
        await typeEffect(t, "RBIOS-4.02.08.00 52EE5.E7.E8\n");
        await typeEffect(
          t,
          `Copyright 1998-${new Date().getFullYear()} NickCo Ind.\n`
        );
        await typeEffect(t, "Uppermem: 1024 KB\n");
        await typeEffect(t, "Root (5A8)\n");
        await typeEffect(t, "Maintenance Mode\n\n");
        await typeEffect(t, ">RUN DEBUG/ACCOUNTS.F");

        setTimeout(() => {
          t.clear();
          t.echo(`
..................................................................................

@@@@@@@    @@@@@@   @@@@@@@   @@@@@@@  @@@@@@@@   @@@@@@   @@@       @@@   @@@@@@
@@@@@@@@  @@@@@@@@  @@@@@@@@  @@@@@@@  @@@@@@@@  @@@@@@@@  @@@       @@@  @@@@@@@@
@@!  @@@  @@!  @@@  @@!  @@@    @@!    @@!       @@!  @@@  @@!       @@!  @@!  @@@
!@!  @!@  !@!  @!@  !@!  @!@    !@!    !@!       !@!  @!@  !@!       !@!  !@!  @!@
@!@@!@!   @!@  !@!  @!@!!@!     @!!    @!!!:!    @!@  !@!  @!!       !!@  @!@  !@!
!!@!!!    !@!  !!!  !!@!@!      !!!    !!!!!:    !@!  !!!  !!!       !!!  !@!  !!!
!!:       !!:  !!!  !!: :!!     !!:    !!:       !!:  !!!  !!:       !!:  !!:  !!!
:!:       :!:  !:!  :!:  !:!    :!:    :!:       :!:  !:!  :!:       :!:  :!:  !:!
::        ::::: ::  ::   :::    ::     ::        ::::: ::  :: ::::   ::   ::::: ::
:         : :  :    :   : :     :      :         : :  :   : :: : :   :     : :  :

----------------------------------------------------------------------------------
NO BUGS WERE HARMED IN THE CREATION OF THIS SITE.
----------------------------------------------------------------------------------

TYPE 'HELP' FOR A LIST OF AVAILABLE COMMANDS.`);
        }, 250);
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

      return new Promise((res) => {
        setTimeout(() => {
          res(typeEffect(term, message, index + 1)); // Call the function again with the next index
        }, 25); // Adjust the delay as needed (in milliseconds)
      });
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
});
