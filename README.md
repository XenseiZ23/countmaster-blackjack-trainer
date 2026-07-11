<img src="./public/hero_banner.png" alt="Blackjack Academy Banner" width="100%" style="border-radius: 12px; margin-bottom: 24px;" referrerPolicy="no-referrer" />

# Blackjack Academy

Blackjack Academy is a professional-grade, high-fidelity cognitive training simulator designed to sharpen card counting accuracy, mental processing speeds, and basic playing strategy under realistic casino conditions. Engineered as an interactive laboratory, this desktop-optimized application allows memory athletes and serious players to refine mathematical systems and decision-making skills with zero monetary risk.

---

## Core Training Methodology

Unlike traditional casino games, Blackjack Academy is built from the ground up as an educational gymnasium. The application separates raw card counting training from tactical decision-making to build clean muscle memory and minimize cognitive overload.

### Trainer Mode (Speed and Accuracy Drills)
Trainer Mode is a focused, high-repetition drill engine designed to train visual reflexes and counting automaticity.
* **Speed Customization:** Users can configure auto-dealing timers from relaxed paces to hyper-speed dealing rates to continually push their limits.
* **Count Memory Testing:** After a designated series of cards or shoe penetration, the engine challenges your accumulated mental running count, providing instant accuracy grading.
* **Minimalist Interface:** Zero gameplay options (no hits, stands, or bets) are active in this mode, allowing complete concentration on Hi-Lo identification.

### Casino Mode (Simultaneous Action Integration)
Casino Mode simulates a full, realistic game table where the player must coordinate several complex mental tasks at once.
* **Basic Strategy Verification:** The system evaluates every action (Hit, Stand, Double Down, Split, or Surrender) against mathematically optimal strategy charts and highlights errors instantly.
* **Fictional Wagering:** Players practice sizing bets dynamically based on the True Count to manage a virtual bankroll, preparing them for physical advantage-play logistics.
* **Complex Scenarios:** The engine specifically serves high-difficulty hands, such as soft totals and pairs, where counting errors are statistically most common.

---

## The Hi-Lo Counting System

The simulation utilizes the **Hi-Lo system**, the globally accepted industry-standard method for card tracking. Each rank in the deck is assigned a strategic value:

| Card Rank | Value | Impact on Player Edge |
| :--- | :---: | :--- |
| **2, 3, 4, 5, 6** | **+1** | Low cards. Their removal from the shoe increases player advantage. |
| **7, 8, 9** | **0** | Neutral cards. Their removal does not alter the mathematical house edge. |
| **10, Jack, Queen, King, Ace** | **-1** | High cards. Their removal from the shoe decreases player advantage. |

### Technical Calculations
* **Running Count:** The ongoing algebraic sum of card values dealt since the last shuffle.
* **True Count:** In multi-deck shoes, the Running Count is divided by the estimated remaining decks to establish the exact player advantage:
  $$\text{True Count} = \frac{\text{Running Count}}{\text{Remaining Decks}}$$

---

## Technical Specifications

The system architecture is engineered for low latency, high frame-rate rendering, and precise state propagation:

* **Framework:** React 19 (Functional architecture with custom hooks)
* **Language:** TypeScript (Static type safety and strict schema contracts)
* **Build System:** Vite 6 (Highly optimized code-splitting and bundling)
* **Styling Engine:** Tailwind CSS 4 (Custom hardware-friendly theme definitions)
* **Animation Core:** Motion / Framer Motion (GPU-accelerated card dealings and transitions)
* **Asset Handling:** Pre-rendered minimalist high-contrast typography and custom graphic configurations.

---

## Local Development and Deployment

Follow these commands to configure, build, and test the workspace locally:

### Installation
Ensure Node.js (v18.0+) is installed, then run:
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build Production Bundle
To compile optimized static files into the `/dist` directory for deployment:
```bash
npm run build
```

### Code Quality Audits
```bash
npm run lint
```

---

## Educational and Ethical Disclaimer

Blackjack Academy is an educational resource intended purely for memory exercises, scientific calculation, and cognitive study. The platform features no real-money gambling, virtual currency purchases, or financial transactions. Blackjack Academy does not encourage, facilitate, or endorse real-money casino play. Card counting and basic strategy are mathematical concepts; they do not guarantee winning outcomes or alter the underlying risk parameters of land-based casino gambling.
