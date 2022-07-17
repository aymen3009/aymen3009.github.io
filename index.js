const Input = document.getElementById("input");
const screen = document.getElementById("screen");
const defaultScreen = document.getElementById("defaultscreen");
const prefix =
  '<span ><i class="fa-solid fa-cloud" style="color: rgb(27, 219, 233);"></i> <span style="color: rgb(14, 224, 14);">Guest [</span> <span style="color: rgb(28, 235, 250);">master</span><span style="color: rgb(14, 224, 14);">]</span> <i class="fa-solid fa-bolt" style="color: rgb(233, 203, 33);" ></i> &nbsp;</span>';
let command = "";
let index = 0;
let history = [];
const commands = {
  clear: {
    description: "Clears the screen",
  },
  help: {
    description: "Displays a list of commands",
  },
  whoami: {
    description: "Displays the user's information \n",
    usage: "whoami [OPTIONS]",
    options: {
      "-a, --all": "Displays all information",
      "-b, --bio": "Displays the user's bio",
      "-n, --name": "Displays the user's name",
      "-e, --email": "Displays the user's email",
      "-s, --social": "Displays the user's social profile(s)",
    },
    content: {
      name: "Aymen Abdellaoui",
      email: "aymen.abdellaoui997@gmail.com",
      social: {
        github: "https://github.com/aymen3009",
        linkedin: "https://www.linkedin.com/in/aymen-abdellaoui-8054b719a/",
        instagram: "https://instagram.com/aymen__abdellaoui",
        facebook: "https://www.facebook.com/aymenabdllaoui",
      },
      bio: "I'm Aymen Abdellaoui, a Full Stack Web Developer and a system administrator. I spend my time watching youtube and anime or playing chess.",
    },
  },
};

const addToScreen = (text, cmd) => {
  screen.innerHTML += `${prefix}${cmd} <br>`;
  screen.innerHTML += text;
  screen.innerHTML += "<br/> ";
};

const asciiArt = String.raw`
<pre>
                                                                                                                        
                                                                                                                        
/$$$$$$                                                     /$$$$$$  /$$             /$$           /$$ /$$                               /$$
/$$__  $$                                                   /$$__  $$| $$            | $$          | $$| $$                              |__/
| $$  \ $$ /$$   /$$ /$$$$$$/$$$$   /$$$$$$  /$$$$$$$       | $$  \ $$| $$$$$$$   /$$$$$$$  /$$$$$$ | $$| $$  /$$$$$$   /$$$$$$  /$$   /$$ /$$
| $$$$$$$$| $$  | $$| $$_  $$_  $$ /$$__  $$| $$__  $$      | $$$$$$$$| $$__  $$ /$$__  $$ /$$__  $$| $$| $$ |____  $$ /$$__  $$| $$  | $$| $$
| $$__  $$| $$  | $$| $$ \ $$ \ $$| $$$$$$$$| $$  \ $$      | $$__  $$| $$  \ $$| $$  | $$| $$$$$$$$| $$| $$  /$$$$$$$| $$  \ $$| $$  | $$| $$
| $$  | $$| $$  | $$| $$ | $$ | $$| $$_____/| $$  | $$      | $$  | $$| $$  | $$| $$  | $$| $$_____/| $$| $$ /$$__  $$| $$  | $$| $$  | $$| $$
| $$  | $$|  $$$$$$$| $$ | $$ | $$|  $$$$$$$| $$  | $$      | $$  | $$| $$$$$$$/|  $$$$$$$|  $$$$$$$| $$| $$|  $$$$$$$|  $$$$$$/|  $$$$$$/| $$
|__/  |__/ \____  $$|__/ |__/ |__/ \_______/|__/  |__/      |__/  |__/|_______/  \_______/ \_______/|__/|__/ \_______/ \______/  \______/ |__/
          /$$  | $$                                                                                                                          
         |  $$$$$$/                                                                                                                          
          \______/                                                                                                             Version 1.0                                                                                                                                                                                                                                                          

This is my personal website. It is a work in progress. This is NOT a responsive site, either. Desktop only... for now (and probably always).

To get help type "help" or "h".

          </pre>          `;

defaultScreen.innerHTML = asciiArt;

Input.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    if (Input.value === "") {
      screen.innerHTML += `${prefix}<br> <br>`;
      return;
    }
    command = Input.value.trim();
    history.unshift(command);
    Input.value = "";
    index = 0;
    switch (command) {
      case "clear":
        screen.innerHTML = "";
        break;
      case "help":
      case "h":
        let table = document.createElement("table");
        table.style.borderSpacing = "50px 10px";
        table.style.borderCollapse = "separate";
        for (let key in commands) {
          let row = table.insertRow();
          let cell1 = row.insertCell();
          let cell2 = row.insertCell();
          cell1.innerHTML = key;
          cell2.innerHTML = commands[key].description;
        }
        addToScreen(table.outerHTML, command);
        break;

      case "whoami":
        let whoamispan = document.createElement("span");
        whoamispan.innerHTML += "<br> <br>";
        whoamispan.innerHTML = "Description: " + commands["whoami"].description;
        whoamispan.innerHTML += "<br> <br>";
        whoamispan.innerHTML += "Usage: " + commands["whoami"].usage;
        whoamispan.innerHTML += "<br> <br>";
        whoamispan.innerHTML += "Options: ";
        whoamispan.innerHTML += "<br>";
        for (let key in commands["whoami"].options) {
          let whoamiTable = document.createElement("table");
          whoamiTable.style.borderSpacing = "50px 10px";
          whoamiTable.style.borderCollapse = "separate";
          let row = whoamiTable.insertRow();
          let cell1 = row.insertCell();
          let cell2 = row.insertCell();
          cell1.innerHTML = key;
          cell2.innerHTML = commands["whoami"].options[key];
          whoamispan.innerHTML += whoamiTable.outerHTML;
        }
        addToScreen(whoamispan.outerHTML, command);
        break;
      case "whoami -a":
      case "whoami --all":
        let whoamiallspan = document.createElement("span");
        whoamiallspan.innerHTML += "<br> <br>";
        whoamiallspan.innerHTML = commands["whoami"].content.bio;
        whoamiallspan.innerHTML += "<br>";
        whoamiallspan.innerHTML += "Email: " + commands["whoami"].content.email;
        whoamiallspan.innerHTML += "<br>";
        whoamiallspan.innerHTML +=
          "Github: " + commands["whoami"].content.social.github;
        whoamiallspan.innerHTML += "<br>";
        whoamiallspan.innerHTML +=
          "LinkedIn: " + commands["whoami"].content.social.linkedin;
        whoamiallspan.innerHTML += "<br>";
        whoamiallspan.innerHTML +=
          "Instagram: " + commands["whoami"].content.social.instagram;
        whoamiallspan.innerHTML += "<br>";
        whoamiallspan.innerHTML +=
          "Facebook: " + commands["whoami"].content.social.facebook;
        whoamiallspan.innerHTML += "<br>";
        whoamiallspan.innerHTML +=
          "Twitter: " + commands["whoami"].content.social.twitter;
        whoamiallspan.innerHTML += "<br>";
        addToScreen(whoamiallspan.outerHTML, command);
        break;

      default:
        addToScreen(`<pre>command not found : ${command}</pre>`, command);
        break;
    }
  } else if (e.key === "ArrowUp") {
    if (history.length > 0) {
      if (index < history.length) {
        Input.value = history[index];

        index++;
      }
    }

    Input.setSelectionRange(Input.value.length, Input.value.length);
    Input.focus();
  } else if (e.key === "ArrowDown") {
    if (history.length > 0) {
      if (index > 0) {
        Input.value = history[index - 1];
        index--;
      }
    }
    Input.setSelectionRange(Input.value.length, Input.value.length);
    Input.focus();
  }
});

Input.focus();

Input.onblur = function () {
  setTimeout(function () {
    Input.focus();
  });
};
