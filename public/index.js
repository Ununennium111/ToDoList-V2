const createButtonDOM = document.getElementById('create-button-index');
const ulTasksDOM = document.getElementById('ul-tasks-index');

createButtonDOM.addEventListener('click', () => {
    window.location.replace('./createTask.html');
});

const getTasks = async () => {
    const token = localStorage.getItem('AuthToken');

    try {
        const { data: { tasks } } = await axios.get('/api/v1/tasks', {
            headers: {
                'Authorization': token
            }
        })
        console.log(tasks)

        const allTasks = tasks.map((singleTask) => {
            const { _id: taskID, task } = singleTask;

            return `<div data-id="${taskID}"><li class="list-group-item text-break">${task}</li></div>`;
        }).join('');

        ulTasksDOM.innerHTML = allTasks;
    } catch (error) {
        console.log(error);
    }
}

ulTasksDOM.addEventListener('click', async (e) => {
    const el = e.target;

    const id = el.parentElement.dataset.id;
    const token = localStorage.getItem('AuthToken');

    try {
        await axios.delete(`/api/v1/tasks/${id}`, {
            headers: {
                'Authorization': token
            }
        });

        getTasks();
    } catch (error) {
        console.log(error);
    }
});

function verifyToken() {
    if (!localStorage.getItem('AuthToken') || !localStorage.getItem('AuthToken').startsWith('Bearer')) {
        window.location.replace('./login.html');
    }
}

verifyToken();
getTasks();