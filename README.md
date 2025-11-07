# 🛍️ E-commerce Catalog

[![Repo](https://img.shields.io/badge/github-aiSoSa3005%2F%E2%80%8BE--commerce--catalog-24292e?logo=github)](https://github.com/aiSoSa3005/E-commerce-catalog)
[![Status](https://img.shields.io/badge/status-WIP-orange)](#-roadmap)
[![License](https://img.shields.io/badge/license-MIT-informational)](#-licenza)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen)](#-contribuire)

Catalogo prodotti per e-commerce: ricerca, filtri e lista prodotti. **Progetto in corso**: alcune funzionalità sono prototipi / placeholder.

---

## 📋 Indice
- [Obiettivi](#-obiettivi)
- [Demo](#-demo)
- [Funzionalità](#-funzionalità)
- [Stack Tecnologico](#-stack-tecnologico)
- [Struttura Progetto](#-struttura-progetto)
- [Come avviare](#-come-avviare)
- [Variabili d’Ambiente](#-variabili-dambiente)
- [Qualità & Script](#-qualità--script)
- [Roadmap](#-roadmap)
- [Note di Architettura](#-note-di-architettura)
- [Screenshot](#-screenshot)
- [Contribuire](#-contribuire)
- [Licenza](#-licenza)

---

## 🎯 Obiettivi
Un catalogo pulito e veloce per:
- sfogliare prodotti,
- filtrare/ordinare,
- preparare la base per carrello e checkout.

> **Nota**: il progetto è pensato come training React/FE e verrà esteso in fasi.

---

## 🌐 Demo
- Deploy: **(in arrivo)**  
- Design preview: **(aggiungi immagini sotto)**

---

## ✨ Funzionalità
**Fatto**
- [x] Impianto base UI e routing
- [x] Lista prodotti mock/fake API
- [x] Ricerca base / filtro semplice

**In corso**
- [ ] Paginazione / infinite scroll
- [ ] Filtri multipli (prezzo, categoria, rating)
- [ ] Dettaglio prodotto

**Pianificato**
- [ ] Carrello (Zustand/Context)
- [ ] Persistenza stato (localStorage)
- [ ] Autenticazione (login/registrazione)
- [ ] Backend/integrazione API reali

---

## 🧰 Stack Tecnologico
> Aggiorna questa lista secondo il tuo progetto reale.

- **React** + **Vite** (o CRA)  
- **TypeScript** *(se presente)*
- **Tailwind CSS** / **shadcn/ui** *(se presenti)*
- **Zustand** per stato globale *(se presente)*
- **Axios** / **fetch** per API
- Linting: **ESLint** + **Prettier**

---

## 🗂 Struttura Progetto
```txt
E-commerce-catalog/
├─ src/
│  ├─ components/         # UI atomiche e composizioni
│  ├─ pages/              # route pages (Catalog, Product, NotFound)
│  ├─ hooks/              # custom hooks (useProducts, useFilters, ...)
│  ├─ store/              # stato globale (es. cartStore.ts)
│  ├─ services/           # client API / adapters
│  ├─ types/              # tipi TS (Product, Category, ...)
│  ├─ utils/              # helper (formatPrice, debounce, ...)
│  ├─ assets/             # immagini/statici
│  └─ main.tsx
├─ public/
├─ .env.example
├─ package.json
└─ README.md
