
var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementsByTagName('header')[0].style.top = "0";
  } else {
    document.getElementsByTagName('header')[0].style.top = "-250px";
  }
  prevScrollpos = currentScrollPos;
}

toggleMenuVisible = () => {
  var x = document.getElementById("topnav"), m = document.getElementById("menu"); //rotate
  if (menuVisible) {
    x.className = "";
    m.className = "icon stand";
  } else {
    x.className = "active";
    m.className = "icon rotate";
  }
  menuVisible = !menuVisible;
};

document.getElementById("menu").addEventListener('click', toggleMenuVisible, false);
var authVisible = false;
var menuVisible = false;
var toggleAuthVisible = () => {
  var x = document.getElementById("auth");
  x.style.visibility = authVisible ? "hidden" : "visible";
  authVisible = !authVisible;
};

/*
document.getElementById("auth").addEventListener('click', function() {
  toggleAuthVisible();
}, false);*/




const target = document.querySelector('#auth_window');
const target1 = document.querySelector('#topnav');

/*
const onClickOutside = (e) => {
  console.log(e.target.className);
  if (!e.target.className.includes("auth_window")) {
    toggleAuthVisible();
    window.removeEventListener("click", onClickOutside);
  }
};*/
const onClickOutside = (e) => {
  //костыль. TODO: resolve
  if(authVisible)
    if(!e.composedPath().includes(document.getElementById("auth_button")))
      if (!e.composedPath().includes(target)) {
        toggleAuthVisible();
        return;
      }

  if(menuVisible)
    if(!e.composedPath().includes(document.getElementById("menu")))
      if (!e.composedPath().includes(target1))
        toggleMenuVisible();
};

window.addEventListener("click", onClickOutside);

document.getElementById("auth_button").addEventListener('click', toggleAuthVisible, false);
