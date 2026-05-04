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