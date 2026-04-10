const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQTpKvnBNdPxRkepgDMqxhwp-oZIiDO69lFfNXaMxPSVdgWPUuBzLQsiKEVL6ursmPGoEVzSXme5VvK/pub?gid=0&single=true&output=csv";

const ENHANCE_STRING = "Masterpiece ultra-realistic 8k portrait, [Subject Name/Reference] with hyper-detailed skin pores, realistic sweat sheen, and fine facial hair textures. Lighting: dual-tone volumetric lighting with a 70/30 split between cold moonlight-blue and warm high-pressure sodium orange. Environment: narrow wet urban alleyway, ray-traced reflections on damp brickwork and graffiti. Camera: Shot on ARRI Alexa LF, 85mm prime lens, f/1.8 for creamy bokeh, deep natural shadows with preserved black levels. Post-Process: subtle chromatic aberration, 35mm film grain, high dynamic range (HDR), professionally color graded for a moody 'Seinen manga' live-action aesthetic.";

window.onload = () => {
    document.getElementById('loader-bar').style.width = '100%';
    fetchData();
};

async function fetchData() {
    Papa.parse(SHEET_URL, {
        download: true, header: true, skipEmptyLines: true,
        complete: (results) => {
            renderCards(results.data);
            setTimeout(() => {
                document.getElementById('welcome-screen').style.opacity = '0';
                document.getElementById('main-content').style.opacity = '1';
                setTimeout(() => document.getElementById('welcome-screen').remove(), 1000);
            }, 1200);
        }
    });
}

function renderCards(data) {
    const grid = document.getElementById('main-grid');
    grid.innerHTML = data.map((item, i) => {
        if(!item.Title) return '';
        return `
        <div class="tech-card">
            <div class="img-container">
                <img src="${item.ImageURL}" alt="${item.Title}" referrerpolicy="no-referrer">
            </div>
            <div class="pt-10">
                <div class="flex justify-between mb-4">
                    <span class="label-text text-zinc-400">INDEX_0${i+1}</span>
                </div>
                <h3 class="text-3xl editorial-title font-semibold mb-6 tracking-wide">${item.Title}</h3>
                <div class="prompt-area">
                    <i class="fa-regular fa-copy copy-icon-btn" onclick="copyText('${item.Prompt.replace(/'/g, "\\'")}', this)"></i>
                    <p class="text-[11px] leading-relaxed text-zinc-400 italic">"${item.Prompt}"</p>
                </div>
            </div>
        </div>`;
    }).join('');
}

function copyText(text, icon) {
    navigator.clipboard.writeText(text).then(() => {
        icon.className = 'fa-solid fa-check text-green-500 copy-icon-btn';
        setTimeout(() => icon.className = 'fa-regular fa-copy copy-icon-btn', 2000);
    });
}

function runEnhanceSequence() {
    navigator.clipboard.writeText(ENHANCE_STRING).then(() => {
        const modal = document.getElementById('enhance-modal');
        const boom = document.getElementById('boom-text');
        const list = document.getElementById('instruction-list');
        modal.classList.add('active');
        
        setTimeout(() => {
            list.style.transition = "opacity 0.5s ease";
            list.style.opacity = "0";
            setTimeout(() => {
                list.style.display = "none";
                boom.classList.add('show');
            }, 500);
        }, 3500);

        setTimeout(() => {
            modal.classList.remove('active');
            setTimeout(() => {
                boom.classList.remove('show');
                list.style.display = 'block';
                list.style.opacity = '1';
            }, 800);
        }, 7000);
    });
}
