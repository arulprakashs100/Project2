const API_BASE_URL = 'http://localhost:8080/api/auth';

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // Login Page Logic
    // ==========================================
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload on submit

            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const errorMessage = document.getElementById('errorMessage');

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!email || !password) {
                errorMessage.textContent = 'Please fill in both email and password.';
                return;
            }

            if (!emailInput.checkValidity()) {
                errorMessage.textContent = 'Please enter a valid email address.';
                return;
            }

            errorMessage.textContent = '';

            fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email, password: password })
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    localStorage.setItem('userEmail', data.email);
                    window.location.href = 'welcome.html';
                } else {
                    errorMessage.textContent = data.message || 'Login failed';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.textContent = 'Server connection error. Is backend running?';
            });
        });
    }

    // ==========================================
    // Register Page Logic
    // ==========================================
    const registerForm = document.getElementById('registerForm');

    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('regEmail');
            const passwordInput = document.getElementById('regPassword');
            const errorMessage = document.getElementById('regErrorMessage');

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!name || !email || !password) {
                errorMessage.textContent = 'Please fill in all fields.';
                return;
            }

            if (!emailInput.checkValidity()) {
                errorMessage.textContent = 'Please enter a valid email address.';
                return;
            }

            errorMessage.textContent = '';

            fetch(`${API_BASE_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, email: email, password: password })
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    alert('Registration successful! Please log in.');
                    window.location.href = 'index.html';
                } else {
                    errorMessage.textContent = data.message || 'Registration failed';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.textContent = 'Server connection error. Is backend running?';
            });
        });
    }

    // ==========================================
    // Welcome Page Logic
    // ==========================================
    const welcomeEmail = document.getElementById('welcomeEmail');
    const welcomeMessage = document.getElementById('welcomeMessage'); // For backwards compatibility
    const logoutButton = document.getElementById('logoutButton');
    
    if (welcomeEmail || welcomeMessage) {
        // 1. Retrieve the stored email
        const storedEmail = localStorage.getItem('userEmail');

        // 2. Display the message
        if (storedEmail) {
            if (welcomeEmail) {
                welcomeEmail.textContent = `${storedEmail},`;
            } else {
                welcomeMessage.textContent = `Hi ${storedEmail}, Welcome!`;
            }
        } else {
            // Guard clause: If someone visits welcome.html directly without logging in
            if (welcomeEmail) {
                welcomeEmail.textContent = 'Access Denied. Please log in.';
            } else {
                welcomeMessage.textContent = 'Access Denied. Please log in.';
            }
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }

        // Basic logout functionality to clear the session
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                localStorage.removeItem('userEmail');
                window.location.href = 'index.html';
            });
        }
    }
});
