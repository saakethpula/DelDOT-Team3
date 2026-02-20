"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    const host = process.env.HOST || undefined;
    app.enableCors({
        origin: ['https://deldot-dmv-ccm-tool.firebaseapp.com', 'https://deldot-team3.onrender.com', 'http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
        credentials: true,
    });
    await app.listen(port, host);
}
void bootstrap();
//# sourceMappingURL=main.js.map