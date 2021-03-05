//---------------   MAIN FLOW
loadGoogleAdsLibrary();
lodaSwal();
AddOnLoadEvent(initReklam8);

function initReklam8() {
  window.ana = document.location.pathname === "/" ? true : false;
  var ads = document.querySelectorAll(".reklam8");
  ads.forEach(ad => {
    var { cat, sid } = ad.dataset;
    window.reklam8Ads = window.reklam8Ads ? window.reklam8Ads + 1 : 1;

    fetch(`https://api.reklam8.net/kaynak.asp?catid=${cat}&siteid=${sid}`)
      .then(response => response.text())
      .then(data => {
        window.reklam8Ads--;
        if (data == 'yok') {
          ad.style = 'display:none;'
        }

        else if (data.includes(`<!--17-->`)) {

          if (window.ana) {
            var myhtml = document.createElement("div");
            myhtml.innerHTML = `<div id="reklam${cat}">${data}</div>`;
            new swal({ width: 900, timer: 100000, showCloseButton: true, html: myhtml, });
          }

          else if (sessionStorage.getItem("reklam") == "var") { }
          else {
            sessionStorage.setItem("reklam", "var");
            var myhtml = document.createElement("div");
            myhtml.innerHTML = `<div id="reklam${cat}">${data}</div>`;
            new swal({ width: 900, timer: 100000, showCloseButton: true, html: myhtml, });
          }
        }

        else if (data.includes("google")) {
          window.reklam8GoogleAds = window.reklam8GoogleAds ? window.reklam8GoogleAds + 1 : 1;
          ad.innerHTML = data;
          console.log(window.reklam8Ads + " " + window.reklam8GoogleAds)
          setTimeout(function () {
            console.log("google reklam");
            (adsbygoogle = window.adsbygoogle || []).push({})
          }, 500)
        }

        else {
          ad.innerHTML = data;
        }
      });
    //end of fetch then
  })
  //end of ads loop
}
//end of init

//-----------------    HELPERS

//LOAD EXTERNAL FILES
function loadExternalFile(filename, filetype, isAsync) {
  if (filetype == "js") { //if filename is a external JavaScript file
    var fileref = document.createElement('script')
    fileref.setAttribute("type", "text/javascript")
    fileref.setAttribute("src", filename);
    isAsync ? fileref.setAttribute("async", "") : "";
  }
  else if (filetype == "css") { //if filename is an external CSS file
    var fileref = document.createElement("link")
    fileref.setAttribute("rel", "stylesheet")
    fileref.setAttribute("type", "text/css")
    fileref.setAttribute("href", filename)
    isAsync ? fileref.setAttribute("async", "") : "";
  }
  if (typeof fileref != "undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}

//LOAD SWAL
function lodaSwal() {
  loadExternalFile("https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.19.2/sweetalert2.all.js", "js");
  loadExternalFile("https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/7.19.2/sweetalert2.css", "css")

  var customSwalStyle = document.createElement("style");
  customSwalStyle.innerHTML = `
.swal2-popup .swal2-styled.swal2-confirm,.select-wrapper{
	display:none;}
	
	@media only screen and (max-width: 850px) {
	.swal2-popup #swal2-content img {
	width: 300px !important;
	height: 215px !important;
	}
	}
`
  document.getElementsByTagName("head")[0].appendChild(customSwalStyle)
}

function loadGoogleAdsLibrary() {
  const googlAdsURL = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  loadExternalFile(googlAdsURL, "js", true);
}

//ADD TO ON LOAD EVENT
function AddOnLoadEvent(functionX) {
  var oldonloadevent = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = functionX;
  }
  else {
    window.onload = function () {
      if (oldonloadevent) {
        oldonloadevent();
      }
      functionX();
    }
  }
}