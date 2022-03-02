function insertFooter(element) {
  const headerCompEl = document.createElement("div");
  element.innerHTML = `
  
  <div class="footer-comp">
  <span class="footer-text">Pagina web diseñada por</span>
  <div><img src="./images/logo.png" class="footer-comp__logo"></div>
  </div>`;
  element.appendChild(headerCompEl);
}
