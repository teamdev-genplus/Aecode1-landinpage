function mostrarFormulario() {
  // Obtener la capa modal por su ID
  var modal = document.getElementById("miModal");
  var sliderTitulos = document.getElementById("sliderTitulos");

  // Mostrar la capa modal
  modal.style.display = "flex";
  sliderTitulos.style.display = "none";
}

function mostrarFormulario2() {
  // Obtener la capa modal por su ID
  var modal = document.getElementById("miModal");
  var modal2 = document.getElementById("miModal2");
  var sliderTitulos = document.getElementById("sliderTitulos");

  // Mostrar la capa modal
  modal.style.display = "none";
  modal2.style.display = "flex";
  sliderTitulos.style.display = "none";
}

function cerrarFormulario() {
  // Obtener la capa modal por su ID
  var modal = document.getElementById("miModal");
  var sliderTitulos = document.getElementById("sliderTitulos");
  var contenedorTitulos = document.getElementById("contenedorTitulos");
  var paginatorSwiper = document.getElementById("paginatorSwiper");

  // Ocultar la capa modal
  modal.style.display = "none";
  if (window.innerWidth < 1200) {
    // Mostrar sliderTitulos solo si el ancho es menor a 1200px
    sliderTitulos.style.display = "block";
  } else {
    sliderTitulos.style.display = "none";
    contenedorTitulos.style.paddingTop = "initial";
    contenedorTitulos.style.display = "flex";
  }
}

function cerrarFormulario2() {
  // Obtener la capa modal por su ID
  var modal = document.getElementById("miModal2");
  var sliderTitulos = document.getElementById("sliderTitulos");
  var paginatorSwiper = document.getElementById("paginatorSwiper");
  var contenedorPalabrasClave = document.getElementById(
    "contenedorPalabrasClave"
  );

  // Ocultar la capa modal
  modal.style.display = "none";
  sliderTitulos.style.display = "initial";
  paginatorSwiper.style.display = "initial";
  contenedorPalabrasClave.style.marginTop = "-12%";
}

// Función desplegable para el contenido de los cursos
function toggleModule(moduleId) {
  var moduleContent = document.getElementById(moduleId);
  var arrowDown = document.getElementById("arrowDown" + moduleId.slice(-2));
  var arrowUp = document.getElementById("arrowUp" + moduleId.slice(-2));

  // Cerrar todos los módulos excepto el seleccionado
  var allModuleContents = document.querySelectorAll(".module-content");
  allModuleContents.forEach(function (otherModule) {
    if (otherModule.id !== moduleId) {
      otherModule.style.maxHeight = "0";
      otherModule.style.border = "none";
      otherModule.classList.add("closing"); // Agrega la clase para cerrar sin animación

      // Ocultar arrowUp y mostrar arrowDown de los módulos cerrados
      var otherArrowDown = document.getElementById(
        "arrowDown" + otherModule.id.slice(-2)
      );
      var otherArrowUp = document.getElementById(
        "arrowUp" + otherModule.id.slice(-2)
      );
      otherArrowDown.style.display = "block";
      otherArrowUp.style.display = "none";
    }
  });

  if (
    moduleContent.style.maxHeight === "0px" ||
    moduleContent.style.maxHeight === ""
  ) {
    moduleContent.style.maxHeight = "1000px"; // Ajusta esto según sea necesario
    moduleContent.classList.remove("closing"); // Elimina la clase de cerrar sin animación
    arrowDown.style.display = "none";
    moduleContent.style.border = "1px solid rgb(197, 195, 195)";
    arrowUp.style.display = "block";
  } else {
    moduleContent.style.maxHeight = "0";
    moduleContent.classList.add("closing"); // Agrega la clase para cerrar sin animación
    moduleContent.style.border = "none";
    arrowDown.style.display = "block";
    arrowUp.style.display = "none";
  }
}

// Función para los 3 desplegables generales
function toggleContent(contentId, angleUpId, angleDownId) {
  var content = document.getElementById(contentId);
  var button = content.previousElementSibling;
  var angleUp = document.getElementById(angleUpId);
  var angleDown = document.getElementById(angleDownId);

  if (button.classList.contains("active")) {
    content.style.maxHeight = "none";
    content.style.display = "block";
    angleUp.style.display = "block";
    angleDown.style.display = "none";
  } else {
    content.style.maxHeight = "0";
    content.style.display = "none";
    angleUp.style.display = "none";
    angleDown.style.display = "block";
  }

  button.classList.toggle("active");
}

function toggleContent1(angleUpId, angleDownId) {
  var buttons = document.querySelectorAll(".contentBtnModules");

  // Itera sobre los elementos y alterna la visibilidad
  buttons.forEach(function (button) {
    button.style.display =
      button.style.display === "none" || button.style.display === ""
        ? "flex"
        : "none";
  });
  buttons.forEach(function (button) {
    // Obtiene el contenedor del contenido asociado al botón
    var content = button.nextElementSibling;

    content.style.display =
      content.style.display === "none" || content.style.display === ""
        ? "block"
        : "none";

    var angleUp = document.getElementById(angleUpId);
    var angleDown = document.getElementById(angleDownId);

    if (content.style.display === "flex") {
      angleUp.style.display = "inline-block";
      angleDown.style.display = "none";
    } else {
      angleUp.style.display = "none";
      angleDown.style.display = "inline-block";
    }
  });
}

function handleInputChange() {
  var checkbox = document.getElementById("descuento3Id1");

  if (checkbox.checked) {
    fetch(url1)
      .then((res) => res.text())
      .then((rep) => {
        // Analizar la respuesta JSON
        const data = JSON.parse(rep.substr(47).slice(0, -2));
        // Recorrer las filas de datos
        data.table.rows.forEach((main, rowIndex) => {
          const row = document.createElement("tr");

          // Recorrer las celdas de la fila actual
          main.c.forEach((ele, colIndex) => {
            const cell = document.createElement("td");
            cell.textContent = ele.v;
            row.append(cell);

            // Verificar si estamos en la columna y fila que queremos
            if (colIndex == 2) {
              if (document.getElementById("cuponId1").value == ele.v) {
                calcularDescuento3("descuento3Id1");
              }
              calcularPrecioFinal1();
            } else {
              document.getElementById("dsct3Id1").textContent = (0).toFixed(2);
            }
          });
        });
      });
  }
}
