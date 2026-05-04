import { Service, ServiceBroker } from "moleculer";
import ApiGateway from "moleculer-web";

export default class GatewayService extends Service {
    public constructor(broker: ServiceBroker) {
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
                            "GET wallet/:userId": "wallet.getBalance",
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