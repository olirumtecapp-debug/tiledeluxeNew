// Gerenciador de Economia, Conquistas, Inventário e Loja Interna com Moedas e Diamantes do Jogo
class EconomyManager {
    constructor() {
        this.gold = 350;
        this.diamonds = 15;
        this.powerups = {
            undo: 3,
            wand: 2,
            shuffle: 2,
            extraSlot: 1
        };
        this.highestCampaignLevel = 1;
        this.load();
    }

    load() {
        const saved = localStorage.getItem('tile_game_save_v1');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                this.gold = data.gold ?? 350;
                this.diamonds = data.diamonds ?? 15;
                this.powerups = { ...this.powerups, ...data.powerups };
                this.highestCampaignLevel = data.highestCampaignLevel ?? 1;
            } catch (e) {
                console.error("Erro ao carregar dados salvos:", e);
            }
        }
    }

    save() {
        const data = {
            gold: this.gold,
            diamonds: this.diamonds,
            powerups: this.powerups,
            highestCampaignLevel: this.highestCampaignLevel
        };
        localStorage.setItem('tile_game_save_v1', JSON.stringify(data));
        this.updateUI();
    }

    addGold(amount) {
        this.gold += amount;
        this.save();
    }

    addDiamonds(amount) {
        this.diamonds += amount;
        this.save();
    }

    spendGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            this.save();
            return true;
        }
        return false;
    }

    spendDiamonds(amount) {
        if (this.diamonds >= amount) {
            this.diamonds -= amount;
            this.save();
            return true;
        }
        return false;
    }

    usePowerup(type) {
        if (this.powerups[type] > 0) {
            this.powerups[type]--;
            this.save();
            return true;
        }
        return false;
    }

    addPowerup(type, count = 1) {
        if (this.powerups[type] !== undefined) {
            this.powerups[type] += count;
            this.save();
        }
    }

    // Compra de itens na Loja usando Moedas e Diamantes conquistados nas fases
    purchaseShopItem(itemId) {
        switch(itemId) {
            case 'buy_undo_pack':
                // 3x Desfazer por 150 Moedas
                if (this.spendGold(150)) {
                    this.addPowerup('undo', 3);
                    window.soundManager.playPowerup();
                    alert("✨ Sucesso! +3 Desfazer adicionados ao seu inventário!");
                } else {
                    alert("🪙 Moedas insuficientes! Ganhe mais moedas jogando as fases.");
                }
                break;

            case 'buy_wand_pack':
                // 2x Varinhas Mágicas por 250 Moedas
                if (this.spendGold(250)) {
                    this.addPowerup('wand', 2);
                    window.soundManager.playPowerup();
                    alert("✨ Sucesso! +2 Varinhas Mágicas adicionadas!");
                } else {
                    alert("🪙 Moedas insuficientes! Ganhe mais moedas jogando as fases.");
                }
                break;

            case 'buy_shuffle_pack':
                // 3x Embaralhar por 180 Moedas
                if (this.spendGold(180)) {
                    this.addPowerup('shuffle', 3);
                    window.soundManager.playPowerup();
                    alert("✨ Sucesso! +3 Embaralhar adicionados!");
                } else {
                    alert("🪙 Moedas insuficientes! Ganhe mais moedas jogando as fases.");
                }
                break;

            case 'buy_mega_bundle':
                // Mega Combo por 10 Diamantes
                if (this.spendDiamonds(10)) {
                    this.addPowerup('undo', 3);
                    this.addPowerup('wand', 3);
                    this.addPowerup('shuffle', 3);
                    this.addGold(300);
                    window.soundManager.playWin();
                    alert("💎 Mega Combo Adquirido! +3 Desfazer, +3 Varinhas, +3 Embaralhar e +300 Moedas!");
                } else {
                    alert("💎 Diamantes insuficientes! Ganhe mais diamantes completando fases da campanha.");
                }
                break;

            case 'exchange_diamonds_for_gold':
                // Troca 5 Diamantes por 500 Moedas
                if (this.spendDiamonds(5)) {
                    this.addGold(500);
                    window.soundManager.playWin();
                    alert("🪙 Troca realizada com sucesso! +500 Moedas adicionadas!");
                } else {
                    alert("💎 Diamantes insuficientes!");
                }
                break;

            default:
                break;
        }
    }

    updateUI() {
        document.querySelectorAll('.gold-val').forEach(el => el.textContent = this.gold);
        document.querySelectorAll('.diamond-val').forEach(el => el.textContent = this.diamonds);
        
        if (document.getElementById('undo-count')) document.getElementById('undo-count').textContent = this.powerups.undo;
        if (document.getElementById('wand-count')) document.getElementById('wand-count').textContent = this.powerups.wand;
        if (document.getElementById('shuffle-count')) document.getElementById('shuffle-count').textContent = this.powerups.shuffle;
    }
}

window.economyManager = new EconomyManager();
