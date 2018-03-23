import * as path from 'path';
import * as fs from 'fs';
import * as assert from 'assert';

export const projectRoot = path.resolve(__dirname, '..', '..');
assert.ok(fs.existsSync(path.resolve(projectRoot, 'package.json')), 'Project root is invalid');

export const frontApplicationsRoot = path.resolve(projectRoot, 'applications');
assert.ok(fs.existsSync(frontApplicationsRoot), 'Frontend applications root is invalid');

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
