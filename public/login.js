const formDOM = document.getElementById('form-login');
const alertDOM = document.getElementById('alert-login');
const emailInputDOM = document.getElementById('email-input-login');
const passwordInputDOM = document.getElementById('password-input-login');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = {
        email: emailInputDOM.value,
        password: passwordInputDOM.value
    }

    try {
        const response = await axios.post('/api/v1/auth/login', user);
        const token = `Bearer ${response.data.token}`;

        localStorage.setItem('AuthToken', token);

        emailInputDOM.value = '';
        passwordInputDOM.value = '';

        if (alertDOM.classList.contains('alert-danger')) {
            alertDOM.classList.remove('alert-danger');
        }

        showAlert('alert-success', 'Success');

        setTimeout(() => {
            window.location.replace('./index.html');
        }, 750);

    } catch (error) {
        const errorMessage = error.response.data.msg;
        showAlert('alert-danger', errorMessage);
    }
})

function showAlert(alert, msg) {
    alertDOM.style.visibility = 'visible';
    alertDOM.textContent = msg;
    alertDOM.classList.add(alert);
}

function verifyToken() {
    if (localStorage.getItem('AuthToken')) {
        window.location.replace('./index.html');
    }
}

verifyToken();