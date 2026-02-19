
document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('forgotPasswordForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var email = document.getElementById('email').value.trim();
        var errorMsg = document.getElementById('fpErrorMsg');
        errorMsg.style.display = 'none';
        errorMsg.innerText = '';

        var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            errorMsg.innerText = 'Please enter a valid email address.';
            errorMsg.style.display = 'block';
            return;
        }

        // Simulated check for email association (for demo, only these emails are valid)
        var validEmails = ['user1@example.com', 'user2@example.com', 'test@bookstore.com','pranav.tungani@gmail.com'];
        if (!validEmails.includes(email)) {
            errorMsg.innerText = 'This email address is not associated with any account.';
            errorMsg.style.display = 'block';
            return;
        }

        alert('A password reset link has been sent to your email.');
        form.reset();
    });
});
