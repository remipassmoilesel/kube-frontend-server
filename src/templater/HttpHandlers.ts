import * as express from 'express';
import {log} from '../utils';
import {IFrontApplicationConfig, IServerConfig} from '../config';
import _ = require('lodash');

// TODO: setup several caches for configuration search
export class HttpHandlers {

    private serverConfig: IServerConfig;

    constructor(serverConfig: IServerConfig){
        this.serverConfig = serverConfig;
    }

    public template(req: express.Request, res: express.Response) {

        if (!req.headers.host){
            log(`Warning, no hostname found in request: ${req.originalUrl}`);
            return;
        }

        const hostname = req.headers.host.split(':')[0];
        log(`Receiving request from: ${hostname}`);

        res.render(
            this.getIndexForHostname(hostname),
            {
                appConfig: JSON.stringify(this.getConfigForHostname(hostname).templatedConfiguration),
            },
        );
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

}
