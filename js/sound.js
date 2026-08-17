// Motor de Áudio Orgânico com Timbres de Xilofone/Marimba, Harpa e Trilha Melódica Alegre
class SoundManager {
    constructor() {
        this.ctx = null;
        this.soundEnabled = true;
        this.musicEnabled = true;
        this.isMusicPlaying = false;
        this.musicInterval = null;
        this.init();
    }

    init() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            this.ctx = new AudioContext();
        }
        const s = localStorage.getItem('tile_sound_enabled');
        const m = localStorage.getItem('tile_music_enabled');
        if (s !== null) this.soundEnabled = s === 'true';
        if (m !== null) this.musicEnabled = m === 'true';
    }

    ensureContext() {
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    // Timbre tipo Marimba/Xilofone orgânico (com harmônicos ricos e decay natural)
    playMarimbaTone(freq, duration = 0.4, gainLevel = 0.3) {
        if (!this.soundEnabled || !this.ctx) return;
        this.ensureContext();

        const now = this.ctx.currentTime;
        // Fundamental
        const osc1 = this.ctx.createOscillator();
        const gain1 = this.ctx.createGain();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(freq, now);

        // Harmônico secundário (característico de madeira/marimba)
        const osc2 = this.ctx.createOscillator();
        const gain2 = this.ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(freq * 3.8, now); // sobretom metálico/madeira

        // Envelope com ataque instantâneo e decaimento exponencial
        gain1.gain.setValueAtTime(0.001, now);
        gain1.gain.linearRampToValueAtTime(gainLevel, now + 0.008);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        gain2.gain.setValueAtTime(0.001, now);
        gain2.gain.linearRampToValueAtTime(gainLevel * 0.4, now + 0.005);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + (duration * 0.4));

        osc1.connect(gain1);
        osc2.connect(gain2);
        gain1.connect(this.ctx.destination);
        gain2.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);
    }

    playClick() {
        this.playMarimbaTone(784, 0.15, 0.2); // G5 suave
    }

    playTileSelect() {
        // Notas alegres de marimba em escala pentatônica
        const notes = [523.25, 587.33, 659.25, 783.99, 880, 1046.5];
        const f = notes[Math.floor(Math.random() * notes.length)];
        this.playMarimbaTone(f, 0.25, 0.35);
    }

    playMatch(comboCount = 1) {
        if (!this.soundEnabled || !this.ctx) return;
        this.ensureContext();

        // Acorde alegre de Harpa / Sino de Vento (C - E - G - B - C)
        const baseChord = [523.25, 659.25, 783.99, 987.77, 1046.5, 1318.5];
        const pitchMult = Math.min(1 + (comboCount - 1) * 0.12, 1.8);

        baseChord.forEach((f, i) => {
            setTimeout(() => {
                this.playMarimbaTone(f * pitchMult, 0.5, 0.3);
            }, i * 45);
        });
    }

    playPowerup() {
        if (!this.soundEnabled || !this.ctx) return;
        this.ensureContext();
        const arpeggio = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
        arpeggio.forEach((f, i) => {
            setTimeout(() => {
                this.playMarimbaTone(f, 0.35, 0.25);
            }, i * 35);
        });
    }

    playWin() {
        if (!this.soundEnabled || !this.ctx) return;
        this.ensureContext();
        // Fanfarra alegre com marimba e carrilhão
        const fanfare = [
            { f: 523.25, d: 0.12, t: 0 },
            { f: 659.25, d: 0.12, t: 100 },
            { f: 783.99, d: 0.12, t: 200 },
            { f: 1046.5, d: 0.45, t: 300 },
            { f: 880.00, d: 0.12, t: 500 },
            { f: 1046.5, d: 0.60, t: 650 }
        ];

        fanfare.forEach(note => {
            setTimeout(() => {
                this.playMarimbaTone(note.f, note.d, 0.4);
            }, note.t);
        });
    }

    playLose() {
        if (!this.soundEnabled || !this.ctx) return;
        this.ensureContext();
        const notes = [493.88, 466.16, 440.00, 392.00];
        notes.forEach((f, i) => {
            setTimeout(() => {
                this.playMarimbaTone(f, 0.4, 0.25);
            }, i * 140);
        });
    }

    // Música Ambiente Alegre, Acústica & Dinâmica (Marimba + Baixo Acústico + Harmonia Zen)
    startAmbientMusic() {
        if (!this.musicEnabled || !this.ctx || this.isMusicPlaying) return;
        this.ensureContext();
        this.isMusicPlaying = true;

        // Frase melódica fofa e alegre em C Maior / Lydian
        const melodyPhrases = [
            // Compasso 1
            [
                { f: 523.25, t: 0, d: 0.3 },   // C5
                { f: 659.25, t: 250, d: 0.3 }, // E5
                { f: 783.99, t: 500, d: 0.35 },// G5
                { f: 659.25, t: 750, d: 0.25 },// E5
                { f: 880.00, t: 1000, d: 0.4 } // A5
            ],
            // Compasso 2
            [
                { f: 783.99, t: 0, d: 0.3 },   // G5
                { f: 659.25, t: 250, d: 0.25 },// E5
                { f: 587.33, t: 500, d: 0.35 },// D5
                { f: 523.25, t: 800, d: 0.5 }  // C5
            ],
            // Compasso 3 (Variação fofa)
            [
                { f: 659.25, t: 0, d: 0.3 },   // E5
                { f: 783.99, t: 250, d: 0.3 }, // G5
                { f: 1046.5, t: 500, d: 0.4 }, // C6
                { f: 987.77, t: 750, d: 0.3 }, // B5
                { f: 783.99, t: 1000, d: 0.4 } // G5
            ],
            // Compasso 4
            [
                { f: 880.00, t: 0, d: 0.3 },   // A5
                { f: 783.99, t: 250, d: 0.3 }, // G5
                { f: 587.33, t: 500, d: 0.35 },// D5
                { f: 523.25, t: 750, d: 0.6 }  // C5
            ]
        ];

        // Baixo acústico suave
        const bassNotes = [261.63, 220.00, 174.61, 196.00]; // C4, A3, F3, G3

        let step = 0;
        this.musicInterval = setInterval(() => {
            if (!this.musicEnabled || !this.isMusicPlaying) return;

            const phraseIndex = step % melodyPhrases.length;
            const currentPhrase = melodyPhrases[phraseIndex];
            const currentBass = bassNotes[phraseIndex];

            // Toca baixo
            this.playMarimbaTone(currentBass * 0.5, 1.2, 0.15);

            // Toca melodia
            currentPhrase.forEach(n => {
                setTimeout(() => {
                    if (this.musicEnabled && this.isMusicPlaying) {
                        this.playMarimbaTone(n.f, n.d, 0.12);
                    }
                }, n.t);
            });

            step++;
        }, 1500);
    }

    stopAmbientMusic() {
        this.isMusicPlaying = false;
        if (this.musicInterval) {
            clearInterval(this.musicInterval);
            this.musicInterval = null;
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('tile_sound_enabled', this.soundEnabled);
        return this.soundEnabled;
    }

    toggleMusic() {
        this.musicEnabled = !this.musicEnabled;
        localStorage.setItem('tile_music_enabled', this.musicEnabled);
        if (this.musicEnabled) {
            this.startAmbientMusic();
        } else {
            this.stopAmbientMusic();
        }
        return this.musicEnabled;
    }
}

window.soundManager = new SoundManager();
