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

  const second = contenedorSave.children[2];
  second.classList.toggle("reverse", window.innerWidth >= 900);

  window.addEventListener("resize", () => {
    second.classList.toggle("reverse", window.innerWidth >= 900);
  });
}

function crearContenedores(arrayData) {
  const contenedorSave = document.querySelector(".portfolio-container");
  const template = document.querySelector("#portfolio-template");

  const contenedorEl = template.content.querySelector(
    ".portfolio-contenedores"
  );
  const imageEl = template.content.querySelector(".contenedor-imagen");
  const titleEl = template.content.querySelector(".contenedor-titulo");
  const descriptionEl = template.content.querySelector(
    ".contenedor-descripcion"
  );
  const buttonEl = template.content.querySelector(".contenedor-ver-button");

  for (const obj of arrayData) {
    buttonEl.setAttribute("href", obj.url);
    imageEl.setAttribute("src", obj.imagenUrl);
    titleEl.textContent = obj.titulo;
    descriptionEl.textContent = obj.descripcion;

    let clone = document.importNode(template.content, true);
    contenedorSave.appendChild(clone);
  }
}

function importPortfolio() {
  fetch(
    "https://cdn.contentful.com/spaces/qrsguk0kca31/environments/master/entries?access_token=3uFP6_n4ROLEoUy7DIUbtSMTYo_f-KQZQevLVrdVFKg&content_type=work"
  )
    .then((res) => {
      return res.json();
    })
    .then((r) => {
      const contentfullObjs = r.items.map((obj) => {
        return {
          titulo: obj.fields.titulo,
          descripcion: obj.fields.descripcion,
          url: obj.fields.url,
          includes: r.includes.Asset.find((inc) => {
            const includesDeLaFoto = inc.sys.id == obj.fields.imagen.sys.id;
            return includesDeLaFoto;
          }),
        };
      });

      contentfullObjs.forEach((obj) => {
        obj.imagenUrl = "https:" + obj.includes.fields.file.url;
        delete obj.includes;
      });

      crearContenedores(contentfullObjs);
    });
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

function insertContact(element) {
  const headerCompEl = document.createElement("header");
  headerCompEl.innerHTML = `<div class="contact-comp">  
    <h2 class="contact-form__title">Escribime</h2>
    <form class="contact-form">
    <label class="contact-form__label">
    <span>NOMBRE</span>
    <input name="nombre" type="text" class="contact-form__input">
    </label>
    <label class="contact-form__label">EMAIL
    <input name="email" type="text" type="email" class="contact-form__input"></label>
    <label class="contact-form__label">MENSAJE
    <textarea name="mensaje" class="contact-form__textarea"></textarea>
    </label>
    <button class="contact-form__button">Enviar</button>
    </form>
  </div>`;
  element.appendChild(headerCompEl);
}

function sendFormData() {
  const myContactForm = document.querySelector(".contact-form");
  const contactFormButton = document.querySelector(".contact-form__button");
  myContactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formDataFinal = {
      Nombre: formData.get("nombre"),
      Email: formData.get("email"),
      Mensaje: formData.get("mensaje"),
    };
    const { Email, Nombre, Mensaje } = formDataFinal;

    if (!Email || !Nombre || !Mensaje) {
      contactFormButton.classList.toggle("error");
      contactFormButton.textContent = "Faltan datos para enviar el mensaje!";
      setTimeout(() => {
        contactFormButton.textContent = "Enviar";
        contactFormButton.classList.toggle("error");
      }, 3000);
    } else {
      const data = {
        to: Email,
        message: `${Nombre} quiere comuncarse con nosotros, dejo el siguiente mensaje: ${Mensaje} `,
      };

      fetch("https://apx-api.vercel.app/api/utils/dwf", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .catch((error) => console.error("Ocurrio un error!", error))
        .then(() => {
          contactFormButton.innerHTML = `
          <div class="loader">
          <div class="big-circle">
            <div class="small-circle"></div>
          </div>
        </div>`;
          setTimeout(() => {
            myContactForm.reset();
            contactFormButton.textContent = "Mensaje enviado!";
          }, 3000);
        });
    }
    setTimeout(() => {
      contactFormButton.textContent = "Enviar";
    }, 7000);
  });
}

function main() {
  const headerContainer = document.querySelector(".header-container");
  const footerContainer = document.querySelector(".footer-container");
  const contactContainer = document.querySelector(".contact-container");

  importAboutMeContent();
  importarServices();
  insertHeader(headerContainer);
  scrollToggle();
  hambuguerMenuWindow();
  importPortfolio();
  insertFooter(footerContainer);
  insertContact(contactContainer);
  sendFormData();
}

main();
