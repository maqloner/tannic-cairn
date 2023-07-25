const findWorldActor = name => game.actors.getName(name);

const canRepairToken = token => !!!token.actor && !!game.actors.getName(token.name);

const repairToken = async token => await token.update({ actorId: findWorldActor(token.name).id });

const repairScene = async scene => {
    for (let token of scene.tokens.filter(token => canRepairToken(token))) {
        await repairToken(token);
    }
};

const repairSceneTokens = async () => {
    for (let scene of game.scenes.values()) {
        await repairScene(scene);
    }
};

export default repairSceneTokens;
