document.addEventListener('DOMContentLoaded', () => {
    const pages = {
        login: document.getElementById('login-page'),
        register: document.getElementById('register-page'),
        otp: document.getElementById('otp-page'),
        welcome: document.getElementById('welcome-page'),
    };
    const toastContainer = document.getElementById('toast-container');

    function showPage(page) {
        Object.values(pages).forEach(p => p.classList.add('hidden'));
        pages[page].classList.remove('hidden');
    }
    function showToast(msg) {
        const toast = document.createElement('div');
        toast.className = 'toast'; toast.textContent = msg;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    showPage('login');

    document.getElementById('to-register').addEventListener('click', e => {
        e.preventDefault(); showPage('register');
    });
    document.getElementById('to-login').addEventListener('click', e => {
        e.preventDefault(); showPage('login');
    });

    document.getElementById('register-btn').addEventListener('click', () => {
        const user = document.getElementById('reg-username').value;
        const pass = document.getElementById('reg-password').value;
        user && pass ? (showToast('Registered successfully!'), showPage('login'))
            : showToast('Please fill out all fields.');
    });

    document.getElementById('login-btn').addEventListener('click', () => {
        const user = document.getElementById('login-username').value;
        const pass = document.getElementById('login-password').value;
        user && pass ? showPage('otp') : showToast('Please enter both username and password.');
    });

    document.getElementById('send-otp-btn').addEventListener('click', () => {
        ['mobile', 'email'].forEach(type => {
            const messageId = Date.now().toString();
            fetch('/send', { method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messageId, type })
            }).then(() => console.log(`OTP sent for ${type}`))
                .catch(err => console.error(err));
        });
        showToast('OTP sent to mobile and email.');
    });

    document.getElementById('verify-otp-btn').addEventListener('click', () => {
        const mo = document.getElementById('mobile-otp-input').value;
        const eo = document.getElementById('email-otp-input').value;
        (mo === '12345' && eo === '12345') ? showPage('welcome')
            : showToast('Invalid OTP(s). Please try again.');
    });
});
