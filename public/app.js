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