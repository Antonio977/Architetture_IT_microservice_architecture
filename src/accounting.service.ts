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
            adapter: new SequelizeAdapter(process.env.MYSQL_URI || "mysql://root:password@localhost:3306/moleculer_db"),
            model: {
                name: "transactions",
                define: {
                    id: {
                        type: Sequelize.INTEGER,
                        primaryKey: true,
                        autoIncrement: true
                    },
                    user_id: Sequelize.INTEGER,
                    game_id: Sequelize.INTEGER,
                    amount: Sequelize.DECIMAL(10, 2),
                    status: Sequelize.STRING
                }
            },
            actions: {
                play: {
                    params: {
                        userId: "number",
                        gameId: "number",
                        amount: "number"
                    },
                    async handler(ctx: Context<{ userId: number; gameId: number; amount: number }>): Promise<any> {
                        const { userId, gameId, amount } = ctx.params;

                        try {
                            await ctx.call("catalog.checkStatus", { gameId });
                            
                            await ctx.call("wallet.checkBalance", { userId, amount });
                            
                            await ctx.call("wallet.charge", { userId, amount });

                            const transaction = await this.adapter.insert({
                                user_id: userId,
                                game_id: gameId,
                                amount: amount,
                                status: "COMPLETED"
                            });

                            return transaction;

                        } catch (error: any) {
                            await this.adapter.insert({
                                user_id: userId,
                                game_id: gameId,
                                amount: amount,
                                status: "FAILED"
                            });

                            if (error instanceof Errors.MoleculerError) {
                                throw error;
                            }
                            
                            throw new Errors.MoleculerError(
                                "Transaction failed due to an internal error",
                                500,
                                "INTERNAL_SERVER_ERROR",
                                { detail: error.message }
                            );
                        }
                    }
                }
            }
        });
    }
}