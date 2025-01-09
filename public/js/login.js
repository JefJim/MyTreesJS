document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form to reload page 
    const formData = new FormData(this);
    const email = formData.get('email');
    const password = formData.get('password');

    const response = await fetch('/api/auth/login', { // Send endpoint correctly
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        sessionStorage.setItem('user', JSON.stringify(data.user));

        // redirects according to role
        if (data.user.isAdmin == 1) {
            window.location.href = '/admin.html';
        } else {
            window.location.href = '/users.html';
        }
    } else {
        alert('Error en login: ' + data.message);
    }
});

