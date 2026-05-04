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
            adapter: new SequelizeAdapter(process.env.MYSQL_URI || "mysql://root:password@localhost:3306/moleculer_db"),
            model: {
                name: "wallets",
                define: {
                    user_id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true
                    },
                    balance: {
                        type: Sequelize.DECIMAL(10, 2),
                        defaultValue: 0
                    }
                }
            },
            actions: {
                get: {
                    params: {
                        userId: { type: "string", convert: true }
                    },
                    async handler(ctx: Context<{ userId: string }>): Promise<any> {
                        const wallet = await this.adapter.findById(ctx.params.userId);
                        
                        if (!wallet) {
                            throw new Errors.MoleculerError("Wallet not found", 404, "WALLET_NOT_FOUND");
                        }
                        
                        return { balance: wallet.balance };
                    }
                },
                checkBalance: {
                    params: {
                        userId: "number",
                        amount: "number"
                    },
                    async handler(ctx: Context<{ userId: number; amount: number }>): Promise<boolean> {
                        const wallet = await this.adapter.findById(ctx.params.userId);
                        
                        if (!wallet) {
                            throw new Errors.MoleculerError("Wallet not found", 404, "WALLET_NOT_FOUND");
                        }
                        
                        if (parseFloat(wallet.balance) < ctx.params.amount) {
                            throw new Errors.MoleculerError("Insufficient funds", 402, "INSUFFICIENT_FUNDS");
                        }
                        
                        return true;
                    }
                },
                charge: {
                    params: {
                        userId: "number",
                        amount: "number"
                    },
                    async handler(ctx: Context<{ userId: number; amount: number }>): Promise<any> {
                        const wallet = await this.adapter.findById(ctx.params.userId);
                        
                        if (!wallet) {
                            throw new Errors.MoleculerError("Wallet not found", 404, "WALLET_NOT_FOUND");
                        }
                        
                        const currentBalance = parseFloat(wallet.balance);
                        if (currentBalance < ctx.params.amount) {
                            throw new Errors.MoleculerError("Insufficient funds", 402, "INSUFFICIENT_FUNDS");
                        }
                        
                        const newBalance = currentBalance - ctx.params.amount;
                        return await this.adapter.updateById(ctx.params.userId, {
                            $set: { balance: newBalance }
                        });
                    }
                }
            }
        });
    }
}