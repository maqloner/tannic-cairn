import { getCompendiumConfiguration, getModuleName } from '../config.js';
import configurePermissions from './configure-permissions.js';
import repairSceneNotes from './repair-scene-notes.js';
import repairSceneTokens from './repair-scene-tokens.js';

const findFolder = async document => game.folders.find(folder => folder.data.type === document.documentName && folder.name === document.compendium.title);

const createFolder = async document => (await Folder.create({ name: document.compendium.title, type: document.documentName }));

const findOrCreateFolder = async document => (await findFolder(document) || await createFolder(document));

const documentExist = document =>
    !!game.collections
        .get(document.documentName)
        .getName(document.name);

const importFromCompendium = async document =>
    await game.collections
        .get(document.documentName)
        .importFromCompendium(document.compendium, document.id, { folder: (await findOrCreateFolder(document)).id });

const importDocuments = async compendium => {
    for (let document of (await compendium.getDocuments()).filter(document => !documentExist(document))) {
        await importFromCompendium(document);
    }
}

const importCompendium = async compendiums => {
    for (let compendium of compendiums) {
        await importDocuments(game.packs.get(compendium));
    }
}

const importCompendiums = async () => {
    await importCompendium(getCompendiumConfiguration());
    await repairSceneTokens();
    await repairSceneNotes();
    await configurePermissions();

    ui.notifications.info(`${getModuleName()} imported`);
};

export default importCompendiums;