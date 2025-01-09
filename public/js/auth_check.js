document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (!user) {
        window.location.href = "/login.html"; // if it's not logged in, redirect to login
        return;
    }

    const isAdminPage = window.location.pathname.includes("admin");
    
    if (isAdminPage && user.isAdmin !== 1) {
        window.location.href = "/access_denied.html"; // if it's not an admin, redirect to access denied
    }
});
