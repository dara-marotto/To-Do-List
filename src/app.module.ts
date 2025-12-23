
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TaskModule } from "./modules/task/task.module";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import redisConfig from "./config/redis.config";
import { Module } from "@nestjs/common";
import { TypeOrmConfigModule } from "./database/typeorm.module";

@Module({
    imports: [
        UserModule, 
        AuthModule, 
        TaskModule,
        TypeOrmConfigModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [databaseConfig, jwtConfig, redisConfig]
        })
    ],
    providers: [],

})
export class AppModule {}