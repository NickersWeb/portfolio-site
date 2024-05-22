import $ from "jquery";
import JQTerminal from "jquery.terminal";

JQTerminal(window, $);
interface FileTree {
  [key: string]: Directory | File;
}

interface Directory {
  type: "dir";
  files: FileTree;
}

interface File {
  type: "file";
  mime: string;
  content: string;
}

$(function ($) {
  var _cwd = "/";
  var scanlines = $(".scanlines");
  var tv = $(".tv");
  function exit() {
    $(".tv").addClass("collapse");
    term.disable();
  }
  const _filetree: FileTree = {
    CV: {
      type: "dir",
      files: {
        NICKWEBBER: {
          type: "file",
          mime: "text/plain",
          content: `
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
________________`,
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

  const realpath = (path: string) => {
    var parts = path.split(/\//);
    var newPath: string[] = [];
    for (var i in parts) {
      if (parts.hasOwnProperty(i)) {
        if (parts[i] == ".") {
          continue;
        }

        if (parts[i] == "..") {
          if (path.length) {
            newPath.pop();
          }
        } else {
          newPath.push(parts[i]);
        }
      }
    }

    return newPath.join("/");
  };

  const parsepath = (p: string) => {
    var dir = (p.match(/^\//) ? p : _cwd + "/" + p).replace(/\/+/g, "/");
    return realpath(dir) || "/";
  };

  const getiter = (path: string) => {
    var parts = (path.replace(/^\//, "") || "/").split("/");
    var iter = null;

    var last = _filetree;
    while (parts.length) {
      var i = parts.shift();

      if (!i) {
        return;
      }

      if (!last[i]) break;

      if (!parts.length) {
        iter = last[i];
      } else {
        //@ts-ignore
        last = last[i].type == "dir" ? last[i].files : {};
      }
    }

    return iter;
  };

  // const format = (format) => {
  //   var args = Array.prototype.slice.call(arguments, 1);
  //   var sprintfRegex = /\{(\d+)\}/g;

  //   var sprintf = function (match, number) {
  //     return number in args ? args[number] : match;
  //   };

  //   return format.replace(sprintfRegex, sprintf);
  // };

  const padRight = (str: string, l: number) => {
    return str + Array(l - str.length + 1).join(" ");
  };

  var term = $("#terminal").terminal(
    function (command, term) {
      const cmd = $.terminal.parse_command(command);
      const { name, rest } = cmd;

      switch (name.toLowerCase()) {
        case "help":
          var out = [
            "help                                         This command",
            "contact                                      How to contact author",
            "clear/cls                                    Clears the screen",
            "ls                                           List current (or given) directory contents",
            "cd <dir>                                     Enter directory",
            "cat <filename>                               Show file contents",
            "sound [<volume 0-100>, <duration>, <freq>]   Generate a sound (WebKit only)",
            "",
          ];

          term.echo(out.join("\n").toUpperCase());
          break;
        case "cat":
          if (!rest) {
            term.echo(`You need to supply argument: filename \n`);
            return;
          }

          var filename = parsepath(rest);
          var iter = getiter(filename);
          if (!iter) {
            term.echo(`File not found: ${filename} \n`);
            return;
          }

          //@ts-ignore
          term.echo(iter.content);
          break;
        case "cd":
          if (!rest) {
            term.echo("You need to supply argument: dir \n");
            return;
          }

          var dirname = parsepath(rest);
          var iter = getiter(dirname);
          if (dirname == "/" || (iter && iter.type == "dir")) {
            _cwd = dirname;
            term.echo(`Entered: ${dirname} \n`);
            return;
          }
          term.echo(`Path not found: ${dirname} \n`);
          break;
        case "ls":
          const dir = parsepath(rest || _cwd);

          var out: string[] = [];
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
                  `${padRight("<" + i + ">", 20)} ${padRight(p.type, 20)} 0`
                );
              } else {
                out.push(
                  `${padRight(i, 20)} ${padRight(p.mime, 20)} ${
                    p.content.length
                  }`
                );
                total += p.content.length;
              }
              count++;
            }
          }

          out.push("\n");
          out.push(`${count} file(s) in total, ${total} byte(s)`);

          term.echo(out.join("\n"));
          break;
        case "contact":
          term.echo(
            [
              "Contact information:\n",
              "Name:      Nick Webber",
              "Email:     nicholas.e.webber@hotmail.com",
              "Github:    https://github.com/NickersWeb",
              "LinkedIn:  https://uk.linkedin.com/in/nick-w-6163b322a",
              "YouTube:   None",
              "Twitter:   None",
            ]
              .join("\n")
              .toUpperCase()
          );
          break;
        case "clear":
        case "cls":
          term.clear();
          break;
        case "exit":
          exit();
          break;
        case "echo":
          term.echo(rest);
          break;
        default:
          term.error(`Command: ${name} does not exist.`);
          break;
      }
    },
    {
      greetings: "",
      name: "js_demo",
      onResize: set_size,
      exit: false,
      //@ts-ignore
      onInit: async (t) => {
        set_size();

        //https://terminal.jcubic.pl/examples.php#user-typing
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
        }, 750);
      },
      prompt: "> ",
    }
  );

  // for codepen preview
  if (!term.enabled()) {
    term.find(".cursor").addClass("blink");
  }

  async function typeEffect(
    term: JQueryTerminal<HTMLElement>,
    message: string,
    index = 0
  ) {
    if (index < message.length) {
      term.echo(message[index], { newline: false }); // Insert the next character

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
    if (height && width) {
      var time = (height * 2) / 170;
      scanlines[0].style.setProperty("--time", time.toString());
      tv[0].style.setProperty("--width", width.toString());
      tv[0].style.setProperty("--height", height.toString());
    }
  }
});
