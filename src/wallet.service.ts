import { Service, ServiceBroker, Context, Errors } from "moleculer";
import DbService from "moleculer-db";
import SequelizeAdapter from "moleculer-db-adapter-sequelize";
import Sequelize from "sequelize";

export default class WalletService extends Service {
    public constructor( broker: ServiceBroker) {
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
                    balance: { type: Sequelize.DECIMAL(47, 2), defaultValue: 0 }
                },
                options: {
                    timestamps: false // ⬅️ Aggiungi questa riga
                }
            },
            actions: {
                getBalance: {
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