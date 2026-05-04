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

                // Configurazione delle rotte API
                routes: [
                    {
                        path: "/api",
                        aliases: {
                            "GET games": "catalog.listActive",
                            "GET wallet/:userId": "wallet.checkBalance",
                            "POST play": "accounting.play"
                        },
                        // Permette di leggere il body della richiesta (JSON)
                        bodyParsers: {
                            json: true,
                            urlencoded: { extended: true }
                        }
                    }
                ],

                // Serve i file statici dalla cartella 'public' (index.html, app.js)
                assets: {
                    folder: "public"
                }
            }
        });
    }
}