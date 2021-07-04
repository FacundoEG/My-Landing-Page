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

function main() {
  hambuguerMenuWindow();
}

main();
