document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("admin/stats");
        const data = await response.json();

        if (data.success) {
            document.getElementById("totalAmigos").innerText = data.stats.totalAmigos;
            document.getElementById("totalArbolesDisponibles").innerText = data.stats.totalArbolesDisponibles;
            document.getElementById("totalArbolesVendidos").innerText = data.stats.totalArbolesVendidos;
        } else {
            console.error("Error al cargar estadísticas:", data.message);
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
    }
});
