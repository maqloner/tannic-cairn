const configuration = {
    name: 'Tannic by Amanda P. for Cairn',
    module: 'tannic-cairn',
    compendiums: [
        'tannic-cairn.tables-tannic-cairn',
        'tannic-cairn.scenes-tannic-cairn',
        'tannic-cairn.journal-tannic-cairn',
        'tannic-cairn.actors-tannic-cairn',
        'tannic-cairn.items-tannic-cairn',
        'tannic-cairn.macros-tannic-cairn'
    ],
    permissions: [{
        type: 'Actor',
        name: 'Adventurers',
        permission: CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER
    }, {
        type: 'Scene',
        name: 'The Village of Tannic',
        permission: CONST.DOCUMENT_PERMISSION_LEVELS.OBSERVER
    }],
    defaultScene: 'The Village of Tannic',
    dashboard: {
        actions: [{
            type: 'journal',
            icon: '/icons/svg/book.svg',
            data: 'Tannic - Help'
        }, {
            type: 'macro',
            label: 'd8 Rumors',
            icon: '/icons/svg/d20.svg',
            data: 'Tannic - d8 Rumors'
        }, {
            type: 'macro',
            label: 'd10 Festival Encounters',
            icon: '/icons/svg/d20.svg',
            data: 'Tannic - d10 Festival Encounters'
        }, {
            type: 'macro',
            label: 'd8 Forest Encounters',
            icon: '/icons/svg/d20.svg',
            data: 'Tannic - d8 Forest Encounters'
        }, {
          type: 'macro',
          label: 'd6 Undead Complaints',
          icon: '/icons/svg/d20.svg',
          data: 'Tannic - d6 Undead Complaints'
        }, {
            type: 'macro',
            label: 'Reaction',
            icon: '/icons/svg/d20.svg',
            data: 'Reaction'
        }]
    }
};

export const getModuleName = () => configuration.name;
export const getDefaultScene = () => configuration.defaultScene;
export const getCurrentModule = () => configuration.module;
export const getCompendiumConfiguration = () => configuration.compendiums;
export const getPermissionConfiguration = () => configuration.permissions;
export const getDashboardConfiguration = () => configuration.dashboard;
