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
Nicholas Webber
================

📍 South West, UK
📧 nicholas.e.webber@hotmail.com
Seeking: Software Engineer / Technical Position

------------------------------------------------------------
Professional Profile
------------------------------------------------------------
Motivated and innovative full-stack engineer with a focus on front-end web development. 
Adept at leading teams to deliver high-quality, scalable, and maintainable solutions. 
Expertise in the latest front-end technologies, automated testing, and best practices. 
Passionate about creating efficient and consistent development processes and delivering clear, comprehensive documentation.

------------------------------------------------------------
Core Skills
------------------------------------------------------------
Front-End:       HTML5, TypeScript, JavaScript, SASS/SCSS, Bootstrap, TailWind, React, TanStack, Vite, Vitest
Back-End:        .NET Ecosystem, C#, SQL
Cloud Services:  Agnostic platform services (e.g., Azure)
Dev Practices:   Agile Development, Onion Architecture, Microservices
DevOps:          Terraform (Azure), Yaml (CI/CD integrations), Pipelines (Azure DevOps), Node CLIs
Testing (TDD):   Vitest, React Testing Library, Jest, MSW, NUnit
Soft Skills:     Team Leadership, Support, Problem-Solving, Communication, Technical Documentation

------------------------------------------------------------
Professional Experience
------------------------------------------------------------

Front End Technical Lead
Dstny (D4SP) | Oct 2024 – Mar 2025
- Led engineering and development of a platform-agnostic, framework-agnostic internal component library.
- Designed atomic, reusable components to integrate into diverse ecosystems.
- Improved developer experience with technical documentation and CLIs.
- Authored comprehensive documentation for adoption and implementation.
- Collaborated with design team to align vision and implementation.
- Promoted reusable, consistent code practices across teams.

FullStack Engineer
Dstny (D4SP) | Mar 2022 – Mar 2025
- Led development of a monorepo web app architecture sharing logic/components.
- Pioneered automated front-end testing, increasing coverage and ease of test writing.
- Developed API client build and deployment solution for internal and external use.
- Primary contact for front-end bugs, support, and features.
- Worked with designers on mockups and technical feedback.
- Supported product team by refining epics and user stories.
- Implemented accessibility checks in front-end tests.

Front-End Engineer
Qunifi | May 2021 – Mar 2022
- Developed a React SPA with Redux for state management and performance optimization.

Full-Stack Developer
SourceCode Software Ltd | Jul 2020 – Feb 2021
- Managed multiple projects independently.
- Built reusable front-end using modern libraries.
- Integrated EPO, OAuth, JWT, and messaging services.
- Developed back-end logic, request handling, file, and database operations.

Full-Stack Developer
AMX Solutions Ltd | Jan 2017 – Jan 2020
- Refactored and optimized legacy code.
- Established scalable automated testing for various request types.
- Ensured browser/mobile compatibility with a focus on accessibility.
- Performed database analysis and robust error handling.

------------------------------------------------------------
Education & Training
------------------------------------------------------------

Software & Web Development Apprenticeship (Level 4 Diploma)
- Grade: Merit (Completed: August 2019)

Software & Web Development Apprenticeship (Level 3 Diploma)
- Grade: Distinction Star (Completed: 2018)

A Levels - Cabot Federation Sixth Form | 2014–2016
- A2 Media Studies (B)
- Level 3 Forensic Science (Distinction*)
- A2 OCR ICT Cambridge Technical (Merit)

GCSE - King’s Oak Academy | 2007–2014
- Maths, Science & English (C)

------------------------------------------------------------
Additional Qualifications
------------------------------------------------------------

Programming Courses:
- React Native – The Practical Guide (2025) – Maximilian Schwarzmüller
- React – The Complete Guide (2025) – Maximilian Schwarzmüller
- Complete Node.js Developer Course – Rob Percival
- The Complete Angular Course – Mosh Hamedani
- Entity Framework in Depth – Mosh Hamedani
- C# Intermediate – Mosh Hamedani
- Complete C# Unity Game Developer 2D – GameDev.tv
- Unreal Engine 2D/2.5D Game Dev – Cobra Code
- React Testing Library with Jest/Vitest – Bonnie Schulkin
- Advanced CSS and Sass – Jonas Schmedtmann

------------------------------------------------------------
References
------------------------------------------------------------

Available upon request

          `,
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
                  `${padRight(i, 20)} ${padRight(p.mime, 20)} ${p.content.length
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
              "Contact information:",
              "Name:      Nick Webber",
              "Email:     nicholas.e.webber@hotmail.com",
              'Github:    <a href="https://www.github.com/NickersWeb/" target="_blank">www.github.com/NickersWeb</a>',
              'LinkedIn:  <a href="https://www.linkedin.com/in/nick-w-6163b322a/" target="_blank">www.linkedin.com/in/nick-w-6163b322a</a>',
              "YouTube:   None",
              "Twitter:   None",
            ]
              .join("<br/>"), {
            raw: true
          }
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
        t.clear();
        t.echo(`
          <pre>
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
</pre>
TYPE 'HELP' FOR A LIST OF AVAILABLE COMMANDS.`, { raw: true });

      },
      prompt: "> ",
    }
  );

  // for codepen preview
  if (!term.enabled()) {
    term.find(".cursor").addClass("blink");
  }

  // async function typeEffect(
  //   term: JQueryTerminal<HTMLElement>,
  //   message: string,
  //   index = 0
  // ) {
  //   if (index < message.length) {
  //     term.echo(message[index], { newline: false }); // Insert the next character

  //     return new Promise((res) => {
  //       setTimeout(() => {
  //         res(typeEffect(term, message, index + 1)); // Call the function again with the next index
  //       }, 25); // Adjust the delay as needed (in milliseconds)
  //     });
  //   }
  // }

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
