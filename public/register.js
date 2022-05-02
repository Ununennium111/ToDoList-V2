const formDOM = document.getElementById('form-register');
const alertDOM = document.getElementById('alert-register');
const usernameInputDOM = document.getElementById('username-input-register');
const emailInputDOM = document.getElementById('email-input-register');
const passwordInputDOM = document.getElementById('password-input-register');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();

    const user = {
        username: usernameInputDOM.value,
        email: emailInputDOM.value,
        password: passwordInputDOM.value
    }

    try {
        await axios.post('/api/v1/auth/register', user);

        usernameInputDOM.value = '';
        emailInputDOM.value = '';
        passwordInputDOM.value = '';

        if (alertDOM.classList.contains('alert-danger')) {
            alertDOM.classList.remove('alert-danger');
        }

        showAlert('alert-success', 'User successfully created');

        setTimeout(() => {
            window.location.replace('./login.html');
        }, 750);
    } catch (error) {
        const errorMessage = error.response.data.msg;
        showAlert('alert-danger', errorMessage);
    }
});

function showAlert(alert, msg) {
    alertDOM.style.visibility = 'visible';
    alertDOM.textContent = msg;
    alertDOM.classList.add(alert);
}