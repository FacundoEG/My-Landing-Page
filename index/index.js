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

function importWelcomeContent() {
  fetch(
    "https://cdn.contentful.com/spaces/qrsguk0kca31/environments/master/entries?access_token=dbzToas8F8Td4jFrmeLd843c69EgYp9q0JJVOSR2jvk&content_type=welcome"
  )
    .then((res) => {
      return res.json();
    })
    .then((r) => {
      const titleWelcome = document.querySelector(".welcome-container__title");
      const subtitleWelcome = document.querySelector(
        ".welcome-container__subtitle"
      );

      for (const item of r.items) {
        titleWelcome.textContent = item.fields.pagetitle;
        subtitleWelcome.textContent = item.fields.pagesubtitle;
      }
    });
}

function importAboutMeContent() {
  fetch(
    "https://cdn.contentful.com/spaces/qrsguk0kca31/environments/master/entries?access_token=dbzToas8F8Td4jFrmeLd843c69EgYp9q0JJVOSR2jvk&content_type=presentation"
  )
    .then((res) => {
      return res.json();
    })
    .then((r) => {
      const aboutMeTitle = document.querySelector(".about-me__title");
      const aboutMeText = document.querySelector(".about-me__text");

      for (const item of r.items) {
        aboutMeTitle.textContent = item.fields.titulo;
        aboutMeText.textContent = item.fields.texto;
      }
    });
}

function main() {
  hambuguerMenuWindow();
  importWelcomeContent();
  importAboutMeContent();

  console.log("Soy el main");
}

main();
