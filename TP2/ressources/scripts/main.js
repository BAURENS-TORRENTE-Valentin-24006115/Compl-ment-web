// exo 1
const A_temperature = [];

// exo 2 - 3 - 4
let O_temp = document.getElementById("temperature");
let O_message = document.getElementById("message");
let i = 0;

const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

function switchTab(oldTab, newTab) {
    oldTab.setAttribute('aria-selected', 'false');
    oldTab.setAttribute('tabindex', '-1');
    oldTab.classList.remove('active');

    newTab.setAttribute('aria-selected', 'true');
    newTab.setAttribute('tabindex', '0');
    newTab.classList.add('active');
    newTab.focus();

    panels.forEach(panel => {
        if (panel.id === newTab.getAttribute('aria-controls')) {
            panel.classList.remove('hidden');
            panel.removeAttribute('hidden');
        } else {
            panel.classList.add('hidden');
            panel.setAttribute('hidden', '');
        }
    });
}

tabs.forEach(tab => {

    tab.addEventListener('click', (e) => {
        const currentTab = document.querySelector('[role="tab"][aria-selected="true"]');
        if (currentTab !== e.target) {
            switchTab(currentTab, e.target);
        }
    });

    tab.addEventListener('keydown', (e) => {
        const currentIndex = Array.from(tabs).indexOf(e.target);
        let targetTab = null;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            targetTab = tabs[currentIndex + 1] || tabs[0];
        }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            targetTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
        }
        else if (e.key === 'Home') {
            e.preventDefault();
            targetTab = tabs[0];
        }
        else if (e.key === 'End') {
            e.preventDefault();
            targetTab = tabs[tabs.length - 1];
        }

        if (targetTab) {
            switchTab(e.target, targetTab);
        }
    });
});

// ===== GESTION DES TEMPÉRATURES =====
const O_liste = document.getElementById("listeHistorique");

setInterval(() => {
    A_temperature.push(Math.floor(Math.random() * 50) - 10);
    O_temp.textContent = A_temperature[i] + "°C";
    O_temp.removeAttribute("class");

    if (A_temperature[i] <= 0) O_temp.setAttribute("class", "bleu");
    else if (A_temperature[i] <= 20) O_temp.setAttribute("class", "vert");
    else if (A_temperature[i] <= 30) O_temp.setAttribute("class", "orange");
    else O_temp.setAttribute("class", "rouge");

    if (O_temp.getAttribute("class") === "bleu")
        O_message.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
    else if ((O_temp.getAttribute("class") === "rouge"))
        O_message.textContent = "Caliente ! Vamos a la playa, ho hoho hoho !!";
    else
        O_message.textContent = "";

    O_liste.textContent += A_temperature[i] + "°C, ";

    ++i;

}, 2000)
