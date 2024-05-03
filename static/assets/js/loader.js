const urlBar = document.querySelector("#urlBar")
const siteUrl = document.querySelector("#siteurl");
const urlInput = document.querySelector("#urlInput");
let encodedUrl = localStorage.getItem("encodedUrl");
var selectedTheme = localStorage.getItem('selectedOption');
var bgUrl = localStorage.getItem('bgUrl');
siteUrl.addEventListener("load", handleLoadEvent);
siteUrl.addEventListener("srcchange", handleSrcChangeEvent);
document.querySelector("#urlInput").addEventListener("keypress", handleEnterKeyPress);

Object.defineProperty(siteUrl, 'src', {
    set: function(value) {
        this.setAttribute('src', value);
        this.dispatchEvent(new Event('srcchange'));
    }
});

urlInput.value = Ultraviolet.codec.xor.decode(encodedUrl);

if (selectedTheme === 'deepsea') {
    urlBar.style.background = "rgb(6, 22, 35)";
} else if (selectedTheme === 'equinox') {
    urlBar.style.backgroundImage = "url('/assets/img/topographic_splash.webp')";
} else if (selectedTheme === 'swamp') {
    urlBar.style.background = "rgb(12, 43, 22)";
} else if (selectedTheme === 'ocean') {
    urlBar.style.background = "rgb(2, 59, 57)";;
} else if (selectedTheme === 'starry') {
    urlBar.style.background = "rgb(63, 3, 53)";
} else if (selectedTheme === 'magma') {
    urlBar.style.background = "rgb(53, 1, 1)";
} else if (selectedTheme === 'sunset') {
    urlBar.style.background = "rgb(53, 52, 1)";
} else if (selectedTheme === 'midnight') {
    urlBar.style.background = "rgb(27, 27, 27)";
} else if (selectedTheme === null) {
    urlBar.style.background = "linear-gradient(-45deg, rgb(115, 11, 14), rgb(10, 23, 87))";
} else {
    urlBar.style.background = "linear-gradient(-45deg, rgb(115, 11, 14), rgb(10, 23, 87))";
}

function handleLoadEvent() {
    const decodedPart = getUrlDecodedPart(this.contentWindow.location.href);
    urlInput.value = decodedPart || '';
}

function handleSrcChangeEvent() {
    urlInput.value = getUrlDecodedPart(this.contentWindow.location.href) || '';
}

function updateIframeUrl() {
    var inputUrl = document.querySelector("#urlInput").value.trim();
    var iframe = document.querySelector("#siteurl");
    if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(inputUrl)) {
        iframe.src = '/service/' + Ultraviolet.codec.xor.encode(inputUrl);
    } else {
        iframe.src = '/service/' + Ultraviolet.codec.xor.encode(inputUrl.includes('.') ? 'https://' + inputUrl : 'https://www.google.com/search?q=' + encodeURIComponent(inputUrl));
    }
}

function handleEnterKeyPress(event) {
    if (event.key === "Enter") {
        updateIframeUrl();
    }
}

function getUrlDecodedPart(url) {
    const decodedPart = url.split("/service/")[1];
    return decodedPart ? Ultraviolet.codec.xor.decode(decodedPart.replace(/\?/g, '=')) : null;
}

function isSearchQuery(val = "") {
    return (!/\./.test(val) && !val.startsWith("http://") && !val.startsWith("https://")) ||
        /^\S+$/.test(val);
}

var devToolsLoaded = false;

function devTools() {
  var siteIframe = document.getElementById('siteurl');
  if (siteIframe) {
    var innerDoc = siteIframe.contentDocument || siteIframe.contentWindow.document;
    var eruda = innerDoc.getElementById('eruda');

    if (!devToolsLoaded) {
      if (!eruda) {
        var erudaScript = document.createElement('script');
        erudaScript.src = "//cdn.jsdelivr.net/npm/eruda";
        erudaScript.onload = function() {
          var initScript = document.createElement('script');
          initScript.innerHTML = "eruda.init();eruda.show();";
          innerDoc.head.appendChild(initScript);
        };

        innerDoc.head.appendChild(erudaScript);
      }
    } else {
      if (eruda) {
        eruda.remove();
      }
    }
    devToolsLoaded = !devToolsLoaded;
  } else {
    console.error('Failed to load DevTools!');
  }
}

/* url bar functions */
function openWindow() {
    function openTabWithIframe(url) {
        const newTab = window.open('about:blank', '_blank');
        if (newTab) {
            const iframe = document.createElement('iframe');
            iframe.id = 'siteurl';
            iframe.src = url;
            iframe.style.position = 'fixed';
            iframe.style.inset = '0px';
            iframe.style.outline = 'none';
            iframe.style.border = 'none';
            iframe.style.height = '100%';
            iframe.style.width = '100%';
            iframe.style.overflow = 'hidden';
            newTab.document.body.appendChild(iframe);
        } else {
            console.error('Failed to open a new tab.');
        }
    }
    const abFrame = document.getElementById('siteurl');
    const currentSrc = abFrame.contentWindow.location.href;
    const targetUrl = currentSrc;
    openTabWithIframe(targetUrl);
    location.href = 'https://google.com';
}

var iframe = siteUrl;

function toggleFs() {
    if (!document.fullscreenElement) {
        iframe.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function hideBar() {
    urlBar.style.display = 'none';
    siteUrl.style.height = '100vh';
}

function reload() {
    iframe.contentWindow.location.reload();
}

function forward() {
    iframe.contentWindow.history.go(1);
}

function back() {
    iframe.contentWindow.history.go(-1);
}

function exit() {
    location.href = '/';
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
    createTabCloakButtons();
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