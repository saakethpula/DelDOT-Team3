"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
function parseCorsOrigins() {
    const configuredOrigins = process.env.CORS_ORIGINS?.split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
    return configuredOrigins?.length
        ? configuredOrigins
        : [
            'https://deldot-dmv-ccm-tool.firebaseapp.com',
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:5173',
        ];
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || undefined;
    app.enableCors({
        origin: parseCorsOrigins(),
        credentials: true,
    });
    await app.listen(port, host);
}
void bootstrap();
//# sourceMappingURL=main.js.map