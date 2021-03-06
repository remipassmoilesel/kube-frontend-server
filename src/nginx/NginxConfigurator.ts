import * as path from 'path';
import * as ejs from 'ejs';
import * as fs from 'fs-extra';
import {spawn} from 'child_process';
import {error, log} from '../misc/utils';
import {IServerConfig, projectRoot} from '../misc/config-types';

const templatePath = path.join(projectRoot, 'templates/nginx.conf.ejs');

export class NginxConfigurator {
    private serverConfig: IServerConfig;

    constructor(serverConfig: IServerConfig) {
        this.serverConfig = serverConfig;
    }

    public async configureAndReload(): Promise<void> {
        await this.templateConfiguration(this.serverConfig.nginxConfigurationPath);
        await this.reloadNginx();
    }

    private templateConfiguration(finalpath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            ejs.renderFile(templatePath, {frontApps: this.serverConfig.frontApplicationsConfig}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.writeFileSync(finalpath, data);
                    log(`Nginx configuration templated with success at location: ${finalpath}`);
                    resolve();
                }
            });
        });

    }

    private reloadNginx(): Promise<void> {
        return new Promise((resolve, reject) => {

            const child = spawn('nginx -s reload', [], {shell: true});
            child.stdout.on('data', (data) => {
                log(` [NGINX] stdout: ${data}`);
            });
            child.stderr.on('data', (data) => {
                error(` [NGINX] stderr: ${data}`);
            });

            child.on('close', (code) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`Error while reloading Nginx configuration: ${code}`));
                }
            });

        });
    }
}
