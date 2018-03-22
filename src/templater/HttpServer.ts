import * as express from 'express';
import {Express} from 'express';
import * as ejs from 'ejs';
import {frontApplicationsRoot, IServerConfig} from '../misc/config-types';
import {log} from '../misc/utils';
import {HttpHandlers} from './HttpHandlers';

export class HttpServer {
    private serverConfig: IServerConfig;
    private app: Express;
    private handlers: HttpHandlers;

    constructor(serverConfig: IServerConfig) {
        this.serverConfig = serverConfig;
        this.app = express();
        this.handlers = new HttpHandlers(serverConfig);

        this.configureTemplateEngine();
        this.configureTemplateRoutes();
    }

    public start(): Promise<void> {
        return this.startServer();
    }

    private configureTemplateEngine() {
        this.app.set('views', frontApplicationsRoot);
        this.app.engine('html', ejs.renderFile);
        this.app.set('view engine', 'html');
    }


    private configureTemplateRoutes() {
        // Template index with configuration for each non static request
        this.app.use(/^(?!\/static).*/, this.handlers.template.bind(this));
    }

    private startServer(): Promise<void> {

        const port = this.serverConfig.templateServerPort;

        return new Promise((resolve, reject) => {
            this.app.listen(port, (error: Error) => {
                if (error) {
                    reject(error);
                    return;
                }

                log();
                log(`Listening on http://0.0.0.0:${port}`);
                log();
                resolve();
            });
        });

    }
}
