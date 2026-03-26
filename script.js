/**
 * EMERALD NEXUS - UNIFIED CORE SYSTEM
 * Architecture: Anwarhu & Sento Kiriyu
 * Version: 5.0.0 (Multi-Dimension Optimized)
 */

// ==========================================
// --- 1. GLOBAL DATABASE & STATE ---
// ==========================================
const playlist = [
    { 
        name: "Yesterday", 
        src: "Yesterday.mp3", 
        cover: "yesterday.jpg" // Contoh Gambar Retro
    },
    { 
        name: "Over Quartzer", 
        src: "Over quartzer.mp3", 
        cover: "over.jpg" // THUMBNAIL GINGA!
    },
    { 
        name: "Starlight", 
        src: "Starlight.mp3", 
        cover: "starlight.jpg" 
    },
    { 
        name: "Be The one", 
        src: "Be the One.mp3", 
        cover: "build.jpg" // Build Thumbnail
    },
    { 
        name: "Mice on Venus", 
        src: "C418 mice on venus.mp3", 
        cover: "https://th.bing.com/th/id/OIP.G6W_X8R0_Y9Z1X2R3Z4H5AAAAA?pid=ImgDet" // Minecraft Thumbnail
    }
];

const sectors = [
    { name: 'HUB / MAIN', url: 'Modern-X.HTML', icon: 'layout-grid' },
    { name: 'ADMIN DASHBOARD', url: 'admin.html', icon: 'settings' },
    { name: 'PALEONTOLOGY', url: 'paleo.html', icon: 'skull' },
    { name: 'ZOOLOGY', url: 'zoo.html', icon: 'paw-print' },
    { name: 'AQUATIC', url: 'aqua.html', icon: 'waves' },
    { name: 'ASTRONOMY', url: 'astro.html', icon: 'orbit' },
    { name: 'GALAXY', url: 'galaxy.html', icon: 'milky-way' }
];

// Global Variables
let trackIndex = 0;
let lastTime = performance.now();
let frames = 0;
let autoOptimizeActive = true;

/** 🧪 KONVERSI DETIK KE MENIT:DETIK (0:00) **/
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' + sec : sec}`;
}

// --- AUDIO SFX MODULE ---
const mcClick = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
mcClick.volume = 0.5; // Atur volume agar tidak terlalu mengejutkan

function playUnifiedClick() {
    // Reset waktu ke nol agar bisa diklik berkali-kali dengan cepat
    mcClick.currentTime = 0; 
    mcClick.play().catch(e => console.log("Audio blocked by browser policy"));
}

function initGlobalListeners() {
    // DETEKSI KLIK GLOBAL UNTUK SFX
    document.addEventListener('mousedown', (e) => {
        // Daftar elemen yang jika diklik akan mengeluarkan suara
        const target = e.target.closest('button, a, .nav-item, .glass-card, .paleo-item');
        
        if (target) {
            playUnifiedClick();
            
            // Efek Tekan Visual (Sedikit mengecil)
            target.style.transform = 'scale(0.97)';
            target.style.transition = '0.1s';
        }
    });

    document.addEventListener('mouseup', (e) => {
        const target = e.target.closest('button, a, .nav-item, .glass-card, .paleo-item');
        if (target) {
            target.style.transform = 'scale(1)';
        }
    });
}

// --- [A] WELCOME SCREEN LOGIC ---
function initWelcomeScreen() {
    const welcome = document.getElementById('welcomeScreen');
    const bar = document.getElementById('progress-bar');
    if (!welcome) return;

    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        if (bar) bar.style.width = progress + "%";
        if (progress >= 100) {
            clearInterval(interval);
            welcome.classList.add('fade-out');
            setTimeout(() => { 
                welcome.style.display = 'none';
                showNotify("System Ready", "Welcome Back, My King", "shield-check");
            }, 1000);
        }
    }, 50);
}

function initEnvironmentalSensors() {
    const clockEl = document.getElementById('live-clock');
    const dateEl = document.getElementById('live-date');
    
    setInterval(() => {
        const now = new Date();
        if (clockEl) clockEl.innerText = now.toLocaleTimeString('id-ID');
        if (dateEl) dateEl.innerText = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }, 1000);

    // Weather API
    if (document.getElementById('temp-value')) {
        fetch('https://api.openmeteo.com/v1/forecast?latitude=-6.2&longitude=106.8&current_weather=true')
            .then(res => res.json())
            .then(data => {
                const tempEl = document.getElementById('temp-value');
                if (tempEl) tempEl.innerText = Math.round(data.current_weather.temperature);
            }).catch(() => console.log("Weather Offline"));
    }
}

// --- [C] TERMINAL & ADMIN LOGS ---
function initAdminTerminal() {
    const term = document.getElementById('terminal-content');
    if (!term) return;

    setInterval(() => {
        const logs = ["> ENCRYPTING DATA...", "> FOSSIL SCAN: COMPLETE", "> SYNCING UNITY CORE...", "> EMERALD ENERGY: STABLE"];
        const log = document.createElement('div');
        log.innerText = logs[Math.floor(Math.random() * logs.length)];
        term.appendChild(log);
        if (term.children.length > 8) term.removeChild(term.firstChild);
    }, 3000);
}

function addAdminLog(msg) {
    const term = document.getElementById('terminal-content');
    if (term) {
        const log = document.createElement('div');
        log.innerText = `> ${msg}`;
        log.style.color = "#00ff88";
        term.appendChild(log);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("%c [SYSTEM]: Emerald Nexus Core Online.", "color: #00ff88; font-weight: bold;");

    // --- Mandatory Modules (Jalan di Semua Halaman) ---
    initLucideIcons();
    initGlobalListeners();
    initGlobalSearch();
    initEnvironmentalSensors();

    // --- Contextual Modules (Hanya jalan jika elemen ada) ---
    initMusicPlayer();       // Cek id="mainAudio"
    initPerformanceMonitor(); // Cek id="cpu-v"
    initFPSSentinel();       // Cek id="fps-val"
    initWelcomeScreen();     // Cek id="welcomeScreen"
    initTerminalRelay();     // Cek id="terminal-content"
    
    // Khusus Admin/Paleo
    if (typeof initAdminCharts === 'function') initAdminCharts();
    if (typeof initDynamicWeather === 'function') initDynamicWeather();
});

/**
 * EMERALD MUSIC ENGINE - CHRONO-SYNC EDITION
 * Feature: Auto-Resume, Live Progress, Duration Bar
 */

function initMusicPlayer() {
    const audio = document.getElementById('mainAudio');
    if (!audio) return;

    // 1. Ambil memori terakhir
    const savedTrack = localStorage.getItem('em_track') || 0;
    const savedTime = localStorage.getItem('em_time') || 0;
    const isWasPlaying = localStorage.getItem('em_playing') === 'true';

    trackIndex = parseInt(savedTrack);
    loadTrack(trackIndex);

    // 2. Sinkronisasi Detik (Chrono-Sync)
    audio.currentTime = parseFloat(savedTime);

    // 3. Auto-Resume (Jika tadi sedang berputar, putar lagi)
    if (isWasPlaying) {
        audio.play().then(() => syncMusicUI(true)).catch(() => {
            console.log("🔊 Interaction needed to resume audio");
            syncMusicUI(false);
        });
    }

    // --- EVENT LISTENERS ---
    audio.addEventListener('timeupdate', updateMusicProgress);
    audio.addEventListener('ended', nextTrack);
    
    // Simpan status bermain secara berkala
    setInterval(() => {
        if (!audio.paused) {
            localStorage.setItem('em_time', audio.currentTime);
            localStorage.setItem('em_playing', 'true');
        } else {
            localStorage.setItem('em_playing', 'false');
        }
    }, 500);

    console.log("🎵 [SYSTEM]: Music Engine Synchronized.");
}

function loadTrack(index) {
    const audio = document.getElementById('mainAudio');
    const titleEl = document.getElementById('trackTitle');
    if (!audio || !playlist[index]) return;

    trackIndex = index;
    audio.src = encodeURI(playlist[trackIndex].src);
    if (titleEl) titleEl.innerText = playlist[trackIndex].name;
    localStorage.setItem('em_track', trackIndex);
}

function loadTrack(index) {
    const audio = document.getElementById('mainAudio');
    const thumb = document.getElementById('musicThumb');
    const title = document.getElementById('trackTitle');

    if (!audio || !playlist[index]) return;

    trackIndex = index;
    audio.src = encodeURI(playlist[trackIndex].src);
    if (title) title.innerText = playlist[trackIndex].name;
    
    // 🔥 UPDATE THUMBNAIL GINGA/ULTRA
    if (thumb) {
        thumb.src = playlist[trackIndex].cover;
        // Efek zoom saat ganti lagu
        thumb.style.transform = "scale(0.8)";
        setTimeout(() => { thumb.style.transform = "scale(1)"; }, 300);
    }
}

// Tombol Play/Pause Canggih
function togglePlay() {
    const audio = document.getElementById('mainAudio');
    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => syncMusicUI(true));
    } else {
        audio.pause();
        syncMusicUI(false);
    }
    playUnifiedClick(); // SFX Klik Minecraft
}

function updateMusicProgress() {
    const audio = document.getElementById('mainAudio');
    const bar = document.getElementById('progressBar');
    const currentT = document.getElementById('currentTime');
    const durationT = document.getElementById('totalDuration');

    if (!audio || isNaN(audio.duration)) return;

    // 1. UPDATE BAR (Ini yang sudah jalan)
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    if (bar) bar.style.width = `${progressPercent}%`;

    // 2. UPDATE TEKS MENIT (Ini yang kita perbaiki)
    if (currentT) {
        currentT.innerText = formatTime(audio.currentTime);
    }
    
    if (durationT) {
        durationT.innerText = formatTime(audio.duration);
    }
}

function nextTrack() {
    trackIndex = (trackIndex + 1) % playlist.length;
    loadTrack(trackIndex);
    const audio = document.getElementById('mainAudio');
    audio.play().then(() => {
        syncMusicUI(true);
        showNotify("Music Player", `Now Playing: ${playlist[trackIndex].name}`, "music");
    });
}

function prevTrack() {
    trackIndex = (trackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(trackIndex);
    const audio = document.getElementById('mainAudio');
    audio.play().then(() => syncMusicUI(true));
}

// --- VISUAL PROGRESS ENGINE ---
function updateMusicProgress() {
    const audio = document.getElementById('mainAudio');
    const bar = document.getElementById('progressBar');
    const currentT = document.getElementById('currentTime');
    const durationT = document.getElementById('totalDuration');

    if (!audio || isNaN(audio.duration)) return;

    // Hitung Progress Bar
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    if (bar) bar.style.width = `${progressPercent}%`;

    // Update Menit & Detik
    if (currentT) currentT.innerText = formatTime(audio.currentTime);
    if (durationT) durationT.innerText = formatTime(audio.duration);
}

function syncMusicUI(playing) {
    const btn = document.getElementById('playBtn');
    const vinyl = document.getElementById('vinyl');
    if (btn) btn.innerHTML = playing ? '<i data-lucide="pause"></i>' : '<i data-lucide="play"></i>';
    if (vinyl) {
        playing ? vinyl.classList.add('playing') : vinyl.classList.remove('playing');
    }
    if (window.lucide) lucide.createIcons();
}

/**
 * EMERALD PERFORMANCE MONITOR (The Pentagon System)
 * Menggerakkan bar CPU, GPU, RAM, Latency, & Storage
 */
function initPerformanceMonitor() {
    // Daftar elemen yang harus ada di HUB
    const hasPerf = document.getElementById('cpu-v') || document.getElementById('mem-v');
    if (!hasPerf) return; // Keluar jika bukan di halaman HUB

    const updateStats = (id, value, suffix) => {
        const bar = document.getElementById(id + '-b'); // Target Bar (misal: cpu-b)
        const text = document.getElementById(id + '-v'); // Target Teks (misal: cpu-v)
        
        if (bar) bar.style.width = (value > 100 ? 100 : value) + "%";
        if (text) text.innerText = value + suffix;
        
        // Efek Warna: Merah jika terlalu tinggi (Overload)
        if (bar) {
            bar.style.backgroundColor = value > 85 ? "#ff0055" : "#00ff88";
            bar.style.boxShadow = value > 85 ? "0 0 10px #ff0055" : "0 0 10px #00ff88";
        }
    };

    // INTERVAL MONITORING (Update setiap 2 detik)
    setInterval(() => {
        // 1. CPU Usage (Simulasi 10-40%)
        updateStats('cpu', Math.floor(Math.random() * 30 + 10), '%');
        
        // 2. GPU Power (Simulasi 40-60%)
        updateStats('gpu', Math.floor(Math.random() * 20 + 40), '%');
        
        // 3. Memory Usage (Simulasi RAM)
        const mem = (Math.random() * 4 + 12).toFixed(1); // misal 12.5 GB
        updateStats('mem', mem, ' GB');
        const memBar = document.getElementById('mem-b');
        if(memBar) memBar.style.width = (mem / 32) * 100 + "%"; // Asumsi total 32GB

        // 4. Network Latency (Ping)
        const lat = Math.floor(Math.random() * 15 + 5); // Ping 5-20ms
        updateStats('lat', lat, ' ms');
        const latBar = document.getElementById('lat-b');
        if(latBar) {
            latBar.style.width = (lat / 200 * 100) + "%"; // Scale terhadap 200ms
            latBar.style.backgroundColor = lat > 100 ? '#ff0055' : '#00ff88';
        }

        // 5. Storage Integrity (Tetap di 82%)
        updateStats('str', 82, '%');
    }, 2000);

    console.log("📊 [SYSTEM]: Performance Pentagon Synchronized.");
}

function addAdminLog(message) {
    const logContainer = document.getElementById('admin-terminal');
    if (logContainer) {
        const time = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.innerHTML = `<span style="opacity:0.5;">[${time}]</span> ${message}`;
        logContainer.appendChild(entry);
        logContainer.scrollTop = logContainer.scrollHeight; // Auto scroll ke bawah
    }
}

// Contoh penggunaan:
setInterval(() => {
    const alerts = ["Data packet received", "Firewall secure", "Dimension stable", "User access granted"];
    addAdminLog(alerts[Math.floor(Math.random() * alerts.length)]);
}, 5000);

// ==========================================
// --- 5. GLOBAL SEARCH (Ctrl + K) ---
// ==========================================
function initGlobalSearch() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    if (!overlay || !input) return;

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            overlay.style.display = 'flex';
            input.focus();
        }
        if (e.key === 'Escape') overlay.style.display = 'none';
    });

    input.addEventListener('input', () => {
        const query = input.value.toLowerCase();
        results.innerHTML = '';
        if (query.length === 0) return;

        sectors.filter(s => s.name.toLowerCase().includes(query)).forEach(s => {
            const div = document.createElement('div');
            div.className = "search-result-item"; // Gunakan CSS untuk style ini
            div.innerHTML = `<i data-lucide="${s.icon}"></i> <span>${s.name}</span>`;
            div.onclick = () => window.location.href = s.url;
            results.appendChild(div);
        });
        if (window.lucide) lucide.createIcons();
    });
}

// Helper untuk Ikon
function initLucideIcons() {
    if (window.lucide) lucide.createIcons();
}

// ... Masukkan Fungsi Utilities lainnya (showNotify, formatTime) di bawah sini ...
// ==========================================
// --- SAFE INITIALIZER (Anti-Stuck) ---
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    console.log("💎 [SYSTEM]: Bootstraping Emerald Core...");

    // 1. Jalankan Welcome Screen TERLEBIH DAHULU (Khusus Index)
    const welcome = document.getElementById('welcomeScreen');
    if (welcome) {
        handleWelcomeScreen();
    }

    // 2. Jalankan Fungsi Global dengan Pengaman
    safeInit(initLucideIcons);
    safeInit(initEnvironmentalSensors); // Jam & Tanggal
    safeInit(initMusicPlayer);          // Audio
    safeInit(initGlobalSearch);         // Ctrl + K
    safeInit(initFPSSentinel);          // FPS Monitor
});

// MANTRA PENGAMAN: Mencegah satu error mematikan seluruh web
function safeInit(fn) {
    try {
        fn();
    } catch (e) {
        console.warn(`⚠️ [MODULE SKIP]: ${fn.name} failed or not needed here.`);
    }
}

// FIX LOADING STUCK
function handleWelcomeScreen() {
    const bar = document.getElementById('progress-bar');
    const welcome = document.getElementById('welcomeScreen');
    let progress = 0;

    const interval = setInterval(() => {
        progress += 5;
        if (bar) bar.style.width = progress + "%";
        
        if (progress >= 100) {
            clearInterval(interval);
            welcome.classList.add('fade-out');
            // Pastikan setelah 1 detik element benar-benar hilang/display none
            setTimeout(() => { 
                welcome.style.display = 'none';
                showNotify("System Ready", "Welcome, Waga-mou Anwarhu", "shield-check");
            }, 1000);
        }
    }, 50);
}

document.addEventListener('DOMContentLoaded', () => {
    // ... fungsi lainnya ...
    try { initGlobalListeners(); } catch(e) {}
    // ... fungsi lainnya ...
});

document.addEventListener('DOMContentLoaded', () => {
    // ... fungsi lainnya ...
    try { initPerformanceMonitor(); } catch(e) {} // AKTIFKAN INI!
    // ... fungsi lainnya ...
});
