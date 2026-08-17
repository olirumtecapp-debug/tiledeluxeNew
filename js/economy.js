// Gerenciador de Economia, Conquistas, Inventário e Sistema de IAP (Google Play Billing Ready)
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

    // Google Play Store Billing / IAP Hook
    purchaseProduct(productId) {
        // Se estiver rodando em ambiente nativo Android (Capacitor/Cordova)
        if (window.AndroidBillingInterface) {
            window.AndroidBillingInterface.buy(productId);
            return;
        }

        // Simulação instantânea de compras no Web App
        switch(productId) {
            case 'coins_small':
                this.addGold(500);
                this.addDiamonds(5);
                alert("✨ Compra realizada com sucesso! +500 Moedas e +5 Diamantes!");
                break;
            case 'coins_medium':
                this.addGold(1500);
                this.addDiamonds(20);
                this.addPowerup('wand', 2);
                alert("✨ Compra realizada! +1.500 Moedas, +20 Diamantes e +2 Varinhas!");
                break;
            case 'diamonds_vault':
                this.addDiamonds(100);
                this.addPowerup('undo', 5);
                this.addPowerup('wand', 5);
                this.addPowerup('shuffle', 5);
                alert("💎 Cofre Real Desbloqueado! +100 Diamantes e Mega Pacote de Power-ups!");
                break;
            case 'powerups_bundle':
                this.addPowerup('undo', 3);
                this.addPowerup('wand', 3);
                this.addPowerup('shuffle', 3);
                this.addPowerup('extraSlot', 2);
                alert("⚡ Mega Combo de Power-ups Adicionado!");
                break;
            default:
                break;
        }
        window.soundManager.playWin();
    }

    updateUI() {
        document.querySelectorAll('.gold-val').forEach(el => el.textContent = this.gold);
        document.querySelectorAll('.diamond-val').forEach(el => el.textContent = this.diamonds);
        
        // Atualiza contadores de power-ups na tela
        if (document.getElementById('undo-count')) document.getElementById('undo-count').textContent = this.powerups.undo;
        if (document.getElementById('wand-count')) document.getElementById('wand-count').textContent = this.powerups.wand;
        if (document.getElementById('shuffle-count')) document.getElementById('shuffle-count').textContent = this.powerups.shuffle;
    }
}

window.economyManager = new EconomyManager();
