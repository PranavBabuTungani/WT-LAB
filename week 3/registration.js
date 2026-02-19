// registration.js - Security and validation for registration form

document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('registrationForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var username = document.getElementById('username').value.trim();
        var password = document.getElementById('password').value;
        var confirmPassword = document.getElementById('confirmPassword').value;
        var errorMsg = document.getElementById('errorMsg');
        errorMsg.style.display = 'none';
        errorMsg.innerText = '';

        // Username validation
        if (username.length < 5) {
            errorMsg.innerText = 'Username must be at least 5 characters long.';
            errorMsg.style.display = 'block';
            return;
        }
        // Password validation
        if (password.length < 8) {
            errorMsg.innerText = 'Password must be at least 8 characters long.';
            errorMsg.style.display = 'block';
            return;
        }
        // Password strength (at least 1 uppercase, 1 lowercase, 1 number)
        var strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
        if (!strongRegex.test(password)) {
            errorMsg.innerText = 'Password must contain uppercase, lowercase, and a number.';
            errorMsg.style.display = 'block';
            return;
        }
        // Confirm password
        if (password !== confirmPassword) {
            errorMsg.innerText = 'Passwords do not match.';
            errorMsg.style.display = 'block';
            return;
        }
        // All validations passed
        alert('Registration successful!');
        form.reset();

        // Navigate to the content page after successful registration
        window.location.href = 'navigation.html';
    });
});
