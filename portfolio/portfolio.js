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

  for (const obj of arrayData) {
    contenedorEl.setAttribute("href", obj.url);
    imageEl.setAttribute("src", obj.imagenUrl);
    titleEl.textContent = obj.titulo;
    descriptionEl.textContent = obj.descripcion;

    let clone = document.importNode(template.content, true);
    contenedorSave.appendChild(clone);
  }
}

function main() {
  const headerContainer = document.querySelector(".header-container");
  const footerContainer = document.querySelector(".footer-container");
  insertHeader(headerContainer);
  hambuguerMenuWindow();
  insertFooter(footerContainer);

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

main();
