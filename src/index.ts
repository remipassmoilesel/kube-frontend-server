import {TemplateServer} from './templater/TemplateServer';
import {NginxConfigurator} from './nginx/NginxConfigurator';
import {loadConfig} from './config';
import {log} from './utils';

const serverConfig = loadConfig();

log();
log(`Initialized with configuration: ${JSON.stringify(serverConfig, null, 2)}`);
log();

const configureNginx = async () => {

    try {
        const nginxConfigurator = new NginxConfigurator(serverConfig);
        await nginxConfigurator.configureAndReload();

        log('Nginx initialization succeed, starting template server ...');

        const httpServer = new TemplateServer(serverConfig);
        await httpServer.init();
    } catch (e) {
        log('Error while initializing Nginx configuration: ', e);
    }

};

// let time for nginx to set up
setTimeout(configureNginx, serverConfig.nginxConfigurationInterval);
