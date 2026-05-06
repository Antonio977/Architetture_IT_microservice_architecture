# Gaming Portal - Architettura a Microservizi

Questo progetto didattico è stato creato appositamente per esplorare, comprendere ed evidenziare le differenze pratiche e teoriche tra un'architettura a **Microservizi** e una tradizionale architettura **Monolitica**.

L'applicazione simula un portale di giochi in cui gli utenti possono visualizzare un catalogo, controllare il proprio portafoglio virtuale e "acquistare" partite scalandone il costo dal saldo.

---

## 🎯 Scopo Didattico: Microservizi vs Monolite

Per comprendere le scelte progettuali di questa repository, è utile confrontare i due paradigmi architetturali:

### L'Approccio Monolitico (Tradizionale)
In un'architettura monolitica, tutte le funzionalità (catalogo, portafoglio, transazioni, interfaccia utente) sarebbero raggruppate in un'unica grande base di codice, eseguita in un singolo processo server e collegata a un unico grande database.
* **Pro:** Semplice da sviluppare inizialmente, facile da testare e da rilasciare.
* **Contro:** Man mano che il progetto cresce, il codice diventa un "piatto di spaghetti" (accoppiamento forte). Se c'è un bug critico nel sistema di pagamento, l'intera applicazione va in crash, rendendo inaccessibile anche la semplice visualizzazione del catalogo. Inoltre, non è possibile scalare solo una parte dell'app (es. dare più risorse solo al catalogo durante un picco di accessi).

### L'Approccio a Microservizi (Questo Progetto)
In questo progetto, l'applicazione è stata scomposta in servizi piccoli, indipendenti e focalizzati su una specifica logica di business. 
* **Pro:** Isolamento dei guasti (se il servizio `wallet` cade, il `catalog` continua a rispondere). I team possono sviluppare e rilasciare i servizi in modo indipendente. Permette di scalare orizzontalmente solo i servizi sotto stress.
* **Contro:** Introduce complessità di rete (i servizi devono comunicare tra loro), richiede una gestione avanzata degli errori e del tracciamento distribuito.

---

## 🧩 Architettura del Progetto

Il progetto utilizza **Node.js**, **TypeScript** e il framework **Moleculer** per orchestrare i servizi. I dati sono persistiti su un database **MariaDB/MySQL** tramite ORM **Sequelize**.

L'ecosistema è composto dai seguenti microservizi:

1. **Gateway Service (`gateway.service.ts`)**
   Agisce come punto di ingresso per il client (porta 3000). Serve l'interfaccia utente in HTML/JS e instrada le richieste HTTP REST verso i microservizi interni tramite l'API Gateway[cite: 2].

2. **Catalog Service (`catalog.service.ts`)**
   Gestisce l'elenco dei giochi. È responsabile di fornire i giochi attivi e validare se un gioco richiesto è attualmente giocabile[cite: 2].

3. **Wallet Service (`wallet.service.ts`)**
   Gestisce i saldi degli utenti. Permette di controllare il credito residuo e addebitare i costi delle partite sul portafoglio virtuale[cite: 2].

4. **Accounting Service (`accounting.service.ts`)**
   Il cuore transazionale. Questo servizio orchestra la complessa comunicazione inter-servizio: per autorizzare una partita, contatta prima il `catalog` per lo status del gioco, poi il `wallet` per verificare i fondi e procedere all'addebito, e infine registra l'esito della transazione[cite: 2].

---

## 🚀 Installazione e Avvio Locale

### Prerequisiti
* Node.js (v18+)
* MariaDB o MySQL Server in esecuzione locale

### Configurazione del Database
1. Accedi al tuo server database e crea il database per il progetto:
   ```sql
   CREATE DATABASE IF NOT EXISTS moleculer_db;
### Grafico del progetto

<img width="2676" height="1776" alt="V1 0_Grafico del progetto" src="https://github.com/user-attachments/assets/59036814-c65e-435c-8129-f2f7e2a93e93" />
