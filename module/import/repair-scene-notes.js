import { getCurrentModule } from '../config.js';

const findWorldJournal = name => game.journal.getName(name);

const canRepairNote = note => !!note.flags[getCurrentModule()] && findWorldJournal(note.flags[getCurrentModule()].journalEntry);

const repairNote = async note => await note.update({ entryId: findWorldJournal(note.flags[getCurrentModule()].journalEntry).id });

const repairScene = async scene => {
    for (let note of scene.notes.filter(note => canRepairNote(note))) {
        await repairNote(note);
    }
};

const repairSceneNotes = async () => {
    for (let scene of game.scenes.values()) {
        await repairScene(scene);
    }
};

export default repairSceneNotes;
