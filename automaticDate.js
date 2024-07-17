let urlDate =
  "https://docs.google.com/spreadsheets/d/1zjLm-nggoEbnjD9nFbtini4nclecEK9xW-T6vHlH7B0/gviz/tq?sheet=FechaCursos";

fetch(urlDate)
  .then((res) => res.text())
  .then((rep) => {
    // Analizar la respuesta JSON
    const data = JSON.parse(rep.substr(47).slice(0, -2));

    console.log(data);
    // Recorrer las filas de datos
    data.table.rows.forEach((main, rowIndex) => {
      const row = document.createElement("tr");

      // Recorrer las celdas de la fila actual
      main.c.forEach((ele, colIndex) => {
        const cell = document.createElement("td");
        row.append(cell);

        var rowValue = 0;
        var course = document.body.getAttribute("class");
        let modules = 4;

        if (course == "curso1") rowValue = 0;
        if (course == "curso2") rowValue = 2;
        if (course == "curso3") {
          rowValue = 1;
          modules = 2;
        }
        if (course == "curso4") {
          rowValue = 3;
          modules = 2;
        }
        if (course == "curso5") rowValue = 4;

        for (let i = 0; i < modules; i++) {
          if (colIndex === 1 + i && rowIndex === rowValue) {
            const fecha = new Date(ele.f.split("/").reverse().join("-"));
            const today = new Date();

            document.getElementById("courseDate" + (1 + i)).textContent = ele.f;

            if (fecha < today) {
              document.getElementById("courseDate" + (1 + i)).style.color =
                "#f3d533";
              if (course === "curso4") {
                document.getElementById("courseDate" + (1 + i)).style.color =
                  "#8bc751";
              }
            }
          }
        }
      });
    });
  });
