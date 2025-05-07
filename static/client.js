import { renderHeader } from './components/header.js';
import { renderSidebar } from './components/sidebar.js';
import { renderMainBody } from './components/mainBody.js';

window.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderSidebar();
    renderMainBody();
});

async function sendData(task) {
    let task_text = document.getElementById("task").value;
    let task_prior = document.getElementById("task_prior").value;
    parseInt(task_prior)
    let task_id = document.getElementById("task_id").value;
    parseInt(task_id)
    let data = ''
    if (parseInt(task_prior) === NaN || parseInt(task_id) === NaN || task_prior>5 || task_prior<0) return;
    if (task==='add') {
        data = `${task} ${task_prior} ${task_text}`;
    } else if (task==='update') {
        data = `${task} ${task_id} ${task_prior} ${task_text}`; // `${task} ${extra}`
    } else if (task==='delete') {
        data = `${task} ${task_id}`; // `${task} ${extra}`
    }
    console.log(data)

    let response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
    })

    console.log('after fetching')
    const resData = await response.text();
    console.log(resData)
    let output = document.getElementById("output");
    output.innerHTML = resData;
    console.log('update table received')
}
async function updateTable() {
    let response = await fetch('http://localhost:3000/showAll', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const resData = await response.json();
    let html = "<tr><th>ID</th><th>Priority</th><th>Task</th></tr>";
    resData.forEach(row => {
        html += `<tr>
            <td>${row.taskId}</td>
            <td>${row.taskPrior}</td>
            <td>${row.taskText}</td>
        </tr>`;
    });
    let output = document.getElementById("output");
    output.innerHTML = html;
}
async function deleteTable() {
    console.log('started deleting table')
    let response = await fetch('http://localhost:3000/delete-table', {
        method: 'DELETE'
    })
    console.log('almost finished deleting table')
    const resData = await response.text();
    let output = document.getElementById('output');
    output.innerHTML = resData;
}

export {
    sendData, updateTable, deleteTable
}