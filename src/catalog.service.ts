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