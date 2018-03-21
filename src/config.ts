import * as path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';

export const projectRoot = path.resolve(__dirname, '..');
assert.ok(fs.existsSync(projectRoot), 'Project root is invalid');

export const frontApplicationsRoot = path.resolve(projectRoot, 'front-applications');
assert.ok(fs.existsSync(frontApplicationsRoot), 'Frontend applications root is invalid');

export const mainConfig: IServerConfig = {
    templateServerPort: 3080,
    nginxConfigurationPath: '/etc/nginx/conf.d/default.conf',
    nginxReloadInterval: 1000,
    nginxConfigurationInterval: 1000,
    frontApplicationsConfig: [
        {
            id: 'domain1',
            hostname: 'domain1.com',
            baseDirectory: 'app1',
            templatedConfiguration: {
                apiUrl: 'http://backend.domain1.com',
                parameter1: 'value1',
            },
        },
        {
            id: 'domain2',
            hostname: 'domain2.com',
            baseDirectory: 'app2',
            templatedConfiguration: {
                apiUrl: 'http://backend.domain2.com',
                parameter1: 'value2',
            },
        },
    ],
};


export interface IServerConfig {
    templateServerPort: number;
    nginxConfigurationPath: string;
    nginxConfigurationInterval: number;
    nginxReloadInterval: number;
    frontApplicationsConfig: IFrontApplicationConfig[];
}

export interface IFrontApplicationConfig {
    id: string;
    hostname: string;
    baseDirectory: string;
    templatedConfiguration: any;
}

export function loadConfig(): IServerConfig {
    return mainConfig;
}

