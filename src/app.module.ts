import { Module } from "@nestjs/common";
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";
import { TaskModule } from "./modules/task/task.module";
import { ConfigModule } from "@nestjs/config";
import databaseConfig from "./config/database.config";
import jwtConfig from "./config/jwt.config";
import redisConfig from "./config/redis.config";

@Module({
    imports: [
        UserModule, 
        AuthModule, 
        TaskModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
            load: [databaseConfig, jwtConfig, redisConfig]
        })
    ],
    providers: [],

})
export class AppModule {}