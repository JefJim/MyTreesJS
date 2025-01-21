
document.addEventListener("DOMContentLoaded", async () => {
    const { loadCountries } = await import("../js/signup.js"); // Dinamically import the loadCountries function from signup.js
    const form = document.getElementById("adminUserForm");
    const formTitle = document.getElementById("formTitle");
    const submitButton = document.getElementById("submitButton");
    const userIdField = document.getElementById("userId");

    // Get ID from URL if exists
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");
    await loadCountries("country");
    let userCountryId = ""; // Varaible to store the user's country
    let userRolId = ""; // Variable to store the user's role

    if (userId) {
        // Edit mode
        formTitle.textContent = "Editar Usuario";
        submitButton.textContent = "Actualizar";

        try {
            const response = await fetch(`http://localhost:3000/admin/users/get/${userId}`);
            if (!response.ok) throw new Error("Error al obtener el usuario");

            const user = await response.json();
            console.log("Usuario cargado:", user);

            // Complete the form with the user data
            userIdField.value = user.id;
            document.getElementById("nombre").value = user.firstname;
            document.getElementById("apellido").value = user.lastname;
            document.getElementById("telefono").value = user.phone;
            document.getElementById("email").value = user.email;
            document.getElementById("direccion").value = user.address;
            document.getElementById("contrasena").value = user.password;
            userCountryId = user.country_id; // save the user's country
            userRolId = user.rol_id; // Save the user's role
        } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
        }
        if (userCountryId) {   // Load the countries and select the user's country
            document.getElementById("country").value = userCountryId;
        }
        if (userRolId == 1) {
            document.getElementById("rol").value = "1";
        }
        if (userRolId == 2) {
            document.getElementById("rol").value = "2";
        }
        if (userRolId == 3) {
            document.getElementById("rol").value = "3";
        }
    }
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const userData = {
            firstname: document.getElementById("nombre").value,
            lastname: document.getElementById("apellido").value,
            phone: document.getElementById("telefono").value,
            email: document.getElementById("email").value,
            address: document.getElementById("direccion").value,
            country_id: parseInt(document.getElementById("country").value),
            rol_id: parseInt(document.getElementById("rol").value),
            password: document.getElementById("contrasena").value,
        };

        console.log("Datos enviados al servidor:", userData);

        if (userId) {
            // Si hay un ID, es una actualización del usuario
            fetch(`admin/users/edit/${userId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(() => {
                    alert("Usuario actualizado correctamente");
                    window.location.href = "adminUserView.html";
                })
                .catch(error => console.error("Error al actualizar al usuario: ", error));
        } else {
            // Si no hay ID, es la creación de un usuario
            // Si el correo no existe, enviamos los datos para crear el usuario
            fetch("admin/users/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })
                .then(response => response.json())
                .then(() => {
                    alert("Usuario agregado correctamente");
                    window.location.href = "adminUserView.html";
                })
                .catch(error => console.error("Error al agregar el usuario: ", error));


        }

    });z
});

