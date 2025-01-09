document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupForm").addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent form to reload page 
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
                window.location.href = "../login.html"; // after register, redirect to login
            } else {
                document.getElementById("errorMessage").innerHTML = result.message;
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            document.getElementById("errorMessage").innerHTML = "Error en la conexión con el servidor.";
        }
    });
});

// Function to load countries into a select element
function loadCountries(selectId) {
    fetch('/api/users/countries')  // call the API to get the countries
        .then(response => response.json())  // convert the response to JSON
        .then(data => {
            const countrySelect = document.getElementById(selectId);  // use the parameter to get the select element
            // clean the select element
            countrySelect.innerHTML = '<option value="">Seleccione un país</option>';
            
            // add each country as an option in the select element
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.id;  // El valor será el ID del país
                option.textContent = country.name;  // El texto visible será el nombre del país
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar los países:', error));
}

// export the function to be used in other files
export { loadCountries };



