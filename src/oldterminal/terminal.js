/**
 * AnderShell - Just a small CSS demo
 *(Modified by ShiftTGC)
 *
 * Copyright (c) 2011-2013, Anders Evenrud <andersevenrud@gmail.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
(function () {
  var $output;
  var _inited = false;
  var _locked = true;
  var _buffer = [];
  var _obuffer = [];
  var _ibuffer = [];
  var _cwd = "/";
  var _prompt = function () {
    return _cwd + " $ ";
  };
  var _history = [];
  var _hindex = -1;
  var _lhindex = -1;
  var nickWebberCV = `
Nicholas Webber | Fullstack Engineer
Location: South Wales, (Remote)
Email: nicholas.e.webber@hotmail.com

Professional Profile
________________

Motivated engineer with a creative approach, adept at problem-solving, and passionate about innovative solutions.
Technical competence and industry awareness drive the use of up-to-date programming foundations in agile development settings.

Core Skills
________________

* HTML5, SASS/SCSS
* React, TanStack
* .NET Core
* EF Core
* C#
* TypeScript
* Azure Services

Career Summary
________________

FullStack Engineer – Dstny Automate (Mar 2022 - Current)
Technologies used: React, TypeScript, SASS/SCSS, .NET Core, EF Core, C#, Azure Services
* Spearheaded the development of multiple SPA’s using React, incorporating efficient global state management for seamless user experiences.
* Implemented Microservices architecture, optimizing system scalability and maintainability.
* Successfully integrated APIs, enhancing the application's functionality and ensuring compatibility with diverse client requirements.
* Proficiently managed OAuth and secured user authentication, contributing to the overall system's robust security measures.
* Led the implementation of Automation Testing (TDD) practices, resulting in improved code reliability and development efficiency.

Front End Engineer – Qunifi (May 2021 - Mar 2022)
Technologies used: React, TypeScript, SASS/SCSS, .NET Core, EF Core, C#, Azure Services
* Spearheaded the development of a Single Page Application (SPA) using React, incorporating efficient global state management for seamless user experiences.

FullStack Developer – SourceCode Software Ltd (Jul 2020 - Feb 2021)
Technologies used: React JS, .NET 5, Entity Framework, C#, SQL
* Worked independently on multiple projects, demonstrating strong autonomy and adaptability within a small team.
* Applied modern coding libraries for the frontend, ensuring a flexible and reusable codebase for evolving client requirements.
* Successfully integrated third-party tools, such as EPO, OAuth, JWT, SMS & Email Services, to achieve project-specific requirements.
* Demonstrated expertise in backend development, handling business logic, request processing, file management, and database operations.

FullStack Developer – AMX Solutions Ltd (Jan 2017 - Jan 2020)
Technologies used: .NET MVC, AngularJs - Angular 6, Jquery, SQL, C#
* Played a key role in the enhancement and maintenance of legacy code through conversion, optimization, and refactoring strategies.
* Established scalable automated testing practices for headless requests, macros, and performance tests, contributing to code quality improvements.
* Ensured fluid layout practices and multi-browser/mobile support for frontend development, emphasizing accessibility certification.
* Conducted in-depth database analysis, error handling, and implemented reusable code adhering to high coding standards.

Education
________________

Level 4 Software and Web Development Apprenticeship (2018–August 2019)
Level 4 Software and Web Development (Pass)

Level 3 Software and Web Development Apprenticeship (2017–2018)
Level 3 Software and Web Development (Distinct *)

A Levels, Cabot Federation Sixth Form (2014 – 2016)
A2 Media Studies (B)
Level 3 Forensic Science (Applied Science) (Distinct *)
A2 OCR Level 3 ICT Cambridge Technical (Merit)

References available on request
________________`;

  var _filetree = {
    CV: {
      type: "dir",
      files: {
        NICKWEBBER: {
          type: "file",
          mime: "text/plain",
          content: nickWebberCV,
        },
      },
    },
    PROJECTS: {
      type: "dir",
      files: {},
    },
    CREDITS: {
      type: "dir",
      files: {
        AUTHORS: {
          type: "file",
          mime: "text/plain",
          content:
            "Created by Anders Evenrud <andersevenrud@gmail.com>\nModified by Nick Webber\n\nThis is a demo using CSS only for graphics (no images), and JavaScript for a basic command line",
        },
        TEST: {
          type: "file",
          mime: "text/plain",
          content: "This is a small test",
        },
        README: {
          type: "file",
          mime: "text/plain",
          content:
            "All you see here is CSS. No images were used or harmed in creation of this demo",
        },
        LICENSE: {
          type: "file",
          mime: "text/plain",
          content:
            'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
        },
      },
    },
  };

  var _commands = {
    SOUND: function (volume, duration, freq) {
      if (!window.webkitAudioContext) {
        return ["Your browser does not support his feature."];
      }

      volume = (volume || "").replace(/[^0-9]/g, "") << 0 || 100;
      duration = (duration || "").replace(/[^0-9]/g, "") << 0 || 1;
      freq = (freq || "").replace(/[^0-9]/g, "") << 0 || 1000;

      var context = new webkitAudioContext();
      var osc = context.createOscillator();
      var vol = context.createGainNode();

      vol.gain.value = volume / 100;
      osc.frequency.value = freq;
      osc.connect(vol);
      vol.connect(context.destination);
      osc.start(context.currentTime);

      setTimeout(function () {
        osc.stop();
        osc = null;
        context = null;
        vol = null;
      }, duration * 1000);

      return [
        "Volume:    " + volume,
        "Duration:  " + duration,
        "Frequenzy: " + freq,
      ].join("\n");
    },

    LS: function (dir) {
      dir = parsepath(dir || _cwd);

      var out = [];
      var iter = getiter(dir);

      var p;
      var tree = iter && iter.type == "dir" ? iter.files : _filetree;
      var count = 0;
      var total = 0;

      for (var i in tree) {
        if (tree.hasOwnProperty(i)) {
          p = tree[i];
          if (p.type == "dir") {
            out.push(
              format(
                "{0} {1} {2}",
                padRight("<" + i + ">", 20),
                padRight(p.type, 20),
                "0"
              )
            );
          } else {
            out.push(
              format(
                "{0} {1} {2}",
                padRight(i, 20),
                padRight(p.mime, 20),
                p.content.length
              )
            );
            total += p.content.length;
          }
          count++;
        }
      }

      out.push(format("\n{0} file(s) in total, {1} byte(s)", count, total));

      return out.join("\n");
    },

    CD: function (dir) {
      if (!dir) {
        return ["You need to supply argument: dir"].join("\n");
      }

      var dirname = parsepath(dir);
      var iter = getiter(dirname);
      if (dirname == "/" || (iter && iter.type == "dir")) {
        _cwd = dirname;
        return ["Entered: " + dirname].join("\n");
      }

      return ["Path not found: " + dirname].join("\n");
    },

    CAT: function (file) {
      if (!file) {
        return ["You need to supply argument: filename"].join("\n");
      }

      var filename = parsepath(file);
      var iter = getiter(filename);
      if (!iter) {
        return ["File not found: " + filename].join("\n");
      }

      return iter.content;
    },

    CWD: function () {
      return ["Current directory: " + _cwd].join("\n");
    },

    CLEAR: function () {
      return false;
    },

    CLS: function () {
      return false;
    },

    CONTACT: function (key) {
      key = key || "";
      var out = [];

      switch (key.toLowerCase()) {
        case "email":
          window.open("mailto:nicholas.e.webber@hotmail.com");
          break;
        case "github":
          window.open("https://github.com/NickersWeb");
          break;
        case "linkedin":
          window.open("http://www.linkedin.com/in/andersevenrud");
          break;
        case "youtube":
          window.open("https://www.youtube.com/user/andersevenrud");
          break;
        case "twitter":
          window.open("https://twitter.com/#!/andersevenrud");
          break;
        default:
          if (key.length) {
            out = ["Invalid key: " + key];
          } else {
            out = [
              "Contact information:\n",
              "Name:      Nick Webber",
              "Email:     nicholas.e.webber@hotmail.com",
              "Github:    https://github.com/NickersWeb",
              "LinkedIn:  https://uk.linkedin.com/in/nick-w-6163b322a",
              "YouTube:   None",
              "Twitter:   None",
            ];
          }
          break;
      }

      return out.join("\n").toUpperCase();
    },

    HELP: function () {
      var out = [
        "help                                         This command",
        "contact                                      How to contact author",
        "contact <key>                                Open page (example: `email`)",
        "clear/cls                                    Clears the screen",
        "ls                                           List current (or given) directory contents",
        "cd <dir>                                     Enter directory",
        "cat <filename>                               Show file contents",
        "sound [<volume 0-100>, <duration>, <freq>]   Generate a sound (WebKit only)",
        "",
      ];

      return out.join("\n").toUpperCase();
    },
  };

  /////////////////////////////////////////////////////////////////
  // UTILS
  /////////////////////////////////////////////////////////////////

  function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd("character", selectionEnd);
      range.moveStart("character", selectionStart);
      range.select();
    }
  }

  function format(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    var sprintfRegex = /\{(\d+)\}/g;

    var sprintf = function (match, number) {
      return number in args ? args[number] : match;
    };

    return format.replace(sprintfRegex, sprintf);
  }

  function padRight(str, l, c) {
    return str + Array(l - str.length + 1).join(c || " ");
  }

  function padCenter(str, width, padding) {
    var _repeat = function (s, num) {
      for (var i = 0, buf = ""; i < num; i++) buf += s;
      return buf;
    };

    padding = (padding || " ").substr(0, 1);
    if (str.length < width) {
      var len = width - str.length;
      var remain = len % 2 == 0 ? "" : padding;
      var pads = _repeat(padding, parseInt(len / 2));
      return pads + str + pads + remain;
    }

    return str;
  }

  function parsepath(p) {
    var dir = (p.match(/^\//) ? p : _cwd + "/" + p).replace(/\/+/g, "/");
    return realpath(dir) || "/";
  }

  function getiter(path) {
    var parts = (path.replace(/^\//, "") || "/").split("/");
    var iter = null;

    var last = _filetree;
    while (parts.length) {
      var i = parts.shift();
      if (!last[i]) break;

      if (!parts.length) {
        iter = last[i];
      } else {
        last = last[i].type == "dir" ? last[i].files : {};
      }
    }

    return iter;
  }

  function realpath(path) {
    var parts = path.split(/\//);
    var path = [];
    for (var i in parts) {
      if (parts.hasOwnProperty(i)) {
        if (parts[i] == ".") {
          continue;
        }

        if (parts[i] == "..") {
          if (path.length) {
            path.pop();
          }
        } else {
          path.push(parts[i]);
        }
      }
    }

    return path.join("/");
  }

  window.requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();

  /////////////////////////////////////////////////////////////////
  // SHELL
  /////////////////////////////////////////////////////////////////

  (function animloop() {
    requestAnimFrame(animloop);

    if (_obuffer.length) {
      $output.value += _obuffer.shift();
      _locked = true;

      update();
    } else {
      if (_ibuffer.length) {
        $output.value += _ibuffer.shift();

        update();
      }

      _locked = false;
      _inited = true;
    }
  })();

  function print(input, lp) {
    update();
    _obuffer = _obuffer.concat(lp ? [input] : input.split(""));
  }

  function update() {
    //$output.focus();
    // var l = $output.value.length;
    // //setSelectionRange($output, l, l);
    // $output.scrollTop = $output.scrollHeight;
  }

  function clear() {
    $output.value = "";
    _ibuffer = [];
    _obuffer = [];
    print("");
  }

  function command(cmd) {
    print("\n");
    if (cmd.length) {
      var a = cmd.split(" ");
      var c = a.shift();
      if (c in _commands) {
        var result = _commands[c].apply(_commands, a);
        if (result === false) {
          clear();
        } else {
          print(result.toUpperCase() || "\n", true);
        }
      } else {
        print("Unknown command: " + c);
      }

      _history.push(cmd);
    }
    print("\n\n" + _prompt());

    _hindex = -1;
  }

  function nextHistory() {
    if (!_history.length) return;

    var insert;
    if (_hindex == -1) {
      _hindex = _history.length - 1;
      _lhindex = -1;
      insert = _history[_hindex];
    } else {
      if (_hindex > 1) {
        _lhindex = _hindex;
        _hindex--;
        insert = _history[_hindex];
      }
    }

    if (insert) {
      if (_lhindex != -1) {
        var txt = _history[_lhindex];
        $output.value = $output.value.substr(
          0,
          $output.value.length - txt.length
        );
        update();
      }
      _buffer = insert.split("");
      _ibuffer = insert.split("");
    }
  }

  window.onload = function () {
    $output = document.getElementById("output");
    $output.contentEditable = true;
    $output.spellcheck = false;
    $output.value = "";

    $output.onkeydown = function (ev) {
      var k = ev.which || ev.keyCode;
      var cancel = false;

      if (!_inited) {
        cancel = true;
      } else {
        if (k == 9) {
          cancel = true;
        } else if (k == 38) {
          nextHistory();
          cancel = true;
        } else if (k == 40) {
          cancel = true;
        } else if (k == 37 || k == 39) {
          cancel = true;
        }
      }

      if (cancel) {
        ev.preventDefault();
        ev.stopPropagation();
        return false;
      }

      if (k == 8) {
        if (_buffer.length) {
          _buffer.pop();
        } else {
          ev.preventDefault();
          return false;
        }
      }

      return true;
    };

    $output.onkeypress = function (ev) {
      ev.preventDefault();
      if (!_inited) {
        return false;
      }

      var k = ev.which || ev.keyCode;
      if (k == 13) {
        var cmd = _buffer.join("").replace(/\s+/, " ");
        _buffer = [];
        command(cmd);
      } else {
        if (!_locked) {
          var kc = String.fromCharCode(k).toUpperCase();
          _buffer.push(kc);
          _ibuffer.push(kc);
        }
      }

      return true;
    };

    $output.onfocus = function () {
      update();
    };

    $output.onblur = function () {
      update();
    };

    window.onfocus = function () {
      update();
    };

    print("WELCOME TO NICKCO INDUSTRIES (TM) TERMLINK\n\n");
    print(">SET TERMINAL/INQUIRE\n\n");
    print("RX-9000\n\n");
    print(">SET FILE/PROTECTION=OWNER:RWED ACCOUNTS.F\n\n");
    print(">SET HALT RESTART/MAINT\n\n");
    print("Initializing NickCo Industries (TM) MF Boot Agent v2.3.0\n");
    print("RETROS BIOS\n");
    print("RBIOS-4.02.08.00 52EE5.E7.E8\n");
    print("Copyright 2024-2026 NickCo Ind.\n");
    print("Uppermem: 1024 KB\n");
    print("Root (5A8)\n");
    print("Maintenance Mode\n\n");
    print(">RUN DEBUG/ACCOUNTS.F");

    setTimeout(() => {
      clear();
      print(
        `
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
ALL GRAPHICS ARE CREATED USING CSS, NO STATIC FILES OR IMAGES.
----------------------------------------------------------------------------------

TYPE 'HELP' FOR A LIST OF AVAILABLE COMMANDS.
> `,
        true
      );
      print(nickWebberCV, true);
    }, 0 * 1000);
  };
})();
