import { SequelizeModule } from "@nestjs/sequelize";

export const MariaDbModule = SequelizeModule.forRoot({
    dialect: 'mariadb',
    host: 'localhost',
    port: 3307,
    username: 'app_user',
    password: '368271',
    database: 'app_db',
    autoLoadModels: true,
    synchronize: true, 
    logging: false
})