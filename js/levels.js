// Lógica dos Níveis, Formatos de Tabuleiro e Modos de Jogo
const LevelDatabase = {
    biomes: [
        { id: "versailles", name: "Jardins de Versalhes", className: "biome-versaillies", maxLevel: 5 },
        { id: "provence", name: "Campos de Lavanda - Provence", className: "biome-provence", maxLevel: 10 },
        { id: "paris", name: "Torre Eiffel & Flores", className: "biome-paris", maxLevel: 15 },
        { id: "zen", name: "Santuário Zen", className: "biome-zen", maxLevel: 25 }
    ],

    // Gerador de Níveis
    getLevelConfig: function(levelNum, mode = "campaign") {
        const availableTileKeys = Object.keys(TileAssets.tiles);
        
        if (mode === "zen") {
            // Modo Casual sem pressão
            const tileVariety = 5;
            const chosenTypes = availableTileKeys.slice(0, tileVariety);
            const totalTriplets = 8; // 24 peças
            return {
                levelNum: "Zen",
                biome: this.biomes[3],
                tiles: this.generateBoardTiles(chosenTypes, totalTriplets, "zen_relax")
            };
        }

        if (mode === "quick") {
            // Modo Rápido contra o relógio
            const tileVariety = 6;
            const chosenTypes = availableTileKeys.slice(0, tileVariety);
            const totalTriplets = 10; // 30 peças
            return {
                levelNum: "Blitz",
                timeLimit: 60, // 60 segundos
                biome: this.biomes[1],
                tiles: this.generateBoardTiles(chosenTypes, totalTriplets, "butterfly")
            };
        }

        // Modo Campanha Progressiva
        let biome = this.biomes[0];
        if (levelNum > 5) biome = this.biomes[1];
        if (levelNum > 10) biome = this.biomes[2];
        if (levelNum > 15) biome = this.biomes[3];

        const tileVariety = Math.min(3 + Math.floor(levelNum / 2), availableTileKeys.length);
        const chosenTypes = availableTileKeys.slice(0, tileVariety);
        const totalTriplets = 4 + Math.min(levelNum * 2, 12); // De 12 a 48 peças

        // Padrões de formato geométrico
        const patterns = ["grid", "pyramid", "butterfly", "frame", "diamond"];
        const pattern = patterns[(levelNum - 1) % patterns.length];

        return {
            levelNum: levelNum,
            biome: biome,
            tiles: this.generateBoardTiles(chosenTypes, totalTriplets, pattern)
        };
    },

    // Gera posições em camadas 3D (X, Y, Layer) garantindo que SEMPRE haja múltiplos de 3 para cada tipo
    generateBoardTiles: function(types, tripletsCount, pattern) {
        const totalTiles = tripletsCount * 3;
        
        const tilePool = [];
        for (let i = 0; i < tripletsCount; i++) {
            const type = types[i % types.length];
            tilePool.push(type, type, type);
        }

        // Embaralhar o pool de tipos
        for (let i = tilePool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [tilePool[i], tilePool[j]] = [tilePool[j], tilePool[i]];
        }

        // Coordenadas calculadas para caber em qualquer tela sem ultrapassar a largura máxima
        const positions = this.getPatternCoordinates(pattern, totalTiles);

        return positions.map((pos, index) => {
            return {
                id: `tile_${index}_${Date.now()}`,
                type: tilePool[index],
                x: pos.x,
                y: pos.y,
                layer: pos.layer || 0,
                isBlocked: false
            };
        });
    },

    getPatternCoordinates: function(pattern, count) {
        const coords = [];
        const tileW = 46;
        const tileH = 56;
        const centerX = 160;
        const centerY = 160;

        if (pattern === "frame") {
            let i = 0;
            const layers = Math.ceil(count / 16);
            for (let layer = 0; layer < layers && i < count; layer++) {
                const ringSize = 4;
                const offset = layer * 2;
                for (let r = 0; r < ringSize && i < count; r++) {
                    for (let c = 0; c < ringSize && i < count; c++) {
                        if (r === 0 || r === ringSize - 1 || c === 0 || c === ringSize - 1) {
                            coords.push({
                                x: centerX + (c - ringSize / 2 + 0.5) * tileW + offset,
                                y: centerY + (r - ringSize / 2 + 0.5) * tileH + offset,
                                layer: layer
                            });
                            i++;
                        }
                    }
                }
            }
        } else if (pattern === "butterfly") {
            let i = 0;
            const layers = Math.ceil(count / 18);
            for (let layer = 0; layer < layers && i < count; layer++) {
                for (let row = -2; row <= 2 && i < count; row++) {
                    const width = Math.abs(row) + 1;
                    for (let col = -width; col <= width && i < count; col++) {
                        if (Math.abs(col) !== 0 || Math.abs(row) < 2) {
                            coords.push({
                                x: centerX + col * (tileW * 0.72) + (layer * 3),
                                y: centerY + row * (tileH * 0.65) + (layer * 3),
                                layer: layer
                            });
                            i++;
                        }
                    }
                }
            }
        } else if (pattern === "pyramid") {
            let i = 0;
            let layer = 0;
            let currentGrid = 4;
            while (i < count && currentGrid >= 1) {
                for (let r = 0; r < currentGrid && i < count; r++) {
                    for (let c = 0; c < currentGrid && i < count; c++) {
                        coords.push({
                            x: centerX + (c - currentGrid / 2 + 0.5) * tileW,
                            y: centerY + (r - currentGrid / 2 + 0.5) * tileH,
                            layer: layer
                        });
                        i++;
                    }
                }
                currentGrid--;
                layer++;
            }
        } else {
            let i = 0;
            const cols = 5;
            const rows = 4;
            const layers = Math.ceil(count / (cols * rows));
            for (let layer = 0; layer < layers && i < count; layer++) {
                const shiftX = (layer % 2 === 1) ? tileW / 2 : 0;
                const shiftY = (layer % 2 === 1) ? tileH / 2 : 0;
                for (let r = 0; r < rows && i < count; r++) {
                    for (let c = 0; c < cols && i < count; c++) {
                        coords.push({
                            x: centerX + (c - cols / 2 + 0.5) * tileW + shiftX,
                            y: centerY + (r - rows / 2 + 0.5) * tileH + shiftY,
                            layer: layer
                        });
                        i++;
                    }
                }
            }
        }

        while (coords.length < count) {
            coords.push({
                x: centerX + (Math.random() * 60 - 30),
                y: centerY + (Math.random() * 60 - 30),
                layer: 3
            });
        }

        return coords.slice(0, count);
    }
};

window.LevelDatabase = LevelDatabase;
