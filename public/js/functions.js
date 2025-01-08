document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Evita el envío tradicional del formulario
        var select = document.getElementById("country").selectedIndex;
        const formData = new FormData(this);
        const userData = {
            firstname: formData.get("firstname"),
            lastname: formData.get("lastname"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            address: formData.get("address"),
            country: select,
            password: formData.get("password"),
        };

        if (userData.password.length < 3) {
            document.getElementById("errorMessage").innerHTML = "La contraseña debe tener más de 3 caracteres.";
            document.getElementById("errorMessage").style.color = "red";
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                window.location.href = "../login.html"; // Redirigir a la página de login (opcional)
            } else {
                document.getElementById("errorMessage").innerHTML = result.message;
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            document.getElementById("errorMessage").innerHTML = "Error en la conexión con el servidor.";
        }
    });
});
// loadCountries.js

// Función para cargar los países en un combobox específico
function loadCountries(selectId) {
    fetch('/api/users/countries')  // Llamar a la ruta API /countries
        .then(response => response.json())  // Convertir la respuesta a formato JSON
        .then(data => {
            const countrySelect = document.getElementById(selectId);  // Usar el ID del select que pasamos como argumento
            // Limpiar el combobox antes de cargar los nuevos países
            countrySelect.innerHTML = '<option value="">Seleccione un país</option>';
            
            // Agregar cada país al combobox
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.id;  // El valor será el ID del país
                option.textContent = country.name;  // El texto visible será el nombre del país
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los países:', error));
}

// Exportar la función para usarla en otros archivos
export { loadCountries };



