export function renderMainBody() {
    const main = document.getElementById('main-body');
    main.innerHTML = `
        <input type="text" id="task" placeholder="Enter task text"><br>
        <input type="text" id="task_prior" placeholder="Enter task priority 1-5"><br>
        <input type="text" id="task_id" placeholder="Task ID"><br>
        <table id="output">Some sort of table</table>
    `;
}
