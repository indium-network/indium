


// ____________________________
// Snow Particles Function
// ____________________________
function TurnOnSnowOnOtherPages(){
    snow = document.createElement('script')
    snow.src = '/assets/js/snow.js';
    document.body.appendChild(snow);
    localStorage.setItem('snow', true);
}


if (localStorage.getItem('snow') === 'true') {
  TurnOnSnowOnOtherPages();
}


// __________________________
// Remove Mobile Users
// __________________________
window.addEventListener("load", function () {
    // loadScript("/worker.js");
    if (window.location.pathname === "/index.html" || window.location.pathname === "/" || window.location.pathname === "/=") {
      if (window.innerWidth < 676) {
        location.href = "/mobile-lock";
      }
    }
    if (window.location.pathname === '/loading.html') {
      if (window.innerWidth < 676) {
        var rm = document.querySelector('.themesExcluded');
        rm.style.display = 'none';
      }
    }
  });















function script(text) {
  console.log("%cScript Injection", "color: cyan; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px", text);
}

// ====================================
// SCRIPT INJECTION
// ====================================


var gaenabled = window.localStorage.getItem("ga");
if (gaenabled == "false") {
  script("Skipped GA injection because it is disabled by the user.");
} else {
  const gascript = document.createElement("script");
  gascript.setAttribute("async", "");
  gascript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-B9G5BGGE28");
  const inlinegascript = document.createElement("script");
  inlinegascript.innerHTML = ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-B9G5BGGE28');`;
  document.head.append(gascript, inlinegascript);
  script("Injected script 1/3");
}

document.addEventListener("DOMContentLoaded", (event) => {
  setIcon();
  setTheme();
  createTabCloakButtons();
  createthemeCloakButtons();
});

function createTabCloakButtons() {
  const tabCloakOptions = [
    { name: "Default", icon: "https://d3rtzzzsiu7gdr.cloudfront.net/assets/img/appbig.png" },
    { name: "Schoology", icon: "https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico" },
    { name: "Google Docs", icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
    { name: "Google Sheets", icon: "https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico" },
    { name: "Google Slides", icon: "https://ssl.gstatic.com/docs/presentations/images/favicon5.ico" },
    { name: "Google Sites", icon: "https://ssl.gstatic.com/atari/images/public/favicon.ico" },
    { name: "Google Forms", icon: "https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png" },
    { name: "Desmos", icon: "https://www.desmos.com/assets/img/apps/scientific/favicon.ico" },
    { name: "Desmos graphing", icon: "https://www.desmos.com/assets/img/apps/graphing/favicon.ico" },
    { name: "Google Drive", icon: "https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_32dp.png" },
    { name: "Google classroom", icon: "https://ssl.gstatic.com/classroom/favicon.png" },
    { name: "NoRedInk", icon: "https://wp.noredink.com/wp-content/uploads/2024/01/favicon.ico" },
    { name: "Lexia Core5", icon: "https://www.lexiacore5.com/icons/icon.svg" },
    { name: "Lexia PowerUp", icon: "https://www.lexiapowerup.com/favicon.svg" },
    { name: "Mathspace", icon: "https://mathspace.co/website/favicons/favicon-32x32.png" },
    { name: "Kahoot", icon: "https://assets-cdn.kahoot.it/controller/v2/favicon.ico" },
    { name: "Oncourse Connect", icon: "https://d3rtzzzsiu7gdr.cloudfront.net/assets/img/onc.ico" } // Assuming this is a local path
];


const tabCloakButtonsContainer = document.getElementById("tabCloakButtons");
if(tabCloakButtonsContainer){
    tabCloakOptions.forEach(option => {
        const button = document.createElement("button");

        const icon = document.createElement("img");
        icon.src = option.icon;
        icon.alt = option.name;
        icon.style.width = "20px";
        icon.style.height = "20px";
        icon.style.marginRight = "5px";

        button.classList.add("tabCloakiconButtons");  
        button.appendChild(icon); // Append icon before text
        button.appendChild(document.createTextNode(option.name)); // Append button text

        button.addEventListener("click", function() {
            localStorage.setItem('tabCloak', option.name);
            setIcon();

            // Remove active class from all buttons
            const buttons = document.querySelectorAll(".tabCloakiconButtons");
            buttons.forEach(btn => {
                btn.classList.remove("active");
            });

            // Add active class to the clicked button
            this.classList.add("active");
        });

        // Check if the button corresponds to the selected tab cloak option and add the active class
        if (localStorage.getItem('tabCloak') === option.name) {
            button.classList.add("active");
        }

        tabCloakButtonsContainer.appendChild(button);
      
    });
  }
}



async function fetchThemes() {
  try {
    const response = await fetch('/assets/json/themes.json');
    const themes = await response.json();
    return themes;
  } catch (error) {
    console.error('Error fetching themes:', error);
    return [];
  }
}

async function createthemeCloakButtons() {
  const themeCloakOptions = await fetchThemes();
  const themeButtonsContainer = document.getElementById("themeCloakButtons");
if (themeButtonsContainer){
  themeCloakOptions.forEach(option => {
    const button = document.createElement("button");
    const circle = document.createElement("span");
    
    button.style.padding = "5px 10px";
    button.style.borderRadius = "20px";
    button.style.border = "none";
    button.style.marginRight = "5px";
    button.style.cursor = "pointer";

    circle.style.display = "inline-block";
    circle.style.width = "10px";
    circle.style.height = "10px";
    circle.style.borderRadius = "50%";
    circle.style.backgroundColor = option.theme.primary; // Use primary color as circle color
    circle.style.marginRight = "8px"; // Adjust the spacing between circle and text

    button.appendChild(circle);
    button.appendChild(document.createTextNode(option.name)); // Append button text

    button.addEventListener("click", function() {
      localStorage.setItem('theme', option.id); // Store theme id instead of name
      setTheme();

      // Remove active class from all buttons
      const buttons = document.querySelectorAll(".themeCloakiconButtons");
      buttons.forEach(btn => {
        btn.classList.remove("active");
      });

      // Add active class to the clicked button
      this.classList.add("active");
    });
    button.id = 'themeCloakButtons';
    // Check if the button corresponds to the selected tab cloak option and add the active class
    if (localStorage.getItem('theme') === option.id) { // Compare with theme id
      button.classList.add("active");
    }
    button.classList.add("themeCloakiconButtons"); 
    themeButtonsContainer.appendChild(button);
  });
}
}

async function setTheme() {
  if (localStorage.getItem('theme') == null || localStorage.getItem('theme') == ''){
    localStorage.setItem('theme', 'default');
    // window.location.reload();
  }
  const themeId = localStorage.getItem('theme') || 'default'; // Retrieve theme id or default to 'default'
    const themes = await fetchThemes();
    const selectedTheme = themes.find(theme => theme.id === themeId);
    if (selectedTheme) {
      document.body.setAttribute('data-theme', selectedTheme.id.toLowerCase());
    }
  }







function setIcon() {
  const tabCloakOptions = [
      { name: "Default", icon: "https://d3rtzzzsiu7gdr.cloudfront.net/assets/img/appbig.png", title: "Home | Indium" },
      { name: "Schoology", icon: "https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico", title: "Home | Schoology" },
      { name: "Google Docs", icon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico", title: "Google Docs" },
      { name: "Google Sheets", icon: "https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico", title: "Google Sheets" },
      { name: "Google Slides", icon: "https://ssl.gstatic.com/docs/presentations/images/favicon5.ico", title: "Google Slides" },
      { name: "Google Sites", icon: "https://ssl.gstatic.com/atari/images/public/favicon.ico", title: "Google Sites" },
      { name: "Google Forms", icon: "https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png", title: "Google Forms" },
      { name: "Desmos", icon: "https://www.desmos.com/assets/img/apps/scientific/favicon.ico", title: "Desmos | Scientific Calculator" },
      { name: "Desmos graphing", icon: "https://www.desmos.com/assets/img/apps/graphing/favicon.ico", title: "Desmos | Graphing Calculator" },
      { name: "Google Drive", icon: "https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_32dp.png", title: "My Drive - Google Drive" },
      { name: "Google classroom", icon: "https://ssl.gstatic.com/classroom/favicon.png", title: "Classes" },
      { name: "NoRedInk", icon: "https://wp.noredink.com/wp-content/uploads/2024/01/favicon.ico", title: "Student Home | NoRedInk" },
      { name: "Lexia Core5", icon: "https://www.lexiacore5.com/icons/icon.svg", title: "Lexia Core5" },
      { name: "Lexia PowerUp", icon: "https://www.lexiapowerup.com/favicon.svg", title: "Lexia PowerUp" },
      { name: "Mathspace", icon: "https://mathspace.co/website/favicons/favicon-32x32.png", title: "Mathspace" },
      { name: "Kahoot", icon: "https://assets-cdn.kahoot.it/controller/v2/favicon.ico", title: "Enter Game PIN - Kahoot!" },
      { name: "Oncourse Connect", icon: "https://d3rtzzzsiu7gdr.cloudfront.net/assets/img/onc.ico", title: "My Grades - OnCourse Connect" } // Assuming this is a local path
  ];

  let iconURL = "https://d3rtzzzsiu7gdr.cloudfront.net/assets/img/appbig.png"; // Default icon URL
  let documentTitle = "Home | Indium"; // Default document title

  if (localStorage.getItem('tabCloak') == null || localStorage.getItem('tabCloak') == ''){
    localStorage.setItem('tabCloak', 'Default');
    // window.location.reload();
  }

  // Get the selected tab cloak option from localStorage
  const selectedTabCloak = localStorage.getItem("tabCloak") || "Default";

  // Find the corresponding icon URL and document title from tabCloakOptions
  const selectedOption = tabCloakOptions.find(option => option.name === selectedTabCloak);
  if (selectedOption) {
      iconURL = selectedOption.icon;
      documentTitle = selectedOption.title;
  }

  // Set the favicon and document title
  const link = document.querySelector("link[rel~='icon']") || document.createElement('link');
  link.rel = 'icon';
  link.href = iconURL;
  document.getElementsByTagName('head')[0].appendChild(link);
  document.title = documentTitle;
}






// // Function to apply saturation and contrast values to the page
// function applyFilters() {
//   // Retrieve saturation value from localStorage
//   var saturationValue = localStorage.getItem('saturationValue');
//   // Retrieve contrast value from localStorage
//   var contrastValue = localStorage.getItem('contrastValue');
//   if (saturationValue == null) {
//       localStorage.setItem('saturationValue', 100)
//   }
//   if (contrastValue == null) {
//       localStorage.setItem('contrastValue', 100)
//   }
//   // Check if saturation and contrast values exist in localStorage
//   if (saturationValue !== null && contrastValue !== null) {
//       // Apply saturation and contrast values to the page
//       document.body.style.filter = "saturate(" + saturationValue + "%) contrast(" + contrastValue + "%)";
//   } else if (contrastValue !== null) {
//       document.body.style.filter = "contrast(" + contrastValue + "%)";
//   }
// }

// // Call applyFilters function to set saturation and contrast
// applyFilters();


// window.onload = applyFilters();
window.onload = setIcon();

if (localStorage.getItem('website') == null || localStorage.getItem('key') == null) {
  settodefault();
}

function settodefault(){
  localStorage.setItem('website','https://classroom.google.com/');
  localStorage.setItem('key','`');
}


// ====================================
// Panic Key
// ====================================


// Retrieve the value from localStorage
const storedKey = localStorage.getItem('key');
document.addEventListener('keypress', (event) => {
  const pressedKey = event.key;
  if (pressedKey === storedKey) {
    var gotopage = localStorage.getItem('website');
    

    // Check if gotopage is not null or empty
    if (gotopage && gotopage.trim() !== "") {
      // Check if the URL is missing the protocol
      if (!gotopage.startsWith("http://") && !gotopage.startsWith("https://")) {
          // Prepend the protocol (assuming HTTP)
          gotopage = "http://" + gotopage;
      }

      try{
        // Add an entry with a specific URL to the history stack
        history.pushState(null, null, gotopage);

        // Prevent navigation via the back button
        window.addEventListener('popstate', function(event) {
            history.pushState(null, null, gotopage);
        });
      } catch{
      console.warn('Could not disable back button.')
      // Navigate to the URL
      window.location.href = gotopage;
      }
    }
  }
});



// Wait for the DOM content to be fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Delayed execution for warning messages
setTimeout(function() {
  // Log the warning messages
  console.clear();
  console.log("%cWarning!", "color: red; font-size: 40px;background-color: yellow;");
  console.log("%cUsing this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS. Do not enter or paste code that you do not understand.", "color: red; font-size: 20px;");
}, 200);
});


// ____________________________
// Auto Blanker
// ____________________________

if(localStorage.getItem('autoblank') == null){
  localStorage.setItem('autoblank', true)
  window.location.reload()
}


// AB Cloak
function AB() {
  let inFrame

  try {
    inFrame = window !== top
  } catch (e) {
    inFrame = true
  }

  if (!inFrame && !navigator.userAgent.includes("Firefox")) {
    const popup = open("about:blank", "_blank")
    if (!popup || popup.closed) {
      alert("Please allow popups and redirects.")
    } else {
      const doc = popup.document
      const iframe = doc.createElement("iframe")
      const style = iframe.style
      const link = doc.createElement("link")


      const name = document.title; // Grab title from current page
      const icon = document.querySelector("link[rel*='icon']") ? document.querySelector("link[rel*='icon']").href : "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"; // Grab favicon from current page, fallback if not found
      // const name = localStorage.getItem("name") || "My Drive - Google Drive"
      // const icon = localStorage.getItem("icon") || "https://ssl.gstatic.com/docs/doclist/images/drive_2022q3_32dp.png"

      doc.title = name
      link.rel = "icon"
      link.href = icon

      iframe.src = location.href
      style.position = "fixed"
      style.top = style.bottom = style.left = style.right = 0
      style.border = style.outline = "none"
      style.width = style.height = "100%"

      doc.head.appendChild(link)
      doc.body.appendChild(iframe)

      const pLink = localStorage.getItem(encodeURI("pLink")) || "https://www.nasa.gov/"
      location.replace(pLink)

      const script = doc.createElement("script")
      script.textContent = `
        window.onbeforeunload = function (event) {
          const confirmationMessage = 'Leave Site?';
          (event || window.event).returnValue = confirmationMessage;
          return confirmationMessage;
        };
      `
      doc.head.appendChild(script)
    }
  }
}

function turnonblank(){
  localStorage.setItem('autoblank', true)
  AB();
  // window.location.reload();
  document.getElementById('blankonbutton').style.display = 'none';
  document.getElementById('blankoffbutton').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', (event) => {
  if (localStorage.getItem('autoblank') === 'true') {
    AB();
  }
});

function turnoffblank(){
  localStorage.setItem('autoblank', false);
  window.location.reload();
}


// ____________________________
// Right Click Menu
// ____________________________

document.addEventListener('DOMContentLoaded', function() {
  function injectContextMenu() {
      // Create the div element
      var div = document.createElement('div');
      div.id = 'contextRightClickMenu';
      div.className = 'context-right-menu';
      div.style.display = 'none';

      // Create the ul element
      var ul = document.createElement('ul');

      // Create the li elements and anchor elements
      var li1 = document.createElement('li');
      var a1 = document.createElement('a');
      a1.href = 'javascript:AB()';
      a1.setAttribute('onclick', 'AB()');
      a1.textContent = 'About:blank';
      li1.appendChild(a1);

      var li2 = document.createElement('li');
      var a2 = document.createElement('a');
      a2.href = '/~';
      a2.textContent = 'Apps';
      li2.appendChild(a2);

      var li3 = document.createElement('li');
      var a3 = document.createElement('a');
      a3.href = '/0';
      a3.textContent = 'Games';
      li3.appendChild(a3);

      var li4 = document.createElement('li');
      var a4 = document.createElement('a');
      a4.href = '/=';
      a4.textContent = 'Settings';
      li4.appendChild(a4);

      // Append li elements to ul
      ul.appendChild(li1);
      ul.appendChild(li2);
      ul.appendChild(li3);
      ul.appendChild(li4);

      // Append ul to div
      div.appendChild(ul);

      // Append div to body
      document.body.appendChild(div);
      script('Right Click Menu Loaded')

      // Add event listeners
      document.onclick = hideMenu;
      document.oncontextmenu = rightClick;

      function hideMenu() {
          document.getElementById("contextRightClickMenu").style.display = "none";
      }

      function rightClick(e) {
          e.preventDefault();

          if (document.getElementById("contextRightClickMenu").style.display == "block") {
              hideMenu();
          } else {
              var menu = document.getElementById("contextRightClickMenu");
              menu.style.display = 'block';
              menu.style.left = e.pageX + "px";
              menu.style.top = e.pageY + "px";
          }
      }
  }

  // Call the function to inject the context menu when DOM content is loaded
  injectContextMenu();
});

