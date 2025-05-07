import { sendData, updateTable, deleteTable } from '../client.js'

export function renderTaskForm() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
        <button id="add-btn">Add</button>
        <button id="update-btn">Update</button>
        <button id="delete-btn">Delete</button>
        <button id="update-table-btn">Update Table</button>
        <button id="delete-table-btn" >Delete damn Table</button>
    `;

    document.getElementById('add-btn').addEventListener('click', () => sendData('add'));
    document.getElementById('update-btn').addEventListener('click', () => sendData('update'));
    document.getElementById('delete-btn').addEventListener('click', () => sendData('delete'));
    document.getElementById('update-table-btn').addEventListener('click', () => updateTable());
    document.getElementById('delete-table-btn').addEventListener('click', () => deleteTable());

}
