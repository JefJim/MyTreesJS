document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("admin/stats");
        const data = await response.json();

        if (data.success) {
            document.getElementById("totalAmigos").innerText = data.totalAmigos;
            document.getElementById("totalArbolesDisponibles").innerText = data.totalArbolesDisponibles;
            document.getElementById("totalArbolesVendidos").innerText = data.totalArbolesVendidos;
        } else {
            console.error("Error al cargar estadísticas:", data.message);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
});
