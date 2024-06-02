import $ from "jquery";
import "./App.css";
import Terminal from "./Terminal.tsx";

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

function App() {
  let _cwd = "/";
  let init = false;

  const typeEffect = async (
    term: JQueryTerminal<HTMLElement>,
    message: string,
    index = 0
  ) => {
    if (index < message.length) {
      term.echo(message[index], { newline: false }); // Insert the next character

      return new Promise((res) => {
        setTimeout(() => {
          res(typeEffect(term, message, index + 1)); // Call the function again with the next index
        }, 25); // Adjust the delay as needed (in milliseconds)
      });
    }
  };

  const setSize = () => {
    const tv = $(".tv");
    const scanlines = $(".scanlines");
    // for window height of 170 it should be 2s
    const height = $(window).height();
    const width = $(window).width();
    if (height && width) {
      const time = (height * 2) / 170;
      scanlines[0].style.setProperty("--time", time.toString());
      tv[0].style.setProperty("--width", width.toString());
      tv[0].style.setProperty("--height", height.toString());
    }
  };

  const exit = (term: JQueryTerminal<HTMLElement>) => {
    const tv = $(".tv");
    tv.toggleClass("collapse");
    term.disable();
  };

  const help = (term: JQueryTerminal<HTMLElement>) => {
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
  };

  const cat = (term: JQueryTerminal<HTMLElement>, rest: string) => {
    if (!rest) {
      term.echo(`You need to supply argument: filename \n`);
      return;
    }

    const filename = parsePath(rest);
    const iter = getIter(filename);
    if (!iter) {
      term.echo(`File not found: ${filename} \n`);
      return;
    }

    //@ts-ignore
    term.echo(iter.content);
  };

  const cd = (term: JQueryTerminal<HTMLElement>, rest: string) => {
    if (!rest) {
      term.echo("You need to supply argument: dir \n");
      return;
    }

    const dirname = parsePath(rest);
    const iter = getIter(dirname);
    if (dirname == "/" || (iter && iter.type == "dir")) {
      _cwd = dirname;
      term.echo(`Entered: ${dirname} \n`);
      return;
    }
    term.echo(`Path not found: ${dirname} \n`);
  };

  const ls = (term: JQueryTerminal<HTMLElement>, rest: string) => {
    const dir = parsePath(rest || _cwd);

    const out: string[] = [];
    const iter = getIter(dir);

    let p;
    const tree = iter && iter.type == "dir" ? iter.files : _filetree;
    let count = 0;
    let total = 0;

    for (var i in tree) {
      if (tree.hasOwnProperty(i)) {
        p = tree[i];
        if (p.type == "dir") {
          out.push(`${padRight("<" + i + ">", 20)} ${padRight(p.type, 20)} 0`);
        } else {
          out.push(
            `${padRight(i, 20)} ${padRight(p.mime, 20)} ${p.content.length}`
          );
          total += p.content.length;
        }
        count++;
      }
    }

    out.push("\n");
    out.push(`${count} file(s) in total, ${total} byte(s)`);

    term.echo(out.join("\n"));
  };

  const contact = (term: JQueryTerminal<HTMLElement>) => {
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
  };

  const intro = async (term: JQueryTerminal<HTMLElement>) => {
    term.clear();
    setSize();

    //https://terminal.jcubic.pl/examples.php#user-typing
    await typeEffect(term, "WELCOME TO NICKCO INDUSTRIES (TM) TERMLINK\n\n");
    await typeEffect(term, ">SET TERMINAL/INQUIRE\n\n");
    await typeEffect(term, "RX-9000\n\n");
    await typeEffect(term, ">SET FILE/PROTECTION=OWNER:RWED ACCOUNTS.F\n\n");
    await typeEffect(term, ">SET HALT RESTART/MAINT\n\n");
    await typeEffect(
      term,
      "Initializing NickCo Industries (TM) MF Boot Agent v2.3.0\n"
    );
    await typeEffect(term, "RETROS BIOS\n");
    await typeEffect(term, "RBIOS-4.02.08.00 52EE5.E7.E8\n");
    await typeEffect(
      term,
      `Copyright 1998-${new Date().getFullYear()} NickCo Ind.\n`
    );
    await typeEffect(term, "Uppermem: 1024 KB\n");
    await typeEffect(term, "Root (5A8)\n");
    await typeEffect(term, "Maintenance Mode\n\n");
    await typeEffect(term, ">RUN DEBUG/ACCOUNTS.F");

    setTimeout(() => {
      term.clear();
      term.echo(`
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
  };

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
    const parts = path.split(/\//);
    const newPath: string[] = [];
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

  const parsePath = (p: string) => {
    const dir = (p.match(/^\//) ? p : _cwd + "/" + p).replace(/\/+/g, "/");
    return realpath(dir) || "/";
  };

  const getIter = (path: string) => {
    const parts = (path.replace(/^\//, "") || "/").split("/");
    let iter = null;

    let last = _filetree;
    while (parts.length) {
      const i = parts.shift();

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

  const padRight = (str: string, l: number) => {
    return str + Array(l - str.length + 1).join(" ");
  };

  return (
    <Terminal
      interpreter={async (command, term) => {
        const cmd = $.terminal.parse_command(command);
        const { name, rest } = cmd;

        switch (name.toLowerCase()) {
          case "help":
            help(term);
            break;
          case "cat":
            cat(term, rest);
            break;
          case "cd":
            cd(term, rest);
            break;
          case "ls":
            ls(term, rest);
            break;
          case "contact":
            contact(term);
            break;
          case "clear":
          case "cls":
            term.clear();
            break;
          case "exit":
            exit(term);
            break;
          case "echo":
            term.echo(rest);
            break;
          case "y":
            if (init) {
              return;
            }
            await intro(term);

            init = true;
            break;
          default:
            term.error(`Command: ${name} does not exist.`);
            break;
        }
      }}
      options={{
        greetings: "ENTER? (Y)",
        //@ts-ignore
        onResize: setSize,
        exit: false,
        prompt: "> ",
      }}
    />
  );
}

export default App;
