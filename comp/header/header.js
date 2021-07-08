function insertHeader(element) {
  const headerCompEl = document.createElement("header");
  headerCompEl.innerHTML = `     <header class="header-comp">
  <a href="/index.html"><img src="https://raw.githubusercontent.com/FacundoEG/desafio-dwf-m4/main/images/logo.png" class="header-comp__logo"></a>
  <div class="header-comp__window-menu">
   <button class="header-comp__window-closebutton">
     <img src="https://raw.githubusercontent.com/FacundoEG/desafio-dwf-m4/main/images/x-mark.png">
   </button>
   <div class="header-comp__window-menu-link">
     <a href="">Portfolio</a>
     <a href="./servicios.html">Mis Servicios</a>
     <a href="">Contacto</a>
   </div>
  </div>
  <div class="header-comp__menu">
    <div class="header-comp__links-container">
      <a href="">Portfolio</a>
      <a href="./servicios.html">Mis Servicios</a>
      <a href="">Contacto</a>
    </div>
    <button class="header-comp__hamburger-menu">
      <img src="https://raw.githubusercontent.com/FacundoEG/desafio-dwf-m4/main/images/hamburguer-vector.png" class="header-comp__hamburger-logo">
    </button>
  </div>
</header>`;
  element.appendChild(headerCompEl);
}

function hambuguerMenuWindow() {
  const hamburguerButtonEl = document.querySelector(
    ".header-comp__hamburger-menu"
  );
  const hamburguerMenuEl = document.querySelector(".header-comp__window-menu");
  const windowCloseButtonEl = document.querySelector(
    ".header-comp__window-closebutton"
  );
  hamburguerButtonEl.addEventListener("click", () => {
    hamburguerMenuEl.style.display = "flex";
  });
  windowCloseButtonEl.addEventListener("click", () => {
    hamburguerMenuEl.style.display = "";
  });
}
