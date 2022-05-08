const formDOM = document.getElementById('form-update');
const alertDOM = document.getElementById('alert-task');
const taskInputDOM = document.getElementById('task-input-update');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

formDOM.addEventListener('submit', async (e) => {
    e.preventDefault();

    const taskValue = taskInputDOM.value;
    const token = localStorage.getItem('AuthToken');

    try {
        await axios.patch(`/api/v1/tasks/${id}`, { task: taskValue }, {
            headers: {
                'Authorization': token
            }
        })

        taskInputDOM.value = '';

        if (alertDOM.classList.contains('alert-danger')) {
            alertDOM.classList.remove('alert-danger');
        }

        showAlert('alert-success', 'Task successfully updated');

        setTimeout(() => {
            window.location.replace('./index.html');
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

function verifyToken() {
    if (!localStorage.getItem('AuthToken') || !localStorage.getItem('AuthToken').startsWith('Bearer')) {
        window.location.replace('./login.html');
    }
}

verifyToken();