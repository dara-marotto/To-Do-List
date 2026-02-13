
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TaskModule } from "./modules/task/task.module";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import { Module } from "@nestjs/common";
import { TypeOrmConfigModule } from "./database/typeorm.module";
import { CacheModule } from "@nestjs/cache-manager";
import * as redisStore from "cache-manager-redis-store"

@Module({
    imports: [
        UserModule, 
        AuthModule, 
        TaskModule,
        TypeOrmConfigModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [databaseConfig, jwtConfig]
        }),
        CacheModule.register({
            isGlobal: true,
            store: redisStore,
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            ttl: 60,
        })
    ],
    providers: [],

})
export class AppModule {}