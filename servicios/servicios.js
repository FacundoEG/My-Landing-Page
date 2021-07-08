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

function main() {
  const headerContainer = document.querySelector(".header-container");
  const footerContainer = document.querySelector(".footer-container");
  insertHeader(headerContainer);
  hambuguerMenuWindow();

  importarServices();
  insertFooter(footerContainer);
}

main();