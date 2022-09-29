import importCompendiums from './import/import-compendiums.js';
import { getCurrentModule, getModuleName, getDefaultScene } from './config.js';
import { registerSetting, isDashboardEnabled, isFirstTimeInstall, setFirstTimeInstall } from './settings.js';
import { updateHexcrawlDashboard } from './hexcrawl-dashboard.js';

const hasActiveScene = () => !!game.scenes.find(scene => scene.active);

const handleActivateDefaultScene = () => {
    if (!hasActiveScene()) {
        game.scenes.getName(getDefaultScene()).activate();
    }
};

const handleFirstTimeInstall = async () => {
    if (isFirstTimeInstall()) {
        setFirstTimeInstall(false);
        await importCompendiums();
    }
};

const handleDashboardUpdate = () => {
    if (isDashboardEnabled()) {
        updateHexcrawlDashboard();
    }
};

const createCompendiumImportButton = (html) => {
    html
        .find(".directory-header")
        .prepend(`<div class="action-buttons flexrow"><button id="btn-dashboard"><i class="fas fa-book"> </i> Import ${getModuleName()}</div>`)
        .promise()
        .done(() => {
            $('#btn-dashboard').on('click', async e => await importCompendiums());
        });
};

const init = async () => registerSetting();

const ready = async () => {
    if (game.user.isGM) {
        await handleFirstTimeInstall();
        handleDashboardUpdate()
    };

    handleActivateDefaultScene();
};

const canvasReady = async () => {
    if (!game.user.isGM) return;

    handleDashboardUpdate();
};

const renderCompendiumDirectory = async (app, html, data) => {
    if (!game.user.isGM) return;

    createCompendiumImportButton(html);
};


// While the module is active, this will track of the compendium journal name drop into a scene, which is lost when importing a scene
const onCreateOrUpdateNote = note => note.setFlag(getCurrentModule(), 'journalEntry', note.entry.name);

Hooks.on('init', init);
Hooks.on('ready', ready);
Hooks.on('canvasReady', canvasReady);
Hooks.on('renderCompendiumDirectory', renderCompendiumDirectory);
Hooks.on('createNote', onCreateOrUpdateNote);
Hooks.on('updateNote', onCreateOrUpdateNote);