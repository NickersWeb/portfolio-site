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
Location: South Wales (Remote)
Email: nicholas.e.webber@hotmail.com
Professional Profile
Motivated and innovative Fullstack Engineer with a focus on front-end web development. Adept at leading teams to deliver high-quality, scalable, and maintainable solutions. Expertise in the latest front-end technologies, automated testing, and best practices. Passionate about creating efficient and consistent development processes and delivering clear, comprehensive documentation.
Core Skills
- Front-End Technologies: HTML5, SASS/SCSS, Bootstrap, TailWind, React, TanStack, Vite, Vitest and Shadcn
- Back-End Technologies: .NET Core, EF Core, C#, SQL
- Cloud Services: Agnostic platform services
- Development Practices: Agile Development, onion architecture and microservices 
- DevOps: Terraform (Azure), Yaml (build/deploy/etc) pipelines (Azure DevOps)
- Automation Testing (TDD): Vitest, React-testing-library, MSW and Efate
- Soft Skills: Team Leadership, Problem-Solving, Communication, Documentation
Career Summary
FullStack Engineer
Dstny (D4SP) | Mar 2022 - Present
- Lead the development of a mono-repo front-end web application, enabling multiple apps to share logic and components from internal libraries. Allowing for a highly customizable and structured solution.
- Lead front-end web automation testing using popular/performant libraries and frameworks. Enhancing the test coverage and structure for engineers to create tests with minimal effort.
- Lead the API client build/deployment solution, facilitating simple API integration for internal members and external customers.
- Served as the primary contact for all front-end bugs and FE support issues or features, ensuring timely resolution.
- Collaborated with designers on application mockups, providing feedback on design feasibility and engineering impact.
- Assisted the product team in drafting/refining detailed epics and user stories for front-end features, focusing on clarity and completeness.
- Advocate for and implement accessibility checks within front-end automation tests. To ensure web applications are accessible. 
Front End Engineer
Qunifi | May 2021 - Mar 2022
- Spearheaded the development of a Single Page Application (SPA) using React, incorporating efficient global state management for seamless user experiences.
FullStack Developer
SourceCode Software Ltd | Jul 2020 - Feb 2021
- Independently managed multiple projects, demonstrating strong autonomy and adaptability.
- Utilized modern coding libraries to ensure a flexible and reusable frontend codebase.
- Integrated third-party tools like EPO, OAuth, JWT, and SMS & Email services to meet project requirements.
- Handled backend development, including business logic, request processing, file management, and database operations.
FullStack Developer
AMX Solutions Ltd | Jan 2017 - Jan 2020
- Enhanced and maintained legacy code through conversion, optimization, and refactoring.
- Established scalable automated testing practices for headless requests, macros, and performance tests.
- Ensured multi-browser and mobile support for frontend development, emphasizing accessibility.
- Conducted in-depth database analysis and error handling, implementing high coding standards.
Education
Level 4 Software and Web Development Apprenticeship
Completed: August 2019

Level 3 Software and Web Development Apprenticeship
Completed: 2018

A Levels
Cabot Federation Sixth Form | 2014 - 2016
- A2 Media Studies (B)
- Level 3 Forensic Science (Applied Science) (Distinction *)
- A2 OCR Level 3 ICT Cambridge Technical (Merit)
Certifications
- Front-End Automation Testing Courses
- Front-End Libraries and Web Styling Courses (Vitest, React, SASS/SCSS)
References
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
              "LinkedIn:  https://linkedin.com/in/nick-w-6163b322a",
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
