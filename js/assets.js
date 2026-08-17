// Catálogo Expandido de Peças 3D em Alta Definição: Frutas Suculentas, Borboletas, Passarinhos, Flores e Cristais
const TileAssets = {
    tiles: {
        // 🍎 MAÇÃ VERMELHA SUCULENTA (com gota de orvalho e folha 3D)
        apple: {
            name: "Maçã Vermelha",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <radialGradient id="appleGrad" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#ff5252"/>
                        <stop offset="45%" stop-color="#d50000"/>
                        <stop offset="90%" stop-color="#8b0000"/>
                        <stop offset="100%" stop-color="#400000"/>
                    </radialGradient>
                    <linearGradient id="appleLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#76ff03"/>
                        <stop offset="100%" stop-color="#2e7d32"/>
                    </linearGradient>
                    <radialGradient id="dewGlow" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="70%" stop-color="rgba(255,255,255,0.4)"/>
                        <stop offset="100%" stop-color="rgba(0,0,0,0.1)"/>
                    </radialGradient>
                </defs>
                <!-- Caule -->
                <path d="M50 28 C52 14, 58 10, 62 8" stroke="#4e342e" stroke-width="4.5" stroke-linecap="round" fill="none"/>
                <!-- Folha brilhante -->
                <path d="M52 20 C68 8, 80 18, 72 30 C58 32, 54 24, 52 20" fill="url(#appleLeaf)"/>
                <path d="M52 20 Q64 22, 70 28" stroke="#1b5e20" stroke-width="1.8" fill="none"/>
                <!-- Corpo da Maçã com Curvatura Realista -->
                <path d="M50 32 C35 22, 14 36, 18 64 C22 86, 42 92, 50 88 C58 92, 78 86, 82 64 C86 36, 65 22, 50 32 Z" fill="url(#appleGrad)"/>
                <!-- Brilho 3D de Luz Superior -->
                <ellipse cx="36" cy="45" rx="14" ry="9" fill="rgba(255,255,255,0.45)" transform="rotate(-30 36 45)"/>
                <!-- Gotas de Orvalho realistas -->
                <ellipse cx="32" cy="62" rx="3.5" ry="4" fill="url(#dewGlow)"/>
                <circle cx="31" cy="61" r="1" fill="#ffffff"/>
                <ellipse cx="42" cy="74" rx="2.5" ry="3" fill="url(#dewGlow)"/>
                <circle cx="41" cy="73.5" r="0.8" fill="#ffffff"/>
            </svg>`
        },

        // 🍊 LARANJA VIBRANTE
        orange: {
            name: "Laranja Solar",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <radialGradient id="orangeGrad" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stop-color="#ffe082"/>
                        <stop offset="35%" stop-color="#ff9800"/>
                        <stop offset="85%" stop-color="#e65100"/>
                        <stop offset="100%" stop-color="#bf360c"/>
                    </radialGradient>
                </defs>
                <!-- Folhinha -->
                <path d="M55 24 C68 12, 82 20, 78 32 C65 34, 58 26, 55 24" fill="#4caf50"/>
                <path d="M50 26 Q54 18, 56 12" stroke="#3e2723" stroke-width="4" stroke-linecap="round" fill="none"/>
                <!-- Corpo da Laranja -->
                <circle cx="50" cy="56" r="32" fill="url(#orangeGrad)"/>
                <!-- Textura de poros de casca -->
                <circle cx="38" cy="46" r="1.2" fill="#bf360c" opacity="0.4"/>
                <circle cx="46" cy="42" r="1.2" fill="#bf360c" opacity="0.4"/>
                <circle cx="60" cy="52" r="1.2" fill="#bf360c" opacity="0.4"/>
                <circle cx="42" cy="68" r="1.2" fill="#bf360c" opacity="0.4"/>
                <circle cx="58" cy="66" r="1.2" fill="#bf360c" opacity="0.4"/>
                <!-- Brilho especular -->
                <ellipse cx="38" cy="44" rx="12" ry="7" fill="rgba(255,255,255,0.5)" transform="rotate(-25 38 44)"/>
            </svg>`
        },

        // 🍇 UVAS ROXAS CRISTALINAS
        grape: {
            name: "Uvas Roxas",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <radialGradient id="grapeBerry" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#e1bee7"/>
                        <stop offset="40%" stop-color="#ab47bc"/>
                        <stop offset="85%" stop-color="#6a1b9a"/>
                        <stop offset="100%" stop-color="#311b92"/>
                    </radialGradient>
                    <linearGradient id="vineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#81c784"/>
                        <stop offset="100%" stop-color="#2e7d32"/>
                    </linearGradient>
                </defs>
                <!-- Gavinhas e Caule -->
                <path d="M50 22 Q54 10, 62 12" stroke="#5d4037" stroke-width="4" stroke-linecap="round" fill="none"/>
                <path d="M42 22 Q30 16, 28 26 Q35 24, 40 25" stroke="#388e3c" stroke-width="2.5" fill="none"/>
                <!-- Folha de Parreira recortada -->
                <path d="M50 24 C40 12, 22 18, 30 32 C38 28, 48 30, 50 24" fill="url(#vineGrad)"/>
                <!-- Bagas de Uva em Camadas -->
                <circle cx="36" cy="38" r="11" fill="url(#grapeBerry)"/>
                <circle cx="58" cy="36" r="11" fill="url(#grapeBerry)"/>
                <circle cx="28" cy="54" r="11.5" fill="url(#grapeBerry)"/>
                <circle cx="48" cy="50" r="12" fill="url(#grapeBerry)"/>
                <circle cx="68" cy="52" r="11.5" fill="url(#grapeBerry)"/>
                <circle cx="38" cy="68" r="11" fill="url(#grapeBerry)"/>
                <circle cx="58" cy="67" r="11" fill="url(#grapeBerry)"/>
                <circle cx="48" cy="82" r="10" fill="url(#grapeBerry)"/>
                <!-- Brilhos nas bagas da frente -->
                <circle cx="44" cy="46" r="3" fill="rgba(255,255,255,0.65)"/>
                <circle cx="25" cy="50" r="2.5" fill="rgba(255,255,255,0.6)"/>
                <circle cx="65" cy="48" r="2.5" fill="rgba(255,255,255,0.6)"/>
                <circle cx="45" cy="78" r="2" fill="rgba(255,255,255,0.6)"/>
            </svg>`
        },

        // 🦋 BORBOLETA AZUL REAL
        butterfly: {
            name: "Borboleta Real",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <radialGradient id="wingGrad1" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#80d8ff"/>
                        <stop offset="50%" stop-color="#0091ea"/>
                        <stop offset="100%" stop-color="#012b66"/>
                    </radialGradient>
                    <radialGradient id="wingGrad2" cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#b388ff"/>
                        <stop offset="60%" stop-color="#651fff"/>
                        <stop offset="100%" stop-color="#1a0066"/>
                    </radialGradient>
                </defs>
                <!-- Asas Superiores -->
                <path d="M50 48 C45 20, 10 15, 12 45 C14 62, 45 58, 50 50" fill="url(#wingGrad1)"/>
                <path d="M50 48 C55 20, 90 15, 88 45 C86 62, 55 58, 50 50" fill="url(#wingGrad1)"/>
                <!-- Asas Inferiores -->
                <path d="M50 50 C44 60, 20 62, 24 78 C28 88, 48 80, 50 54" fill="url(#wingGrad2)"/>
                <path d="M50 50 C56 60, 80 62, 76 78 C72 88, 52 80, 50 54" fill="url(#wingGrad2)"/>
                <!-- Manchas Brilhantes nas Asas -->
                <circle cx="28" cy="38" r="4.5" fill="#ffffff" opacity="0.8"/>
                <circle cx="72" cy="38" r="4.5" fill="#ffffff" opacity="0.8"/>
                <circle cx="34" cy="74" r="3" fill="#ffe57f" opacity="0.85"/>
                <circle cx="66" cy="74" r="3" fill="#ffe57f" opacity="0.85"/>
                <!-- Corpo e Antenas -->
                <ellipse cx="50" cy="50" rx="3" ry="16" fill="#212121"/>
                <path d="M48 36 Q42 22, 38 24" stroke="#212121" stroke-width="2" stroke-linecap="round" fill="none"/>
                <path d="M52 36 Q58 22, 62 24" stroke="#212121" stroke-width="2" stroke-linecap="round" fill="none"/>
            </svg>`
        },

        // 🐦 PASSARINHO AZUL CANÁRIO
        bird: {
            name: "Passarinho Cantor",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <radialGradient id="birdBody" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#4fc3f7"/>
                        <stop offset="55%" stop-color="#0288d1"/>
                        <stop offset="100%" stop-color="#01579b"/>
                    </radialGradient>
                    <radialGradient id="birdBelly" cx="40%" cy="40%" r="60%">
                        <stop offset="0%" stop-color="#fff9c4"/>
                        <stop offset="60%" stop-color="#ffd54f"/>
                        <stop offset="100%" stop-color="#ffb300"/>
                    </radialGradient>
                </defs>
                <!-- Rabinho -->
                <path d="M26 62 L10 74 L22 54 Z" fill="#01579b"/>
                <path d="M24 64 L8 80 L20 60 Z" fill="#0277bd"/>
                <!-- Corpo e Cabeça -->
                <ellipse cx="48" cy="52" rx="24" ry="20" fill="url(#birdBody)"/>
                <!-- Peito/Barriga Amarela -->
                <path d="M52 44 C66 48, 68 66, 52 70 C40 70, 42 52, 52 44 Z" fill="url(#birdBelly)"/>
                <!-- Asa -->
                <path d="M30 46 C34 38, 48 40, 46 56 C44 68, 30 64, 30 46 Z" fill="#0277bd"/>
                <path d="M34 46 Q42 46, 42 54" stroke="rgba(255,255,255,0.4)" stroke-width="2" fill="none"/>
                <!-- Bico Laranja -->
                <polygon points="70,44 86,48 70,54" fill="#ff6f00"/>
                <!-- Olho Brilhante -->
                <circle cx="62" cy="42" r="4.5" fill="#212121"/>
                <circle cx="63.5" cy="40.5" r="1.5" fill="#ffffff"/>
            </svg>`
        },

        // 🍓 MORANGO SUCULENTO
        strawberry: {
            name: "Morango Doce",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <radialGradient id="strawGrad2" cx="35%" cy="30%" r="70%">
                        <stop offset="0%" stop-color="#ff5252"/>
                        <stop offset="60%" stop-color="#d50000"/>
                        <stop offset="100%" stop-color="#7f0000"/>
                    </radialGradient>
                </defs>
                <!-- Folhas do topo -->
                <path d="M50 24 C40 10, 22 15, 30 26 C36 18, 50 20, 50 24 C50 20, 64 18, 70 26 C78 15, 60 10, 50 24" fill="#43a047"/>
                <path d="M50 22 L50 12 Q52 8 56 10" stroke="#2e7d32" stroke-width="4" fill="none" stroke-linecap="round"/>
                <!-- Corpo morango -->
                <path d="M28 28 C14 44, 24 78, 50 92 C76 78, 86 44, 72 28 C58 22, 42 22, 28 28 Z" fill="url(#strawGrad2)"/>
                <!-- Pontos amarelos com relevo -->
                <ellipse cx="38" cy="42" rx="2" ry="3.5" fill="#ffe082" transform="rotate(-10 38 42)"/>
                <ellipse cx="62" cy="42" rx="2" ry="3.5" fill="#ffe082" transform="rotate(10 62 42)"/>
                <ellipse cx="50" cy="52" rx="2" ry="3.5" fill="#ffe082"/>
                <ellipse cx="36" cy="62" rx="2" ry="3.5" fill="#ffe082" transform="rotate(-15 36 62)"/>
                <ellipse cx="64" cy="62" rx="2" ry="3.5" fill="#ffe082" transform="rotate(15 64 62)"/>
                <ellipse cx="50" cy="74" rx="1.8" ry="3" fill="#ffe082"/>
                <!-- Brilho 3D -->
                <path d="M32 34 C24 46, 28 62, 32 66" stroke="rgba(255,255,255,0.6)" stroke-width="3" fill="none" stroke-linecap="round"/>
            </svg>`
        },

        // 🍒 CEREJAS BRILHANTES
        cherry: {
            name: "Cerejas",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <radialGradient id="cherryGrad" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stop-color="#ff5252"/>
                        <stop offset="55%" stop-color="#c2185b"/>
                        <stop offset="100%" stop-color="#560027"/>
                    </radialGradient>
                </defs>
                <path d="M50 18 Q40 45, 34 58" stroke="#33691e" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M50 18 Q65 40, 68 54" stroke="#33691e" stroke-width="4" fill="none" stroke-linecap="round"/>
                <path d="M48 18 Q58 10, 64 12 C62 20, 54 22, 48 18" fill="#689f38"/>
                <circle cx="34" cy="64" r="18" fill="url(#cherryGrad)"/>
                <circle cx="29" cy="58" r="4.5" fill="rgba(255,255,255,0.7)"/>
                <circle cx="68" cy="60" r="18" fill="url(#cherryGrad)"/>
                <circle cx="63" cy="54" r="4.5" fill="rgba(255,255,255,0.7)"/>
            </svg>`
        },

        // 🍋 LIMÃO SICILIANO
        lemon: {
            name: "Limão Siciliano",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <radialGradient id="lemonGrad2" cx="35%" cy="35%" r="65%">
                        <stop offset="0%" stop-color="#fff59d"/>
                        <stop offset="60%" stop-color="#fbc02d"/>
                        <stop offset="100%" stop-color="#e65100"/>
                    </radialGradient>
                </defs>
                <path d="M68 25 C75 16, 86 18, 80 30 C70 32, 65 28, 68 25" fill="#43a047"/>
                <path d="M22 68 C14 48, 30 20, 60 24 C82 28, 88 56, 75 75 C58 92, 30 86, 22 68 Z" fill="url(#lemonGrad2)"/>
                <path d="M22 68 Q18 72 15 70 Q18 64 22 68" fill="#e65100"/>
                <ellipse cx="44" cy="40" rx="14" ry="7" fill="rgba(255,255,255,0.5)" transform="rotate(-30 44 40)"/>
            </svg>`
        },

        // 🌸 FLOR DE CEREJEIRA SAKURA
        flower: {
            name: "Flor de Cerejeira",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <radialGradient id="sakuraGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stop-color="#ffffff"/>
                        <stop offset="45%" stop-color="#f48fb1"/>
                        <stop offset="100%" stop-color="#c2185b"/>
                    </radialGradient>
                </defs>
                <circle cx="50" cy="28" r="16" fill="url(#sakuraGrad)"/>
                <circle cx="70" cy="42" r="16" fill="url(#sakuraGrad)"/>
                <circle cx="62" cy="70" r="16" fill="url(#sakuraGrad)"/>
                <circle cx="38" cy="70" r="16" fill="url(#sakuraGrad)"/>
                <circle cx="30" cy="42" r="16" fill="url(#sakuraGrad)"/>
                <circle cx="50" cy="50" r="10" fill="#fdd835"/>
                <circle cx="50" cy="50" r="6" fill="#f57f17"/>
            </svg>`
        },

        // 💎 DIAMANTE / CRISTAL MÁGICO
        gem: {
            name: "Cristal Mágico",
            svg: `
            <svg viewBox="0 0 100 100" class="tile-icon">
                <defs>
                    <linearGradient id="gemGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#ea80fc"/>
                        <stop offset="50%" stop-color="#aa00ff"/>
                        <stop offset="100%" stop-color="#4a148c"/>
                    </linearGradient>
                </defs>
                <polygon points="50,15 80,38 70,82 30,82 20,38" fill="url(#gemGrad2)" stroke="#f3e5f5" stroke-width="1.5"/>
                <polygon points="50,15 35,38 65,38" fill="#f3e5f5" opacity="0.8"/>
                <polygon points="20,38 35,38 30,82" fill="#7b1fa2" opacity="0.6"/>
                <polygon points="80,38 65,38 70,82" fill="#4a148c" opacity="0.7"/>
                <polygon points="35,38 65,38 50,82" fill="#ce93d8" opacity="0.85"/>
                <!-- Brilho estelar -->
                <circle cx="42" cy="32" r="2.5" fill="#ffffff"/>
            </svg>`
        }
    }
};

window.TileAssets = TileAssets;
