/**
 * AnderShell - Just a small CSS demo
 *(Modified by Nick Webber, previously ShiftTGC)
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
// export default class Terminal {
//     private readonly output: HTMLTextAreaElement;
// private readonly init: boolean;
// protected readonly buffer: string[];

// constructor(container: HTMLTextAreaElement){
//     this.output = container;
//     this.output.contentEditable = 'true';
//     this.output.spellcheck = false;
    
//     this.output.onkeydown = function (ev) {
//           const k = parseInt(ev.key);
//           let cancel = false;
    
//           if (!this.init) {
//             cancel = true;
//           } else {
//             if (k == 9) {
//               cancel = true;
//             } else if (k == 38) {
//               nextHistory();
//               cancel = true;
//             } else if (k == 40) {
//               cancel = true;
//             } else if (k == 37 || k == 39) {
//               cancel = true;
//             }
//           }
    
//           if (cancel) {
//             ev.preventDefault();
//             ev.stopPropagation();
//             return false;
//           }
    
//           if (k == 8) {
//             if ( _buffer.length) {
//               _buffer.pop();
//             } else {
//               ev.preventDefault();
//               return false;
//             }
//           }
    
//           return true;
//         };
    
//         $output.onkeydown = function (ev) {
//           ev.preventDefault();
//           if (!_inited) {
//             return false;
//           }
    
//           var k = ev.which || ev.keyCode;
//           if (k == 13) {
//             var cmd = _buffer.join("").replace(/\s+/, " ");
//             _buffer = [];
//             command(cmd);
//           } else {
//             if (!_locked) {
//               var kc = String.fromCharCode(k).toUpperCase();
//               _buffer.push(kc);
//               _ibuffer.push(kc);
//             }
//           }
    
//           return true;
//         };
    
//         $output.onfocus = function () {
//           update();
//         };
    
//         $output.onblur = function () {
//           update();
//         };
    
//         window.onfocus = function () {
//           update();
//         };
    
//         print("WELCOME TO NICKCO INDUSTRIES (TM) TERMLINK\n\n");
//         print(">SET TERMINAL/INQUIRE\n\n");
//         print("RX-9000\n\n");
//         print(">SET FILE/PROTECTION=OWNER:RWED ACCOUNTS.F\n\n");
//         print(">SET HALT RESTART/MAINT\n\n");
//         print("Initializing NickCo Industries (TM) MF Boot Agent v2.3.0\n");
//         print("RETROS BIOS\n");
//         print("RBIOS-4.02.08.00 52EE5.E7.E8\n");
//         print("Copyright 2024-2026 NickCo Ind.\n");
//         print("Uppermem: 1024 KB\n");
//         print("Root (5A8)\n");
//         print("Maintenance Mode\n\n");
//         print(">RUN DEBUG/ACCOUNTS.F");
//         setTimeout(() => {
//           clear();
//           print(
//             `	
//     .............................................................................
                    
//     @@@@@@@    @@@@@@   @@@@@@@   @@@@@@@  @@@@@@@@   @@@@@@   @@@       @@@   @@@@@@   
//     @@@@@@@@  @@@@@@@@  @@@@@@@@  @@@@@@@  @@@@@@@@  @@@@@@@@  @@@       @@@  @@@@@@@@  
//     @@!  @@@  @@!  @@@  @@!  @@@    @@!    @@!       @@!  @@@  @@!       @@!  @@!  @@@  
//     !@!  @!@  !@!  @!@  !@!  @!@    !@!    !@!       !@!  @!@  !@!       !@!  !@!  @!@  
//     @!@@!@!   @!@  !@!  @!@!!@!     @!!    @!!!:!    @!@  !@!  @!!       !!@  @!@  !@!  
//     !!@!!!    !@!  !!!  !!@!@!      !!!    !!!!!:    !@!  !!!  !!!       !!!  !@!  !!!  
//     !!:       !!:  !!!  !!: :!!     !!:    !!:       !!:  !!!  !!:       !!:  !!:  !!!  
//     :!:       :!:  !:!  :!:  !:!    :!:    :!:       :!:  !:!  :!:       :!:  :!:  !:!  
//     ::        ::::: ::  ::   :::    ::     ::        ::::: ::  :: ::::   ::   ::::: ::  
//     :         : :  :    :   : :     :      :         : :  :   : :: : :   :     : :  :   
                    
//     -----------------------------------------------------------------------------
//     ALL GRAPHICS ARE CREATED USING CSS, NO STATIC FILES OR IMAGES.
//     -----------------------------------------------------------------------------
                    
                                
//     TYPE 'HELP' FOR A LIST OF AVAILABLE COMMANDS.
//     > `,
//             true
//           );
//         }, 8 * 1000);
      
// }
// }
 (function () {

    let $output: HTMLTextAreaElement;
    var _inited = false;
    var _locked = true;
    var _buffer: string[] = [];
    var _obuffer: any[] = [];
    var _ibuffer: string[] = [];
    var _cwd = "/";
    var _prompt = function () {
      return _cwd + " $ ";
    };
    var _history: any[] = [];
    var _hindex = -1;
    var _lhindex = -1;
  
    var _filetree = {
      "C.V.": {
        type: "dir",
        files: {
          "Nicholas Webber C.V.": {
            type: "file",
            mime: "text/plain",
            content: "This is just an example file",
          },
          example2: {
            type: "file",
            mime: "text/plain",
            content: "This is just an example file. What did you think it was?",
          },
          example3: {
            type: "file",
            mime: "text/plain",
            content: "This is just an example file. I'm super cereal!",
          },
          example4: {
            type: "file",
            mime: "text/plain",
            content: "This is just an example file. Such wow!",
          },
          example5: {
            type: "file",
            mime: "text/plain",
            content: "This is just an example file. Jelly much?",
          },
        },
      },
      PROJECTS: {
        type: "dir",
        files: {
          AUTHORS: {
            type: "file",
            mime: "text/plain",
            content:
              "Created by Anders Evenrud <andersevenrud@gmail.com>\n\nThis is a demo using CSS only for graphics (no images), and JavaScript for a basic command line",
          },
        },
      },
      credits: {
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
      SOUND: function (volume: string | number, duration: string | number, freq: string | number) {
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
  
      LS: function (dir?: string) {
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
  
      CD: function (dir?: string) {
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
  
      CAT: function (file?:string) {
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
  
      CONTACT: function (key: string) {
        key = key || "";
        var out: any[] = [];
  
        switch (key.toLowerCase()) {
          case "email":
            window.open("mailto:andersevenrud@gmail.com");
            break;
          case "github":
            window.open("https://github.com/andersevenrud/");
            break;
          case "linkedin":
            window.open("http://www.linkedin.com/in/andersevenrud");
            break;
          case "youtube":
            window.open("https://www.youtube.com/user/andersevenrud");
            break;
          case "worpress":
            window.open("http://anderse.wordpress.com/");
            break;
          case "twitter":
            window.open("https://twitter.com/#!/andersevenrud");
            break;
          case "FoE":
            window.open("http://Fallout-Equestria.weebly.com");
            break;
          case "google+":
            window.open(
              "https://profiles.google.com/101576798387217383063?rel=author"
            );
            break;
          case "foe":
            window.open("http://Fallout-Equestria.weebly.com");
            break;
  
          default:
            if (key.length) {
              out = ["Invalid key: " + key];
            } else {
              out = [
                "Contact information:\n",
                "Name:      Anders Evenrud",
                "Email:     andersevenrud@gmail.com",
                "Github:    https://github.com/andersevenrud/",
                "LinkedIn:  http://www.linkedin.com/in/andersevenrud",
                "YouTube:   https://www.youtube.com/user/andersevenrud",
                "Wordpress: http://anderse.wordpress.com/",
                "Twitter:   https://twitter.com/#!/andersevenrud",
                "Google+:   https://profiles.google.com/101576798387217383063?rel=author",
                "FoE:       http://Fallout-Equestria.weebly.com",
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
  
    window.onload = function () {
        $output = document.getElementById("output") as HTMLTextAreaElement;
        $output.contentEditable = 'true';
        $output.spellcheck = false;
    
        $output.onkeydown = function (ev) {
          var k = parseInt(ev.key);
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
    
        $output.onkeydown = function (ev) {
          ev.preventDefault();
          if (!_inited) {
            return false;
          }
    
          var k = parseInt(ev.key);
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
    .............................................................................
                    
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
                    
    -----------------------------------------------------------------------------
    ALL GRAPHICS ARE CREATED USING CSS, NO STATIC FILES OR IMAGES.
    -----------------------------------------------------------------------------
                    
                                
    TYPE 'HELP' FOR A LIST OF AVAILABLE COMMANDS.
    > `,
            true
          );
        }, 8 * 1000);
      };

    /////////////////////////////////////////////////////////////////
    // UTILS
    /////////////////////////////////////////////////////////////////
  
    function setSelectionRange(input: HTMLTextAreaElement, selectionStart: any, selectionEnd: any) {
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
  
    function format(format: string) {
      var args = Array.prototype.slice.call(arguments, 1);
      var sprintfRegex = /\{(\d+)\}/g;
  
      var sprintf = function (match: any, number: string) {
        return number in args ? args[number] : match;
      };
  
      return format.replace(sprintfRegex, sprintf);
    }
  
    function padRight(str: string | any[], l: number, c: undefined) {
      return str + Array(l - str.length + 1).join(c || " ");
    }
  
    // function padCenter(str: string | any[], width: number, padding: any) {
    //   var _repeat = function (s: string, num: number) {
    //     for (var i = 0, buf = ""; i < num; i++) buf += s;
    //     return buf;
    //   };
  
    //   padding = (padding || " ").substr(0, 1);
    //   if (str.length < width) {
    //     var len = width - str.length;
    //     var remain = len % 2 == 0 ? "" : padding;
    //     var pads = _repeat(padding, parseInt(len / 2));
    //     return pads + str + pads + remain;
    //   }
  
    //   return str;
    // }
  
    function parsepath(p: string) {
      var dir = (p.match(/^\//) ? p : _cwd + "/" + p).replace(/\/+/g, "/");
      return realpath(dir) || "/";
    }
  
    function getiter(path?: string) {
        if (!path) {
            return;
        }
      var parts = (path.replace(/^\//, "") || "/").split("/");
      var iter = null;
  
      var last = _filetree;
      while (parts.length) {
        var i = parts.shift();
        if (i && !last[i]) break;
  
        if (!parts.length) {
          iter = last[i];
        } else {
          last = last[i].type == "dir" ? last[i].files : {};
        }
      }
  
      return iter;
    }
  
    function realpath(path: never[]) {
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
        function (callback: TimerHandler) {
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
  
    function print(input: string, lp = false) {
      update();
      _obuffer = _obuffer.concat(lp ? [input] : input.split(""));
    }
  
    function update() {
      $output.focus();
      var l = $output.value.length;
      setSelectionRange($output, l, l);
      $output.scrollTop = $output.scrollHeight;
    }
  
    function clear() {
      $output.value = "";
      _ibuffer = [];
      _obuffer = [];
      print("");
    }
  
    function command(cmd: string) {
      print("\n");
      if (cmd.length) {
        var a = cmd.split(" ");
        var c = a.shift();
        if (c  && c in _commands) {
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
  })();
  