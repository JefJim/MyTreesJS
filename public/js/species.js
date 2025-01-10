//load species in front end
document.addEventListener("DOMContentLoaded", async () => {
    const speciesTableBody = document.getElementById("speciesTableBody");

    async function fetchSpecies() {
        try {
            const response = await fetch("species/list");
            const speciesList = await response.json();
            speciesTableBody.innerHTML = speciesList.map(species => `
                <tr class="bg-white border-b hover:bg-green-50">
                    <td class="px-6 py-4">${species.id}</td>
                    <td class="px-6 py-4">${species.nombre_comercial}</td>
                    <td class="px-6 py-4">${species.nombre_cientifico}</td>
                    <td class="px-6 py-4 space-x-2">
                        <button onclick="editSpecies(${species.id})" class="text-blue-600 hover:text-blue-800">Editar</button>
                        <button onclick="deleteSpecies(${species.id})" class="text-red-600 hover:text-red-800">Eliminar</button>
                    </td>
                </tr>
            `).join("");
        } catch (error) {
            console.error("Error al obtener especies:", error);
        }
    }

    fetchSpecies();
});
function editSpecies(speciesId) {
    // Redirect to speciesForm.html with the species ID as a query parameter
    window.location.href = `speciesForm.html?id=${speciesId}`;
}
async function deleteSpecies(id) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar esta especie?");
    
    if (!confirmDelete) return;

    try {
        const response = await fetch(`http://localhost:3000/admin/species/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            alert("Especie eliminada correctamente.");
            location.reload(); // Reload the page
        } else {
            alert("Error al eliminar la especie.");
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        alert("Hubo un problema al conectar con el servidor.");
    }
}
