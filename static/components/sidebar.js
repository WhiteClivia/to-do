import { sendData, updateTable, deleteTable } from '../client.js'

export function renderSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.innerHTML = `
        <button id="add-btn">Add</button> <br>
        <button id="update-btn">Update</button> <br>
        <button id="delete-btn">Delete</button> <br>
        <button id="update-table-btn">Update Table</button> <br>
        <button id="delete-table-btn">delete Table</button> <br>
        
    `;
    setTimeout(()=>{
        const add = document.getElementById('add-btn');
        const upd = document.getElementById('update-btn');
        const del = document.getElementById('delete-btn');
        const updT = document.getElementById('update-table-btn');
        const delT = document.getElementById('delete-table-btn');

        if (add && upd && del && updT && delT) {
            add.addEventListener('click', () => sendData('add'));
            upd.addEventListener('click', () => sendData('update'));
            del.addEventListener('click', () => sendData('delete'));
            updT.addEventListener('click', () => updateTable());
            delT.addEventListener('click', () => deleteTable());
        }
    })


}
