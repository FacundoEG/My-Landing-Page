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

function crearServicios(arrayData) {
  const contenedorSave = document.querySelector(
    ".services-container__template-box"
  );
  const template = document.querySelector("#services-cards__template");

  const imageEl = template.content.querySelector(".services-temp-box__img");
  const titleEl = template.content.querySelector(
    ".services-template-card__title"
  );
  const descriptionEl = template.content.querySelector(
    ".services-template-card__p"
  );

  for (const obj of arrayData) {
    imageEl.setAttribute("src", obj.imagenUrl);
    titleEl.textContent = obj.titulo;
    descriptionEl.textContent = obj.descripcion;

    let clone = document.importNode(template.content, true);
    contenedorSave.appendChild(clone);
  }
}

function importarServices() {
  fetch(
    "https://cdn.contentful.com/spaces/qrsguk0kca31/environments/master/entries?access_token=dbzToas8F8Td4jFrmeLd843c69EgYp9q0JJVOSR2jvk&content_type=services"
  )
    .then((res) => {
      return res.json();
    })
    .then((r) => {
      const contentfullServices = r.items.map((obj) => {
        return {
          titulo: obj.fields.title,
          descripcion: obj.fields.text,
          includes: r.includes.Asset.find((inc) => {
            const includesDeLaFoto = inc.sys.id == obj.fields.image.sys.id;
            return includesDeLaFoto;
          }),
        };
      });
      contentfullServices.forEach((obj) => {
        obj.imagenUrl = "https:" + obj.includes.fields.file.url;
        delete obj.includes;
      });

      crearServicios(contentfullServices);
    });
}

function sendFormData() {
  const myContactForm = document.querySelector(".contact-form");
  myContactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formDataFinal = {
      Nombre: formData.get("nombre"),
      Email: formData.get("email"),
      Mensaje: formData.get("mensaje"),
    };

    const data = {
      to: formDataFinal.Email,
      message: formDataFinal.Mensaje,
    };

    fetch("https://apx-api.vercel.app/api/utils/dwf", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Ocurrio un error!", error))
      .then((res) => console.log("Salio todo bien!", res));
  });
}

function main() {
  const headerContainer = document.querySelector(".header-container");
  const footerContainer = document.querySelector(".footer-container");
  importWelcomeContent();
  importAboutMeContent();
  importarServices();
  insertHeader(headerContainer);
  hambuguerMenuWindow();
  insertFooter(footerContainer);
  sendFormData();
}

main();
