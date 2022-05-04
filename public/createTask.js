const formDOM = document.getElementById('form-create');
const alertDOM = document.getElementById('alert-task');
const taskInputDOM = document.getElementById('task-input-create');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskValue = taskInputDOM.value;
    const token = localStorage.getItem('AuthToken');

    try {
        await axios.post('api/v1/tasks', { task: taskValue }, {
            headers: {
                'Authorization': token
            }
        })

        taskInputDOM.value = '';

        if (alertDOM.classList.contains('alert-danger')) {
            alertDOM.classList.remove('alert-danger');
        }

        showAlert('alert-success', 'Task successfully created');

        setTimeout(() => {
            alertDOM.textContent = '';
            alertDOM.classList.remove('alert-success');
        }, 2000);
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

function verifyToken() {
    if (!localStorage.getItem('AuthToken') || !localStorage.getItem('AuthToken').startsWith('Bearer')) {
        window.location.replace('./login.html');
    }
}

verifyToken();