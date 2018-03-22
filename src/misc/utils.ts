import {IServerConfig} from './config-types';
import {devConfig, mainConfig} from '../config';

const chalk = require('chalk');

export function title(message: string, color = 'cyan') {
    const line = Array(message.length + 1).join('=');
    printColor(color, line);
    printColor(color, message);
    printColor(color, line);
}

export function success(message?: string, data?: any) {
    printColor('green', message, data);
}

export function log(message?: string, data?: any) {
    printColor('cyan', message, data);
}

export function warning(message?: string, data?: any) {
    printColor('yellow', message, data);
}

export function error(message?: string, data?: any) {
    printColor('red', message, data);
}

export function printColor(color: string, message?: string, data?: any) {
    const colorFunc = chalk[color];
    console.log(colorFunc(`[${new Date().toISOString()}] ${message || ''}`));
    if (data) {
        console.log(data);
    }
}

export function loadConfig(): IServerConfig {
    if (process.env.NODE_ENV !== 'production'){
        return devConfig;
    }
    return mainConfig;
}

