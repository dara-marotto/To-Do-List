import { CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-yet";

@Module({
    imports: [
        CacheModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                store: redisStore,
                host: config.get('redis.host'),
                port: config.get('redis.port'),
                ttl: config.get('redis.ttl'),

            })
        })
    ]
})
export class RedisCacheModule {}
