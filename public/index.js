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

            return `<li class="list-group-item text-break">${task}<div class="task-items align-items-right"><i class="fa-solid fa-pen edit-task" data-id="${taskID}"></i><i class="fa-solid fa-trash delete-task" data-id="${taskID}""></i></div></li>`;
        }).join('');

        ulTasksDOM.innerHTML = allTasks;
    } catch (error) {
        console.log(error);
    }
}

ulTasksDOM.addEventListener('click', (e) => {
    const el = e.target;

    const id = el.dataset.id;

    if(el.classList.contains('delete-task')){
        deleteTask(id);
    }
    
    else if(el.classList.contains('edit-task')){
        window.location.replace(`./updateTask.html?id=${id}`);
    }
});

async function deleteTask(taskId){
    const token = localStorage.getItem('AuthToken');

    try {
        await axios.delete(`/api/v1/tasks/${taskId}`, {
            headers: {
                'Authorization': token
            }
        });

        getTasks();
    } catch (error) {
        console.log(error);
    }
}

function verifyToken() {
    if (!localStorage.getItem('AuthToken') || !localStorage.getItem('AuthToken').startsWith('Bearer')) {
        window.location.replace('./login.html');
    }
}

verifyToken();
getTasks();