import { ThrottlerModule } from "@nestjs/throttler";



export const RatelimitModule = ThrottlerModule.forRoot({
    throttlers: [
        {
            ttl: 60000,
            limit: 10,
        }
    ]
    
})