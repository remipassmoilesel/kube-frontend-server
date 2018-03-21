import * as path from 'path';
import * as ejs from 'ejs';
import * as fs from 'fs-extra';
import { spawn } from 'child_process';
import { log } from '../utils';
import {IServerConfig, projectRoot} from '../config';

const templatePath = path.join(projectRoot, 'templates/nginx.conf.ejs');

export class NginxConfigurator {
    private serverConfig: IServerConfig;

    constructor(serverConfig: IServerConfig){
        this.serverConfig = serverConfig;
    }

    public async configureAndReload(): Promise<void> {
        await this.templateConfiguration(this.serverConfig.nginxConfigurationPath);

        setTimeout(async () => {
            await this.reloadNginx();
        }, this.serverConfig.nginxReloadInterval);
    }

    private templateConfiguration(finalpath: string): Promise<void> {
        return new Promise((resolve, reject) => {
            ejs.renderFile(templatePath, { frontApps: this.serverConfig.frontApplicationsConfig }, (err, data) => {
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
            log('Reloading nginx');

            const child = spawn('nginx -s reload', [], { shell: true });
            child.stdout.on('data', (data) => {
                log(` [NGINX] stdout: ${data}`);
            });
            child.stderr.on('data', (data) => {
                log(` [NGINX] stderr: ${data}`);
            });

            child.on('close', (code) => {
                if (code === 0) {
                    log('Nginx configuration reloaded');
                    resolve();
                } else {
                    log(`Error while reloading nginx configuration: ${code}`);
                    reject(new Error('Nginx exit code: ' + code));
                }
            });

        });
    }
}
