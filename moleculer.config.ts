import type { BrokerOptions } from "moleculer";

const brokerConfig: BrokerOptions = {
    // Spazio dei nomi per isolare il progetto
    namespace: "gaming-portal",
    
    // Nome del nodo univoco
    nodeID: "node-" + process.pid,
    
    // Configurazione dei log
    logger: "Console",
    logLevel: "info",
    
    // Come comunicano i servizi (TCP è ottimo per lo sviluppo locale)
    transporter: "TCP",
    
    // Strategia di serializzazione dei dati
    serializer: "JSON",
    
    // Gestione degli errori interna
    faultTolerance: {
        enabled: true,
        retries: 3
    }
};

// Esportazione compatibile con CommonJS e la modalità Type Stripping di Node.js 25
module.exports = brokerConfig;