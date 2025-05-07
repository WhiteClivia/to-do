import { renderMainBody } from './mainBody.js';

export function renderHeader() {
    const header = document.getElementById('header');
    header.innerHTML = `
        To-do site for your strange tasks, sinner 
        <button id="readme"> readme </button>
        <button id="main"> main code </button>
    `;
    document.getElementById('readme').addEventListener('click', () => openReadme());
    document.getElementById('main').addEventListener('click', () => renderMainBody());

    async function openReadme() {
        const mainBody = document.getElementById('main-body');
        try {
            const response = await fetch('http://localhost:3000/readme');
            if (!response.ok) throw new Error('Failed to load README');
            const text = await response.text();
            mainBody.innerText = text; // Показываем как обычный текст
        } catch (err) {
            mainBody.innerText = 'no readme, sorry \n' + err.message;
        }
    }
}
