import * as express from 'express';
import {Express} from 'express';
import * as ejs from 'ejs';
import * as _ from 'lodash';
import * as path from 'path';
import {frontApplicationsRoot, IFrontApplicationConfig, IServerConfig} from '../config';
import {log} from '../utils';

// TODO: setup several caches for configuration search
export class TemplateServer {
    private serverConfig: IServerConfig;
    private app: Express;

    constructor(serverConfig: IServerConfig) {
        this.serverConfig = serverConfig;
    }

    public init(): Promise<void> {
        this.app = express();

        this.configureTemplateEngine();
        this.configureStaticServices();
        this.configureTemplateRoutes();
        return this.startServer();
    }

    private configureTemplateEngine() {
        this.app.set('views', frontApplicationsRoot);
        this.app.engine('html', ejs.renderFile);
        this.app.set('view engine', 'html');
    }

    /**
     * Although we can serve static files with express, we prefer
     * use Nginx instead
     *
     */
    private configureStaticServices() {
        _.forEach(this.serverConfig.frontApplicationsConfig, (config: IFrontApplicationConfig) => {
            const route = this.getStaticRouteForConfig(config);
            log(`Serve static files for ${config.hostname} on route ${route}`);
            this.app.use(route, express.static(path.join(frontApplicationsRoot, 'static')));
        });
    }

    private configureTemplateRoutes() {

        // Template index with configuration for each non static request
        this.app.use(/^(?!\/static).*/, (req, res) => {

            const hostname = req.headers.host.split(':')[0];
            log(`Receiving request from: ${hostname}`);

            res.render(
                this.getIndexForHostname(hostname),
                {
                    appConfig: JSON.stringify(this.getConfigForHostname(hostname).templatedConfiguration),
                },
            );

        });

        // Serve static files
        this.app.use(/^\/static[^_].*/, (req, res) => {

            const hostname = req.headers.host.split(':')[0];
            log(`Receiving static request from: ${hostname}`);

            const originalReq = req.originalUrl.substr('/static'.length);
            const staticPath = this.getStaticPathForHostname(hostname) + originalReq;

            log(`Redirected to: ${staticPath}`);

            res.redirect(staticPath);

        });
    }

    private getIndexForHostname(hostname: string): string {
        return this.getConfigForHostname(hostname).baseDirectory + '/index';
    }

    private getConfigForHostname(hostname: string): IFrontApplicationConfig {

        const configs = _.filter(this.serverConfig.frontApplicationsConfig, (config: IFrontApplicationConfig) => {
            return config.hostname.trim() === hostname.trim();
        });

        if (configs.length !== 1) {
            throw new Error(`Invalid configuration number found, it should be unique.`
                + ` Hostname=${hostname} Number=${configs.length}`);
        }

        return configs[0];
    }

    private getStaticPathForHostname(hostname: any) {
        return this.getStaticRouteForConfig(this.getConfigForHostname(hostname));
    }

    private getStaticRouteForConfig(config: IFrontApplicationConfig): string {
        return `/static_${config.id}`;
    }

    private startServer(): Promise<void> {

        const port = this.serverConfig.templateServerPort;

        return new Promise((resolve, reject) => {
            this.app.listen(port, (error) => {
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
