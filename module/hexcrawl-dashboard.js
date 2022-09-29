import { getDashboardConfiguration, getCurrentModule } from './config.js';

class HexcrawlDashboard extends Application {

    actions = [];

    constructor({ actions }) {
        super();
        this.actions = actions.map(action => ({ ...action, id: foundry.utils.randomID() }));
    }

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: `/modules/${getCurrentModule()}/templates/hexcrawl-dashboard.hbs`,
            id: `${getCurrentModule()}-hexcrawl-dashboard`,
            class: 'hexcrawl-dashboard',
            popOut: false,
            minimizable: false,
            resizable: false
        });
    }

    /** @override */
    getData(options = {}) {
        const scene = game.scenes.find(scene => scene.isView);
        const actions = scene ? this.findSceneActions(scene) : this.actions;
        const data = super.getData();
        data.actions = actions;
        data.id = `${getCurrentModule()}-hexcrawl-dashboard`;
        data.class = 'hexcrawl-dashboard';
        return data;
    }

    findSceneActions(scene) {
        return this.actions.filter(action => (!action.scenes || action.scenes.includes(scene.name)));
    }

    update() {
        this.render(true);
    }


    activateListeners(html) {
        this.actions.forEach(action => html.find(`#${action.id}`).on('click', (e) => this.handleAction(action)));
    }

    handleAction(action) {
        switch (action.type) {
            case 'macro':
                this.invokeMacro(action.data);
                break;
            case 'journal':
                this.openJournal(action.data);
                break;
        }
    }

    invokeMacro(macro) {
        game.macros.getName(macro).execute();
    }

    openJournal(journal) {
        game.journal.getName(journal).sheet.render(true);
    }
};

let hexcrawlDashboard = null;
export const createHexcrawlDashboard = () => {
    if (!hexcrawlDashboard) {
        hexcrawlDashboard = new HexcrawlDashboard(getDashboardConfiguration());
        hexcrawlDashboard.update();
    }
};

export const closeHexcrawlDashboard = () => {
    if (hexcrawlDashboard) {
        hexcrawlDashboard.close();
        hexcrawlDashboard = null;
    }
};

export const toggleHexcrawlDashboard = (toggle) => {
    if (toggle) {
        updateHexcrawlDashboard();
    } else {
        closeHexcrawlDashboard();
    }
};

export const updateHexcrawlDashboard = () => {
    if (!hexcrawlDashboard) {
        hexcrawlDashboard = new HexcrawlDashboard(getDashboardConfiguration());
    }
    hexcrawlDashboard.update();
};