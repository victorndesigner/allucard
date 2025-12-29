# Design System - Nosferatu Allucard (Blood Edition)

Este documento detalha as especificações visuais do tema **Red / Dark Tech / Gamer Premium** aplicado ao projeto.

---

## 🎨 Paleta de Cores

### Cores Principais
*   **Fundo:** `#0a0a0a` (Preto profundo)
*   **Cor Primária (Vermelho):** `#ff0000`
*   **Cor Secundária (Sangue):** `#b92323`
*   **Sombra/Glow:** `rgba(255, 0, 0, 0.4)`
*   **Vidro:** `rgba(255, 255, 255, 0.03)` com `backdrop-filter: blur(12px)`

### Sistema de Raridades
*   🔴 **Lendário:** `#ff0000` (Glow intenso)
*   🟠 **Épico:** `#ff4d00`
*   ⚪ **Padrão:** `#e0e0e0`

---

## 🖋️ Tipografia e Espaçamento

### Escala de Fontes (Poppins / Arial)
*   **H1 (Headline):** `2.5rem` / `700` (Glow sutil)
*   **H2 (Sub-headline):** `1.8rem` / `600`
*   **P (Corpo):** `1rem` / `400` / Cor `#dcdcdc`

### Espaçamento
*   **Gap Grid:** `30px`
*   **Container Max-Width:** `1200px`
*   **Padding Seção:** `40px 20px`

---

## 🕹️ Componentes Premium

### 1. Header (Navegação)
*   **Estilo:** Vidro escuro (`rgba(10, 10, 10, 0.8)`), fixo no topo.
*   **Links:** Efeito hover com underline expansível em vermelho.
*   **Language Switcher:** Minimalista utilizando texto "PT" e "EN" em branco, sem ícones de bandeira.

### 2. Video Block / Cards
*   **Borda:** Borda sólida de `2px` com `border-image` de gradiente vermelho ou sombra neon rubi.
*   **Hover:** Escalonamento suave (`scale(1.02)`) e aumento do glow.
*   **Botões:** Vermelho sólido com transição para borda gradiente.

### 3. Sistema de Partículas
*   **Cor:** `rgba(255, 0, 0, 0.2)`
*   **Comportamento:** Queda suave (efeito neve/sangue), variáveis de velocidade e tamanho.

---

## 📱 Mobile First
*   Breakpoints: `768px` e `1024px`.
*   Navegação colapsável ou empilhada verticalmente com botões de largura total.
