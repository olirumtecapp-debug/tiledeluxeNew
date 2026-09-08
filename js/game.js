// Motor Principal do Jogo (Lógica de Seleção, Detecção de Camadas 3D, Bandeja de 7 slots, Combos, Fullscreen, PWA e Pix)
class TileExplorerEngine {
    constructor() {
        this.currentMode = "campaign";
        this.currentLevel = 1;
        this.boardTiles = [];
        this.trayTiles = [];
        this.trayMaxSlots = 7;
        this.moveHistory = [];
        this.isProcessing = false;
        this.comboCount = 0;
        this.lastMatchTime = 0;
        this.timerInterval = null;
        this.timeLeft = 0;
        this.isPaused = false;
        this.deferredPrompt = null;

        this.initDOM();
        this.bindEvents();
        this.initPWA();
    }

    initDOM() {
        this.boardContainer = document.getElementById('board-container');
        this.trayContainer = document.getElementById('tray-container');
        this.levelTitleEl = document.getElementById('level-title');
        this.biomeSubtitleEl = document.getElementById('biome-subtitle');
        this.timerBadgeEl = document.getElementById('timer-badge');
        this.timerTextEl = document.getElementById('timer-text');
        this.comboBannerEl = document.getElementById('combo-banner');
        this.biomeBgEl = document.getElementById('biome-bg');
    }

    bindEvents() {
        // Power-ups
        document.getElementById('btn-undo').addEventListener('click', () => this.useUndo());
        document.getElementById('btn-wand').addEventListener('click', () => this.useMagicWand());
        document.getElementById('btn-shuffle').addEventListener('click', () => this.useShuffle());

        // Botões de Menu e Pausa
        document.getElementById('btn-pause').addEventListener('click', () => this.showPauseModal());
        document.getElementById('btn-resume').addEventListener('click', () => this.hidePauseModal());
        document.getElementById('btn-restart').addEventListener('click', () => {
            this.hidePauseModal();
            this.startLevel(this.currentLevel, this.currentMode);
        });
        document.getElementById('btn-quit-to-menu').addEventListener('click', () => {
            this.hidePauseModal();
            this.showScreen('screen-main-menu');
        });

        // Modais de Vitória e Derrota
        document.getElementById('btn-next-level').addEventListener('click', () => {
            this.hideModal('modal-win');
            this.currentLevel++;
            if (this.currentLevel > window.economyManager.highestCampaignLevel) {
                window.economyManager.highestCampaignLevel = this.currentLevel;
                window.economyManager.save();
            }
            this.startLevel(this.currentLevel, this.currentMode);
        });

        document.getElementById('btn-retry-lose').addEventListener('click', () => {
            this.hideModal('modal-lose');
            this.startLevel(this.currentLevel, this.currentMode);
        });

        document.getElementById('btn-revive').addEventListener('click', () => {
            this.reviveGame();
        });

        // Seleção de Modos no Menu
        document.getElementById('mode-campaign-btn').addEventListener('click', () => {
            this.currentMode = "campaign";
            this.startLevel(window.economyManager.highestCampaignLevel, "campaign");
        });
        document.getElementById('mode-zen-btn').addEventListener('click', () => {
            this.currentMode = "zen";
            this.startLevel(1, "zen");
        });
        document.getElementById('mode-quick-btn').addEventListener('click', () => {
            this.currentMode = "quick";
            this.startLevel(1, "quick");
        });

        // Abas da barra inferior
        document.getElementById('tab-shop-btn').addEventListener('click', () => this.showModal('modal-shop'));
        document.getElementById('close-shop-btn').addEventListener('click', () => this.hideModal('modal-shop'));
        document.getElementById('tab-settings-btn').addEventListener('click', () => this.showModal('modal-settings'));
        document.getElementById('close-settings-btn').addEventListener('click', () => this.hideModal('modal-settings'));

        // Configurações de som e música
        document.getElementById('toggle-sound-btn').addEventListener('click', (e) => {
            const enabled = window.soundManager.toggleSound();
            e.target.textContent = enabled ? 'Som: LIGADO 🔊' : 'Som: DESLIGADO 🔇';
        });
        document.getElementById('toggle-music-btn').addEventListener('click', (e) => {
            const enabled = window.soundManager.toggleMusic();
            e.target.textContent = enabled ? 'Música: LIGADA 🎵' : 'Música: DESLIGADA 🔇';
        });

        // Compras na Loja
        document.querySelectorAll('.btn-buy-shop-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = e.currentTarget.getAttribute('data-item');
                window.economyManager.purchaseShopItem(itemId);
            });
        });

        // Botão de Instalar PWA
        const installBtn = document.getElementById('btn-install-pwa');
        if (installBtn) {
            installBtn.addEventListener('click', () => {
                if (this.deferredPrompt) {
                    this.deferredPrompt.prompt();
                    this.deferredPrompt.userChoice.then((choiceResult) => {
                        if (choiceResult.outcome === 'accepted') {
                            console.log('Usuário aceitou instalar o PWA');
                        }
                        this.deferredPrompt = null;
                    });
                } else {
                    alert("Para instalar, utilize a opção 'Adicionar à tela inicial' ou 'Instalar Aplicativo' no menu do seu navegador!");
                }
            });
        }
    }

    // Inicialização do Service Worker & Prompt PWA
    initPWA() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker registrado:', reg.scope))
                .catch(err => console.log('Falha ao registrar Service Worker:', err));
        }

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            const banner = document.getElementById('pwa-install-banner');
            if (banner) banner.style.display = 'block';
        });
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(screenId).classList.add('active');
        if (screenId === 'screen-main-menu') {
            window.soundManager.startAmbientMusic();
        }
        window.economyManager.updateUI();
    }

    showModal(modalId) {
        document.getElementById(modalId).classList.add('active');
    }

    hideModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
    }

    startLevel(levelNum, mode = "campaign") {
        this.currentMode = mode;
        this.currentLevel = levelNum;
        this.trayTiles = [];
        this.moveHistory = [];
        this.isProcessing = false;
        this.comboCount = 0;
        this.trayMaxSlots = 7;
        this.isPaused = false;

        const config = LevelDatabase.getLevelConfig(levelNum, mode);
        this.boardTiles = config.tiles;

        this.levelTitleEl.textContent = mode === "campaign" ? `Nível ${levelNum}` : (mode === "zen" ? "Modo Zen" : "Desafio Blitz");
        this.biomeSubtitleEl.textContent = config.biome.name;
        this.biomeBgEl.className = `biome-bg ${config.biome.className}`;

        if (this.timerInterval) clearInterval(this.timerInterval);
        if (mode === "quick" && config.timeLimit) {
            this.timeLeft = config.timeLimit;
            this.timerBadgeEl.style.display = 'flex';
            this.updateTimerDisplay();
            this.timerInterval = setInterval(() => {
                if (!this.isPaused) {
                    this.timeLeft--;
                    this.updateTimerDisplay();
                    if (this.timeLeft <= 0) {
                        clearInterval(this.timerInterval);
                        this.handleGameOver();
                    }
                }
            }, 1000);
        } else {
            this.timerBadgeEl.style.display = 'none';
        }

        this.showScreen('screen-gameplay');
        this.renderBoard();
        this.renderTray();
        window.soundManager.playClick();
    }

    updateTimerDisplay() {
        const m = Math.floor(this.timeLeft / 60);
        const s = this.timeLeft % 60;
        this.timerTextEl.textContent = `${m}:${s < 10 ? '0' : ''}${s}`;
    }

    calculateBlockedStatus() {
        const tileW = 50;
        const tileH = 60;

        this.boardTiles.forEach(tileA => {
            let blocked = false;
            for (let tileB of this.boardTiles) {
                if (tileB.layer > tileA.layer) {
                    const dx = Math.abs(tileA.x - tileB.x);
                    const dy = Math.abs(tileA.y - tileB.y);
                    if (dx < tileW * 0.82 && dy < tileH * 0.82) {
                        blocked = true;
                        break;
                    }
                }
            }
            tileA.isBlocked = blocked;
        });
    }

    renderBoard() {
        this.boardContainer.innerHTML = '';
        this.calculateBlockedStatus();

        const sortedTiles = [...this.boardTiles].sort((a, b) => a.layer - b.layer);

        sortedTiles.forEach(tile => {
            const asset = TileAssets.tiles[tile.type];
            if (!asset) return;

            const el = document.createElement('div');
            el.className = `tile-item ${tile.isBlocked ? 'blocked' : 'clickable'}`;
            el.id = tile.id;
            el.style.left = `${tile.x}px`;
            el.style.top = `${tile.y}px`;
            el.style.zIndex = tile.layer * 10 + 5;
            el.innerHTML = asset.svg;

            if (!tile.isBlocked) {
                el.addEventListener('click', () => this.handleTileClick(tile));
            }

            this.boardContainer.appendChild(el);
        });
    }

    renderTray() {
        this.trayContainer.innerHTML = '';
        
        for (let i = 0; i < this.trayMaxSlots; i++) {
            const slot = document.createElement('div');
            slot.className = 'tray-slot-placeholder';
            this.trayContainer.appendChild(slot);
        }

        this.trayTiles.forEach((tile, index) => {
            const asset = TileAssets.tiles[tile.type];
            const el = document.createElement('div');
            el.className = 'tile-item tray-tile';
            el.setAttribute('data-index', index);
            el.setAttribute('data-type', tile.type);
            el.innerHTML = asset.svg;
            this.trayContainer.appendChild(el);
        });
    }

    handleTileClick(tile) {
        if (this.isProcessing || tile.isBlocked) return;
        if (this.trayTiles.length >= this.trayMaxSlots) return;

        window.soundManager.playTileSelect();

        this.boardTiles = this.boardTiles.filter(t => t.id !== tile.id);
        this.moveHistory.push({ tile: tile, trayIndex: this.trayTiles.length });

        let insertIndex = this.trayTiles.length;
        const sameTypeIndices = [];
        this.trayTiles.forEach((t, i) => {
            if (t.type === tile.type) sameTypeIndices.push(i);
        });

        if (sameTypeIndices.length > 0) {
            insertIndex = sameTypeIndices[sameTypeIndices.length - 1] + 1;
            this.trayTiles.splice(insertIndex, 0, tile);
        } else {
            this.trayTiles.push(tile);
        }

        this.renderBoard();
        this.renderTray();
        this.checkMatches();
    }

    checkMatches() {
        const typeCounts = {};
        this.trayTiles.forEach(t => {
            typeCounts[t.type] = (typeCounts[t.type] || 0) + 1;
        });

        let matchedType = null;
        for (let type in typeCounts) {
            if (typeCounts[type] >= 3) {
                matchedType = type;
                break;
            }
        }

        if (matchedType) {
            this.isProcessing = true;
            
            const now = Date.now();
            if (now - this.lastMatchTime < 3500) {
                this.comboCount++;
            } else {
                this.comboCount = 1;
            }
            this.lastMatchTime = now;

            window.soundManager.playMatch(this.comboCount);

            const trayElements = this.trayContainer.querySelectorAll('.tray-tile');
            let eliminated = 0;
            trayElements.forEach(el => {
                if (el.getAttribute('data-type') === matchedType && eliminated < 3) {
                    el.classList.add('matching');
                    eliminated++;
                }
            });

            if (this.comboCount > 1) {
                this.showComboBanner(`Combo x${this.comboCount}! 💥`);
                window.economyManager.addGold(this.comboCount * 5);
            } else {
                this.showComboBanner(`Par Perfeito! ⭐`);
                window.economyManager.addGold(10);
            }

            this.createMatchParticles();

            setTimeout(() => {
                let count = 0;
                this.trayTiles = this.trayTiles.filter(t => {
                    if (t.type === matchedType && count < 3) {
                        count++;
                        return false;
                    }
                    return true;
                });

                this.renderTray();
                this.isProcessing = false;

                if (this.boardTiles.length === 0 && this.trayTiles.length === 0) {
                    this.handleWin();
                }
            }, 300);

        } else {
            if (this.trayTiles.length >= this.trayMaxSlots) {
                setTimeout(() => this.handleGameOver(), 200);
            }
        }
    }

    createMatchParticles() {
        const trayRect = this.trayContainer.getBoundingClientRect();
        const colors = ['#ff0844', '#ffb199', '#ffb703', '#4facfe', '#00f2fe', '#fff'];

        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 10 + 6;
            p.style.width = `${size}px`;
            p.style.height = `${size}px`;
            p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            p.style.left = `${trayRect.left + trayRect.width / 2}px`;
            p.style.top = `${trayRect.top + 30}px`;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 100 + 40;
            p.style.setProperty('--tx', `${Math.cos(angle) * distance}px`);
            p.style.setProperty('--ty', `${Math.sin(angle) * distance}px`);

            document.body.appendChild(p);
            setTimeout(() => p.remove(), 600);
        }
    }

    showComboBanner(text) {
        this.comboBannerEl.textContent = text;
        this.comboBannerEl.classList.add('show');
        setTimeout(() => {
            this.comboBannerEl.classList.remove('show');
        }, 900);
    }

    handleWin() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        window.soundManager.playWin();

        const goldEarned = 50 + (this.currentLevel * 10);
        const diamondsEarned = (this.currentLevel % 3 === 0) ? 2 : 1;

        window.economyManager.addGold(goldEarned);
        window.economyManager.addDiamonds(diamondsEarned);

        document.getElementById('win-gold-reward').textContent = `+${goldEarned}`;
        document.getElementById('win-diamond-reward').textContent = `+${diamondsEarned}`;
        document.getElementById('win-level-label').textContent = `Nível ${this.currentLevel} Concluído!`;

        const stars = document.querySelectorAll('#modal-win .star-icon');
        stars.forEach((s, idx) => {
            s.classList.remove('filled');
            setTimeout(() => s.classList.add('filled'), (idx + 1) * 200);
        });

        this.showModal('modal-win');
    }

    handleGameOver() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        window.soundManager.playLose();
        this.showModal('modal-lose');
    }

    reviveGame() {
        if (window.economyManager.spendDiamonds(5)) {
            this.hideModal('modal-lose');
            const returned = this.trayTiles.splice(0, 3);
            returned.forEach(t => {
                t.layer = 3;
                this.boardTiles.push(t);
            });
            this.renderBoard();
            this.renderTray();
            window.soundManager.playPowerup();
            
            if (this.currentMode === "quick") {
                this.timeLeft += 30;
            }
        } else {
            alert("💎 Você precisa de 5 Diamantes para continuar! Ganhe mais passando de fase ou troque na Loja.");
            this.showModal('modal-shop');
        }
    }

    useUndo() {
        if (this.moveHistory.length === 0) return;
        if (!window.economyManager.usePowerup('undo')) {
            alert("Você não tem 'Desfazer'. Adquira mais na Loja!");
            this.showModal('modal-shop');
            return;
        }

        const lastMove = this.moveHistory.pop();
        const tileIdx = this.trayTiles.findIndex(t => t.id === lastMove.tile.id);
        if (tileIdx !== -1) {
            this.trayTiles.splice(tileIdx, 1);
            this.boardTiles.push(lastMove.tile);
            this.renderBoard();
            this.renderTray();
            window.soundManager.playPowerup();
        }
    }

    useMagicWand() {
        if (!window.economyManager.usePowerup('wand')) {
            alert("Você não tem 'Varinha Mágica'. Adquira mais na Loja!");
            this.showModal('modal-shop');
            return;
        }

        const available = [...this.boardTiles.filter(t => !t.isBlocked), ...this.trayTiles];
        const counts = {};
        available.forEach(t => counts[t.type] = (counts[t.type] || 0) + 1);

        let bestType = null;
        let maxCount = 0;
        for (let type in counts) {
            if (counts[type] > maxCount) {
                maxCount = counts[type];
                bestType = type;
            }
        }

        if (!bestType) return;

        let added = 0;
        const candidates = this.boardTiles.filter(t => t.type === bestType);
        for (let t of candidates) {
            if (added < 3 && this.trayTiles.length < this.trayMaxSlots) {
                this.handleTileClick(t);
                added++;
            }
        }
        window.soundManager.playPowerup();
    }

    useShuffle() {
        if (!window.economyManager.usePowerup('shuffle')) {
            alert("Você não tem 'Embaralhar'. Adquira mais na Loja!");
            this.showModal('modal-shop');
            return;
        }

        const types = this.boardTiles.map(t => t.type);
        for (let i = types.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [types[i], types[j]] = [types[j], types[i]];
        }

        this.boardTiles.forEach((t, i) => {
            t.type = types[i];
        });

        this.renderBoard();
        window.soundManager.playPowerup();
    }

    showPauseModal() {
        this.isPaused = true;
        this.showModal('modal-pause');
    }

    hidePauseModal() {
        this.isPaused = false;
        this.hideModal('modal-pause');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.gameEngine = new TileExplorerEngine();
    window.economyManager.updateUI();
});
