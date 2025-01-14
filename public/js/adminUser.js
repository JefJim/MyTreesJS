// funtion to get the role text
function getRoleText(rol_id) {
    switch (rol_id) {
        case 1: return "Cliente";
        case 2: return "Administrador";
        case 3: return "Operador";
        default: return "Desconocido"; // En caso de que haya un rol no definido
    }
}
//load species in front end
document.addEventListener("DOMContentLoaded", async () => {
    const speciesTableBody = document.getElementById("usersTableBody");

    async function fetchUsers() {
        try {
            const response = await fetch("/admin/users/list");
            const usersList = await response.json();
            console.log(usersList);
            speciesTableBody.innerHTML = usersList.map(users => `
                <tr class="bg-white border-b hover:bg-green-50">
                    <td class="px-6 py-4">${users.id}</td>
                    <td class="px-6 py-4">${users.firstname}</td>
                    <td class="px-6 py-4">${users.lastname}</td>
                    <td class="px-6 py-4">${users.email}</td>
                    <td class="px-6 py-4">${getRoleText(users.rol_id)}</td>

                    <td class="px-6 py-4 space-x-2">
                        <button onclick="editUser(${users.id})" class="text-blue-600 hover:text-blue-800">Editar</button>
                        <button onclick="deleteUser(${users.id})" class="text-red-600 hover:text-red-800">Eliminar</button>
                    </td>
                </tr>
            `).join("");
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
        }
    }

    fetchUsers();
});
function editUser(speciesId) {
    // Redirect to adminUserForm.html with the species ID as a query parameter to edit
    window.location.href = `adminUserForm.html?id=${speciesId}`;
}
async function deleteUser(id) {
    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar este usuario?");

    if (!confirmDelete) return;

    try {
        const response = await fetch(`http://localhost:3000/admin/users/delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            alert("Usuario eliminado correctamente.");
            location.reload(); // Reload the page
        } else {
            alert("Error al eliminar el usuario.");
        }
    } catch (error) {
        console.error("Error en la petición:", error);
        alert("Hubo un problema al conectar con el servidor.");
    }
}
