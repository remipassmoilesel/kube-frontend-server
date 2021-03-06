
import {IServerConfig} from './misc/config-types';

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

export const devConfig: IServerConfig = {
    templateServerPort: 3080,
    nginxConfigurationPath: './default.conf',
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
