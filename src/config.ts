import * as path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';

export const projectRoot = path.resolve(__dirname, '..');
assert.ok(fs.existsSync(projectRoot), 'Project root is invalid');

export const frontApplicationsRoot = path.resolve(projectRoot, 'front-applications');
assert.ok(fs.existsSync(frontApplicationsRoot), 'Frontend applications root is invalid');

export const templateServerPort = 3080;

export interface IServerConfig {
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
    return require(path.resolve(projectRoot, 'config'));
}
