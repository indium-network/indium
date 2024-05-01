window.onload = function(){
    setInterval(updatetime, 1000);
    if (localStorage.getItem('snow') === 'true') {
      TurnOnSnowOnOtherPages();
  }
};

function updatetime(){
    var d = new Date();
var n = d.toLocaleTimeString();
document.getElementById('realtime').innerText = n;
}



// ____________________________
// Snow Particles Function
// ____________________________
function TurnOnSnowOnOtherPages(){
    snow = document.createElement('script')
    snow.src = '/assets/js/snow.js';
    document.body.appendChild(snow);
    localStorage.setItem('snow', true);
}




// __________________________
// Remove Mobile Users
// __________________________
window.addEventListener("load", function () {
    loadScript("/worker.js");
    if (window.location.pathname === "/index.html" || window.location.pathname === "/") {
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
  gascript.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-9N6C11NZ79");
  const inlinegascript = document.createElement("script");
  inlinegascript.innerHTML = ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-9N6C11NZ79');`;
  document.head.append(gascript, inlinegascript);
  script("Injected script 1/3");
}

document.addEventListener("DOMContentLoaded", (event) => {
  setIcon();
});


if (document.getElementById("tabCloak")){
document.getElementById("tabCloak").addEventListener("change", function (event) {
  localStorage.setItem('tabCloak', event.target.value);
  console.log(localStorage.getItem("tabCloak"))
  setIcon();
})}

function setIcon() {
  if (localStorage.getItem("tabCloak") === null) {
      localStorage.setItem("tabCloak", "Default")
  }
  var icon = localStorage.getItem('tabCloak');
  if (document.getElementById("tabCloak")) {
  document.getElementById("tabCloak").value = icon;
  }
  var link = window.document.querySelector("link[rel~='icon']");
  if (!link) {
      link = window.document.createElement('link');
      link.rel = 'icon';
      window.document.getElementsByTagName('head')[0].appendChild(link);
  }
  if (icon == "Default") {
      link.href = 'https://d3rtzzzsiu7gdr.cloudfront.net/assets/img/appbig.png';
      document.title = "Home | Indium"
  }
  if (icon == "Schoology") {
      link.href = 'https://asset-cdn.schoology.com/sites/all/themes/schoology_theme/favicon.ico';
      document.title = "Home | Schoology"
  }
  if (icon == "Google Docs") {
      link.href = 'https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico';
      document.title = "Google Docs"
  }
  if (icon == "Google Sheets") {
      link.href = 'https://ssl.gstatic.com/docs/spreadsheets/favicon3.ico';
      document.title = "Google Sheets"
  }
  if (icon == "Google Slides") {
      link.href = 'https://ssl.gstatic.com/docs/presentations/images/favicon5.ico';
      document.title = "Google Slides"
  }
  if (icon == "Google Sites") {
      link.href = 'https://ssl.gstatic.com/atari/images/public/favicon.ico';
      document.title = "Google Sites"
  }
  if (icon == "Google Forms") {
      link.href = 'https://ssl.gstatic.com/docs/spreadsheets/forms/favicon_qp2.png';
      document.title = "Google Forms"
  }
  if (icon == "Desmos") {
      link.href = 'https://www.desmos.com/assets/img/apps/scientific/favicon.ico';
      document.title = "Desmos | Scientific Calculator"
  }
  if (icon == "Desmos graphing") {
      link.href = 'https://www.desmos.com/assets/img/apps/graphing/favicon.ico';
      document.title = "Desmos | Graphing Calculator"
  }
  if (icon == "Google Drive") {
      link.href = 'https://ssl.gstatic.com/images/branding/product/2x/drive_2020q4_32dp.png';
      document.title = "My Drive - Google Drive"
  }
  if (icon == "Google classroom") {
      link.href = 'https://ssl.gstatic.com/classroom/favicon.png';
      document.title = "Classes"
  }
  if (icon == "NoRedInk") {
      link.href = 'https://www.noredink.com/favicon.png';
      document.title = "Student Home | NoRedInk"
  }
  if (icon == "Lexia Core5") {
      link.href = 'https://www.lexiacore5.com/icons/icon.svg';
      document.title = "Lexia Core5"
  }
  if (icon == "Lexia PowerUp") {
      link.href = 'https://www.lexiapowerup.com/favicon.png';
      document.title = "Lexia PowerUp"
  }
  if (icon == "Mathspace") {
      link.href = 'https://mathspace.co/website/favicons/favicon-32x32.png';
      document.title = "Mathspace"
  }
  if (icon == "Kahoot") {
      link.href = 'https://assets-cdn.kahoot.it/controller/v2/favicon.ico';
      document.title = "Enter Game PIN - Kahoot!"
  }
  if (icon == "Oncourse Connect") {
      link.href = '/assets/img/onc.ico';
      document.title = "My Grades - OnCourse Connect"
  }

}





// Function to apply saturation and contrast values to the page
function applyFilters() {
  // Retrieve saturation value from localStorage
  var saturationValue = localStorage.getItem('saturationValue');
  // Retrieve contrast value from localStorage
  var contrastValue = localStorage.getItem('contrastValue');
  if (saturationValue == null) {
      localStorage.setItem('saturationValue', 100)
  }
  if (contrastValue == null) {
      localStorage.setItem('contrastValue', 100)
  }
  // Check if saturation and contrast values exist in localStorage
  if (saturationValue !== null && contrastValue !== null) {
      // Apply saturation and contrast values to the page
      document.body.style.filter = "saturate(" + saturationValue + "%) contrast(" + contrastValue + "%)";
  } else if (contrastValue !== null) {
      document.body.style.filter = "contrast(" + contrastValue + "%)";
  }
}

// Call applyFilters function to set saturation and contrast
applyFilters();


window.onload = applyFilters();
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