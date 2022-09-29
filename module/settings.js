import { getCurrentModule } from './config.js';
import { toggleHexcrawlDashboard } from './hexcrawl-dashboard.js';

export const registerSetting = () => {
    game.settings.register(getCurrentModule(), 'enable-dashboard', {
        name: 'Enabled the dashboard',
        scope: 'world',
        config: true,
        restricted: true,
        type: Boolean,
        default: true,
        onChange: value => toggleHexcrawlDashboard(value)
    });

    game.settings.register(getCurrentModule(), 'is-first-time-install', {
        name: 'Run on first time install',
        scope: 'world',
        config: false,
        restricted: true,
        type: Boolean,
        default: true
    });
}

export const isDashboardEnabled = () => game.settings.get(getCurrentModule(), 'enable-dashboard');
export const isFirstTimeInstall = () => game.settings.get(getCurrentModule(), 'is-first-time-install');
export const setFirstTimeInstall = (value) => game.settings.set(getCurrentModule(), 'is-first-time-install', value);
