
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("treeForm");
    const imageform = document.getElementById("imageForm");

    const submitButton = document.getElementById("submit");
    const formTitle = document.getElementById("formTitle");
    const urlParams = new URLSearchParams(window.location.search);
    const treeId = urlParams.get("id");
    const especieSelect = document.getElementById("especie_id");
    const especieNameInput = document.getElementById("especie_name");
    const treeIdField = document.getElementById("treeId");

    // Variable para almacenar las especies y sus nombres científicoss
    let especiesData = {};

    // Cargar las opciones de especies desde el servidor
    fetch("admin/species/list")
        .then(response => response.json())
        .then(data => {
            data.forEach(especie => {
                // Almacenar el nombre científico en el objeto especiesData
                especiesData[especie.nombre_comercial] = especie.nombre_cientifico;

                // Crear y agregar la opción al select
                const option = document.createElement("option");
                option.value = especie.nombre_comercial;
                option.textContent = especie.nombre_comercial;
                especieSelect.appendChild(option);
            });


            // Actualizar el campo especie_name con el nombre científico de la primera opción
            if (especieSelect.options.length > 0) {
                const firstId = especieSelect.options[0].value;
                especieNameInput.value = especiesData[firstId] || "";
            }
        })
        .catch(error => console.error("Error al cargar las especies:", error));

    // Agregar evento change al select
    especieSelect.addEventListener("change", function () {
        const selectedId = this.value;
        // Actualizar el campo especie_name con el nombre científico correspondiente
        especieNameInput.value = especiesData[selectedId] || "";
    });
    // Crear una instancia de Date con la fecha y hora actuales
    const ahora = new Date();

    // Obtener los componentes de la fecha
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const dia = String(ahora.getDate()).padStart(2, '0');
    const fechaActual = `${año}-${mes}-${dia}`;
    if (treeId) {
        // Edit mode
        formTitle.textContent = "Editar Árbol";
        submitButton.textContent = "Actualizar";
        fetch(`admin/trees/get/${treeId}`)
            .then(response => response.json())
            .then(tree => {
                treeIdField.value = tree.id;
                document.getElementById("especie_id").value = tree.tree_name;
                document.getElementById("especie_name").value = tree.species;
                document.getElementById("ubicacion").value = tree.ubication;
                document.getElementById("estado").value = tree.status;
                document.getElementById("precio").value = tree.price;
                document.getElementById("tamano").value = tree.size;
                document.getElementById("image").files[0] = "../uploads/"+tree.imageurl;
            })
            .catch(error => console.error("Error al obtener el árbol:", error));
    }
    submitButton.addEventListener("click", async (event) => {
        event.preventDefault();
        const treeData = {
            id: parseInt(treeIdField.value),
            tree_name: document.getElementById("especie_id").value,
            species: document.getElementById("especie_name").value,
            price: parseFloat(document.getElementById("precio").value),
            size: document.getElementById("tamano").value,
            ubication: document.getElementById("ubicacion").value,
            status: document.getElementById("estado").value,
            imageurl: document.getElementById("image").files[0].name,
            date: fechaActual,
        };

        if (treeId) {
            // Si hay un ID, es una actualización del árbol
            fetch(`admin/trees/edit/${treeId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(treeData)
            })
                .then(response => response.json())
                .then(() => {
                    alert("Árbol actualizado correctamente");
                    window.location.href = "adminTreesView.html";
                })
                .catch(error => console.error("Error al actualizar el árbol: ", error));

        } else {
            // Si no hay ID, es la creación de un árbol
            // Si el correo no existe, enviamos los datos para crear el árbol
            fetch("admin/trees/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(treeData)
            })
                .then(response => response.json())
                .then(() => {
                    alert("Árbol creado correctamente");
                    window.location.href = "adminTreesView.html";
                })
                .catch(error => console.error("Error al agregar el árbol: ", error));
        }
    });
});