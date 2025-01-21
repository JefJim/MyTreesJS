document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("admin/trees/list");
        const trees = await response.json();
        console.log(trees);
        if (response.ok) {
            const treeTableBody = document.getElementById("treeBody");
            trees.forEach(tree => {
                const row = document.createElement("tr");
                row.classList.add("bg-white", "border-b", "hover:bg-green-50");

                row.innerHTML = `
                    <td class="px-6 py-4">${tree.id}</td>
                    <td class="px-6 py-4">${tree.tree_name}</td>
                    <td class="px-6 py-4">${tree.ubication}</td>
                    <td class="px-6 py-4">${tree.status}</td>
                    <td class="px-6 py-4">${tree.price}</td>
                    <td class="px-6 py-4">
                        ${tree.imageurl ? `<img src="../uploads/${tree.imageurl}" alt="Foto" class="h-16 w-16 object-cover rounded">` : ''}
                    </td>
                    <td class="px-6 py-4 space-x-2">
                        <button onclick="editTrees(${tree.id})" class="text-blue-600 hover:text-blue-800">Editar</button>
                        <button onclick="deleteTree(${tree.id})" class="text-red-600 hover:text-blue-800">Eliminar</button>
                        <button onclick="treeHistory(${tree.id})" class="text-green-600 hover:text-blue-800">Historial</button>
                    </td>
                `;
                treeTableBody.appendChild(row);
            });
        } else {
            console.error("Error al cargar árboles");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
});
function editTrees(treeId) {
    // Redirect to speciesForm.html with the species ID as a query parameter
    window.location.href = `adminTreesForm.html?id=${treeId}`;
}
function treeHistory(treeId) {
    // Redirect to speciesForm.html with the species ID as a query parameter
    window.location.href = `adminTreesHistoryForm.html?id=${treeId}`;
}
async function deleteTree(treeId) {
    const confirmDelete = confirm("¿Estás seguro de eliminar este árbol?");
    if (confirmDelete) {
        try {
            const response = await fetch(`admin/trees/delete/${treeId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Árbol eliminado con éxito");
                location.reload();
            } else {
                alert("Error al eliminar el árbol");
            }
        } catch (error) {
            console.error("Error al eliminar el árbol:", error);
            alert("Error en la solicitud");
        }
    }
}