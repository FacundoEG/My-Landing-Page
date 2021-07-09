function insertContact(element) {
  const headerCompEl = document.createElement("header");
  headerCompEl.innerHTML = `<div class="contact-comp">  
    <h2 class="contact-form__title">Escribime</h2>
    <form class="contact-form">
    <label class="contact-form__label" for="nombre">NOMBRE</label>
    <input name="nombre" type="text" class="contact-form__input">
    <label class="contact-form__label">EMAIL</label>
    <input name="email" type="text" type="email" class="contact-form__input">
    <label class="contact-form__label">Mensaje</label>
    <textarea name="mensaje" class="contact-form__textarea"></textarea>
    <button class="contact-form__button">Enviar</button>
    </form>
  </div>`;
  element.appendChild(headerCompEl);
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
