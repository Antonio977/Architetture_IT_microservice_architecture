# Table of Contents
- LICENSE
- README.md
- .env
- tsconfig.json
- molecular.config.ts
- package.json
- public/index.html
- public/app.js
- src/gateway.service.ts
- src/accounting.service.ts
- src/catalog.service.ts
- src/wallet.service.ts

## File: LICENSE

- Extension: 
- Language: unknown
- Size: 1074 bytes
- Created: 2026-05-04 22:51:45
- Modified: 2026-05-04 22:51:45

### Code

```unknown
MIT License

Copyright (c) 2026 Antonio Cocchiaro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## File: README.md

- Extension: .md
- Language: markdown
- Size: 68 bytes
- Created: 2026-05-04 22:59:53
- Modified: 2026-05-04 22:59:53

### Code

```markdown
# Architetture_IT_microservice_architecture
Exercise to learn java


```

## File: .env

- Extension: 
- Language: unknown
- Size: 287 bytes
- Created: 2026-05-04 23:29:46
- Modified: 2026-05-04 23:29:46

### Code

```unknown
# Porta su cui girerà il server web (il frontend)
PORT=3000

# Connessione al database MySQL
# Formato: mysql://UTENTE:PASSWORD@HOST:PORTA/NOME_DATABASE
# Sostituisci 'root' e 'password' con le credenziali del tuo MySQL locale
MYSQL_URI=mysql://root:password@localhost:3306/moleculer_db
```

## File: tsconfig.json

- Extension: .json
- Language: json
- Size: 425 bytes
- Created: 2026-05-04 23:29:46
- Modified: 2026-05-04 23:29:46

### Code

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "CommonJS",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": [
    "src/**/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

## File: molecular.config.ts

- Extension: .ts
- Language: typescript
- Size: 344 bytes
- Created: 2026-05-05 00:16:55
- Modified: 2026-05-05 00:16:55

### Code

```typescript
import { BrokerOptions } from "moleculer";

const brokerConfig: BrokerOptions = {
    namespace: "gaming-portal",
    nodeID: "node-" + process.pid,
    logger: "Console",
    logLevel: "info",
    transporter: "TCP",
    serializer: "JSON",
    faultTolerance: {
        enabled: true,
        retries: 3
    }
};

export default brokerConfig;
```

## File: package.json

- Extension: .json
- Language: json
- Size: 683 bytes
- Created: 2026-05-05 00:16:55
- Modified: 2026-05-05 00:16:55

### Code

```json
{
  "name": "moleculer-gaming-microservices",
  "version": "1.0.0",
  "description": "Microservices project with MoleculerJS, Sequelize, and MySQL",
  "main": "index.js",
  "scripts": {
    "dev": "moleculer-runner --repl --config moleculer.config.ts src/*.service.ts",
    "start": "moleculer-runner --config moleculer.config.ts src/*.service.ts"
  },
  "dependencies": {
    "moleculer": "^0.14.33",
    "moleculer-db": "^0.8.23",
    "moleculer-db-adapter-sequelize": "^0.2.14",
    "moleculer-web": "^0.10.7",
    "mysql2": "^3.9.7",
    "sequelize": "^6.37.3"
  },
  "devDependencies": {
    "@types/node": "^20.12.12",
    "ts-node": "^10.9.2",
    "typescript": "^5.4.5"
  }
}
```

## File: public/index.html

- Extension: .html
- Language: html
- Size: 1563 bytes
- Created: 2026-05-04 22:59:53
- Modified: 2026-05-04 22:59:53

### Code

```html
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Microservices Gaming Portal</title>
    <!-- Beer CSS CDN -->
    <link href="https://cdn.jsdelivr.net/npm/beercss@3.7.0/dist/cdn/beer.min.css" rel="stylesheet">
    <script type="module" src="https://cdn.jsdelivr.net/npm/beercss@3.7.0/dist/cdn/beer.min.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/material-dynamic-colors@1.1.0/dist/cdn/material-dynamic-colors.min.js"></script>
</head>
<body class="light">
    <!-- Navbar -->
    <header class="top fixed primary">
        <nav>
            <h5 class="max">Catalog Games</h5>
            <div class="row">
                <i>account_balance_wallet</i>
                <span>Saldo: <b id="user-balance">--</b> €</span>
            </div>
        </nav>
    </header>

    <!-- Main Content -->
    <main class="responsive">
        <div class="space"></div>
        <h4>Lista Giochi Attivi</h4>
        <div class="grid" id="games-container">
            <!-- Node injection: renderizzazione asincrona DOM delle card -->
        </div>
    </main>

    <!-- Dialog Modale (Beer CSS UI) -->
    <dialog id="result-dialog">
        <h5 id="dialog-title">Esito</h5>
        <div id="dialog-message" class="padding-bottom"></div>
        <nav class="right-align">
            <button class="transparent link" data-ui="#result-dialog">Chiudi</button>
        </nav>
    </dialog>

    <script src="/app.js"></script>
</body>
</html>
```

## File: public/app.js

- Extension: .js
- Language: javascript
- Size: 4237 bytes
- Created: 2026-05-04 23:38:01
- Modified: 2026-05-04 23:38:01

### Code

```javascript
const USER_ID = 1;
const DEFAULT_AMOUNT = 10; // Parametro statico hardcodato in assenza di attributo 'price' sul DB
const API_BASE = '/api';

document.addEventListener('DOMContentLoaded', () => {
    updateBalance();
    loadGames();
});

async function loadGames() {
    const container = document.getElementById('games-container');
    try {
        const response = await fetch(`${API_BASE}/games`);
        if (!response.ok) throw new Error(`Gateway Error: ${response.status}`);
        
        const games = await response.json();
        
        if (!games || games.length === 0) {
            container.innerHTML = '<div class="s12">Nessun gioco in stato "attivo" trovato nel database.</div>';
            return;
        }

        // Templating via template literals
        container.innerHTML = games.map(game => `
            <article class="s12 m6 l4 border">
                <div class="row padding">
                    <div class="max">
                        <h5>${game.name}</h5>
                        <p>Categoria: <em>${game.category}</em></p>
                        <p class="small-text">Status: ${game.status}</p>
                    </div>
                </div>
                <nav class="right-align">
                    <button class="fill primary" onclick="playGame(${game.id})">
                        Gioca (${DEFAULT_AMOUNT}€)
                    </button>
                </nav>
            </article>
        `).join('');
    } catch (error) {
        console.error('Fetch error nel microservizio Catalog:', error);
        container.innerHTML = '<div class="error s12">Errore di comunicazione con il servizio catalog.</div>';
    }
}

async function playGame(gameId) {
    try {
        const response = await fetch(`${API_BASE}/play`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Payload richiesto dall'azione accounting.play
            body: JSON.stringify({
                userId: USER_ID,
                gameId: gameId,
                amount: DEFAULT_AMOUNT
            })
        });

        const result = await response.json();

        if (response.ok) {
            showDialog('Successo', `Transazione #${result.id} processata in DB. Status: ${result.status}`);
            updateBalance(); // Aggiornamento UI asincrono del saldo dopo la transazione
        } else {
            showDialog('Errore Logica di Business', result.message || 'Transazione fallita.');
        }
    } catch (error) {
        console.error('Fetch error nel microservizio Accounting:', error);
        showDialog('Errore di Rete', 'Impossibile completare la request verso API Gateway.');
    }
}

async function updateBalance() {
    try {
        /*
         * NOTA ARCHITETTURALE SUL MICROSERVIZIO:
         * La precedente implementazione di `wallet.checkBalance` prevede (userId, amount) 
         * come parametri in input e ritorna un boolean. 
         * Una route GET /api/wallet/:userId mappata su `checkBalance` fallirà se non viene
         * passato un amount. Idealmente, il backend necessita di un'azione dedicata (es. `wallet.get`)
         * per ritornare il record completo in sola lettura.
         * Il blocco try/catch preverrà il blocco del runtime lato client.
         */
        const response = await fetch(`${API_BASE}/wallet/${USER_ID}`);
        if (!response.ok) throw new Error(`Gateway Error: ${response.status}`);
        
        const data = await response.json();
        
        const balanceDisplay = document.getElementById('user-balance');
        // Check della proprietà balance sul payload restituito
        balanceDisplay.textContent = data.balance ? parseFloat(data.balance).toFixed(2) : '0.00';
        
    } catch (error) {
        console.error('Fetch error nel microservizio Wallet:', error);
        document.getElementById('user-balance').textContent = 'Err';
    }
}

function showDialog(title, message) {
    document.getElementById('dialog-title').textContent = title;
    document.getElementById('dialog-message').textContent = message;
    
    // Funzione globale esposta da Beer CSS per l'apertura programmatica dei dialog
    ui('#result-dialog');
}
```

## File: src/gateway.service.ts

- Extension: .ts
- Language: typescript
- Size: 1051 bytes
- Created: 2026-05-05 00:13:43
- Modified: 2026-05-05 00:13:43

### Code

```typescript
import { Service, ServiceBroker } from "moleculer";
import ApiGateway from "moleculer-web";

export default class GatewayService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker);

        this.parseServiceSchema({
            name: "gateway",
            mixins: [ApiGateway],

            settings: {
                port: process.env.PORT || 3000,

                routes: [
                    {
                        path: "/api",
                        aliases: {
                            "GET games": "catalog.listActive",
                            "GET wallet/:userId": "wallet.get",
                            "POST play": "accounting.play"
                        },
                        bodyParsers: {
                            json: true,
                            urlencoded: { extended: true }
                        }
                    }
                ],

                assets: {
                    folder: "public"
                }
            }
        });
    }
}
```

## File: src/accounting.service.ts

- Extension: .ts
- Language: typescript
- Size: 2237 bytes
- Created: 2026-05-05 00:16:55
- Modified: 2026-05-05 00:16:55

### Code

```typescript
import { Service, ServiceBroker, Context, Errors } from "moleculer";
import DbService from "moleculer-db";
import SequelizeAdapter from "moleculer-db-adapter-sequelize";
import Sequelize from "sequelize";

export default class AccountingService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker);
        
        this.parseServiceSchema({
            name: "accounting",
            mixins: [DbService],
            adapter: new SequelizeAdapter(process.env.MYSQL_URI || "mysql://root:password@localhost:3306/moleculer_db", {
                sync: { force: false }
            }),
            model: {
                name: "transactions",
                define: {
                    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
                    user_id: Sequelize.INTEGER,
                    game_id: Sequelize.INTEGER,
                    amount: Sequelize.DECIMAL(10, 2),
                    status: Sequelize.STRING
                }
            },
            actions: {
                play: {
                    params: { userId: "number", gameId: "number", amount: "number" },
                    async handler(ctx: Context<{ userId: number; gameId: number; amount: number }>): Promise<any> {
                        const { userId, gameId, amount } = ctx.params;
                        try {
                            await ctx.call("catalog.checkStatus", { gameId });
                            await ctx.call("wallet.checkBalance", { userId, amount });
                            await ctx.call("wallet.charge", { userId, amount });

                            return await this.adapter.insert({ user_id: userId, game_id: gameId, amount, status: "COMPLETED" });
                        } catch (error: any) {
                            await this.adapter.insert({ user_id: userId, game_id: gameId, amount, status: "FAILED" });
                            if (error instanceof Errors.MoleculerError) throw error;
                            throw new Errors.MoleculerError("Internal error", 500, "INTERNAL_ERROR", { detail: error.message });
                        }
                    }
                }
            }
        });
    }
}
```

## File: src/catalog.service.ts

- Extension: .ts
- Language: typescript
- Size: 2217 bytes
- Created: 2026-05-05 00:16:55
- Modified: 2026-05-05 00:16:55

### Code

```typescript
import { Service, ServiceBroker, Context, Errors } from "moleculer";
import DbService from "moleculer-db";
import SequelizeAdapter from "moleculer-db-adapter-sequelize";
import Sequelize from "sequelize";

export default class CatalogService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker);
        
        this.parseServiceSchema({
            name: "catalog",
            mixins: [DbService],
            adapter: new SequelizeAdapter(process.env.MYSQL_URI || "mysql://root:password@localhost:3306/moleculer_db", {
                sync: { force: false } 
            }),
            model: {
                name: "games",
                define: {
                    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
                    name: Sequelize.STRING,
                    status: Sequelize.STRING,
                    category: Sequelize.STRING
                }
            },
            actions: {
                listActive: {
                    async handler(ctx: Context): Promise<any> {
                        return await this.adapter.find({ query: { status: 'attivo' } });
                    }
                },
                checkStatus: {
                    params: { gameId: "number" },
                    async handler(ctx: Context<{ gameId: number }>): Promise<any> {
                        const game = await this.adapter.findById(ctx.params.gameId);
                        if (!game) throw new Errors.MoleculerError("Game not found", 404, "GAME_NOT_FOUND");
                        if (game.status !== 'attivo') throw new Errors.MoleculerError("Game is not active", 400, "GAME_NOT_ACTIVE");
                        return game;
                    }
                }
            },
            async afterConnected() {
                const count = await this.adapter.count();
                if (count === 0) {
                    await this.adapter.insertMany([
                        { name: "Cyberpunk 2077", status: "attivo", category: "RPG" },
                        { name: "Tetris", status: "attivo", category: "Puzzle" }
                    ]);
                }
            }
        });
    }
}
```

## File: src/wallet.service.ts

- Extension: .ts
- Language: typescript
- Size: 2842 bytes
- Created: 2026-05-05 00:16:55
- Modified: 2026-05-05 00:16:55

### Code

```typescript
import { Service, ServiceBroker, Context, Errors } from "moleculer";
import DbService from "moleculer-db";
import SequelizeAdapter from "moleculer-db-adapter-sequelize";
import Sequelize from "sequelize";

export default class WalletService extends Service {
    public constructor(public broker: ServiceBroker) {
        super(broker);
        
        this.parseServiceSchema({
            name: "wallet",
            mixins: [DbService],
            adapter: new SequelizeAdapter(process.env.MYSQL_URI || "mysql://root:password@localhost:3306/moleculer_db", {
                sync: { force: false }
            }),
            model: {
                name: "wallets",
                define: {
                    user_id: { type: Sequelize.INTEGER, primaryKey: true },
                    balance: { type: Sequelize.DECIMAL(10, 2), defaultValue: 0 }
                }
            },
            actions: {
                get: {
                    params: { userId: { type: "string", convert: true } },
                    async handler(ctx: Context<{ userId: string }>): Promise<any> {
                        const wallet = await this.adapter.findById(ctx.params.userId);
                        if (!wallet) throw new Errors.MoleculerError("Wallet not found", 404, "WALLET_NOT_FOUND");
                        return { balance: wallet.balance };
                    }
                },
                checkBalance: {
                    params: { userId: "number", amount: "number" },
                    async handler(ctx: Context<{ userId: number; amount: number }>): Promise<boolean> {
                        const wallet = await this.adapter.findById(ctx.params.userId);
                        if (!wallet) throw new Errors.MoleculerError("Wallet not found", 404, "WALLET_NOT_FOUND");
                        if (parseFloat(wallet.balance) < ctx.params.amount) throw new Errors.MoleculerError("Insufficient funds", 402, "INSUFFICIENT_FUNDS");
                        return true;
                    }
                },
                charge: {
                    params: { userId: "number", amount: "number" },
                    async handler(ctx: Context<{ userId: number; amount: number }>): Promise<any> {
                        const wallet = await this.adapter.findById(ctx.params.userId);
                        const newBalance = parseFloat(wallet.balance) - ctx.params.amount;
                        return await this.adapter.updateById(ctx.params.userId, { $set: { balance: newBalance } });
                    }
                }
            },
            async afterConnected() {
                const count = await this.adapter.count();
                if (count === 0) {
                    await this.adapter.insert({ user_id: 1, balance: 100.00 });
                }
            }
        });
    }
}
```

