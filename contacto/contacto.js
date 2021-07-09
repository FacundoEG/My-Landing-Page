function main() {
  const headerContainer = document.querySelector(".header-container");
  const footerContainer = document.querySelector(".footer-container");
  const contactContainer = document.querySelector(".contacto-container");
  insertHeader(headerContainer);
  hambuguerMenuWindow();
  insertFooter(footerContainer);
  insertContact(contactContainer);
  sendFormData();
}

main();
