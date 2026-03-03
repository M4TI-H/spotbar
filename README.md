# Spotbar — AI-Powered Visual Discovery & Menu Intelligence

**Spotbar** is a visual discovery platform dedicated exclusively to the world of bars and craft drinks. It solves the problem of "menu blindness" and the "paradox of choice" by leading users to a specific glass, not just the front door. By transforming static paper menus into live, searchable catalogs of flavors, Spotbar provides granular intelligence for modern drinkers and robust management tools for business owners[cite: 11, 15].

## Technologies

* **Frontend:** Nuxt 3, Typescript, Tailwind CSS.
* **Backend/Database:** Node.js, Supabase (PostgreSQL, Auth, Real-time).
* **AI & Computer Vision:** * **Gemini, OpenCV & OCR:** Planned for photo-to-menu synchronization and data extraction (names, descriptions, prices, ingredients).
* **LLM Integration:** AI-driven text transformation to ensure marketing compliance with 2026 alcohol advertising laws.
* **External Integrations:** Google/Apple Maps (Place ID) for navigation and mObywatel for +18 age verification.

## Key Features

### For Business Owners
* **AI Menu Digitalizer:** Instant digitization of physical menus through photo-to-menu synchronization.
* **Seasonal Swap:** Quickly hide or unhide drinks based on seasonal availability without re-typing data.
* **Ingredient Tagging:** Automatic, AI-supported tagging (e.g., "#Vegan", "#AlcoholFree") to help customers find items effortlessly.
* **Demand Analytics:** Comprehensive dashboard for competitor benchmarking and flavor analytics.

### For Customers
* **Granular Ingredient Search:** Search for specific ingredients like "Yuzu" or "Infused Bourbon" instead of just "Bars".
* **Item-Level Intelligence:** Visual reviews and photos for individual menu positions to identify "must-try" drinks.
* **Personalized Recommendations:** AI-generated suggestions based on individual palate preferences.
* **Interactive Map:** Visual discovery of nearby bars with live digital menus.

## Technical Implementation (Current Progress)

* **Dynamic Menu Builder:** A reactive interface for managing multi-level structures (Sections > Categories > Items).
* **Context-Aware UI:** Modular "Editable Field" system with smart currency formatting and "Hide attribute" logic.
* **AI Compliance Engine:** Implemented logic to transform raw promotional input into flavor-profile descriptions to meet legal standards.
* **Validated State Management:** Optimized Pinia store handling "Upsert" operations for menu sections and automatic position reordering.

## Future Roadmap

* **mObywatel Integration:** Full implementation of +18 age verification as required for digital alcohol catalogs.
* **Price Indexing:** Tools for brands to track market share and brand visibility.

## Stakeholders

* **Bar Owners & Regular Customers**.
* **Verified Critics:** Users with badges and specialized review status.
* **Brand Representatives:** Tracking sponsored ingredient placement and market trends.
* **M4TI-H:** Lead Architect & Full-stack Developer.

---
*SpotBar: Precision search tool for modern drinkers.*
