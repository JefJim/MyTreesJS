document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("speciesForm");
    const formTitle = document.getElementById("formTitle");
    const submitButton = document.getElementById("submitButton");
    const speciesIdInput = document.getElementById("species_id");
    const nombreComercialInput = document.getElementById("nombre_comercial");
    const nombreCientificoInput = document.getElementById("nombre_cientifico");

    // Get parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const speciesId = urlParams.get("id");

    if (speciesId) {
        // If there is a species ID, change form title and submit button text
        formTitle.textContent = "Editar Especie";
        submitButton.textContent = "Actualizar";

        // Load species data from backend
        fetch(`/species/get/${speciesId}`)
            .then(response => response.json())
            .then(data => {
                speciesIdInput.value = data.id;
                nombreComercialInput.value = data.nombre_comercial;
                nombreCientificoInput.value = data.nombre_cientifico;
            })
            .catch(error => console.error("Error al obtener la especie:", error));
    }

    // Handle form submit
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const speciesData = {
            nombre_comercial: nombreComercialInput.value,
            nombre_cientifico: nombreCientificoInput.value
        };

        if (speciesId) {
            // if there is an ID, is an update species
            fetch(`/species/update/${speciesId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(speciesData)
            })
                .then(response => response.json())
                .then(() => {
                    alert("Especie actualizada correctamente");
                    window.location.href = "species.html";
                })
                .catch(error => console.error("Error al actualizar la especie:", error));
        } else {
            // If there is no ID, is a create species
            fetch("/species/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(speciesData)
            })
                .then(response => response.json())
                .then(() => {
                    alert("Especie agregada correctamente");
                    window.location.href = "species.html";
                })
                .catch(error => console.error("Error al agregar la especie:", error));
        }
    });
});
