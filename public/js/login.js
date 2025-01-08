document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/login', { // Asegúrate de enviar al endpoint correcto
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        sessionStorage.setItem('user', JSON.stringify(data.user));

        // Redirige según el rol
        if (data.user.isAdmin == 1) {
            window.location.href = '/admin.html';
        } else {
            window.location.href = '/users.html';
        }
    } else {
        alert('Error en login: ' + data.message);
    }
});

