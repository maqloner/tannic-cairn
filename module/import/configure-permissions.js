import { getPermissionConfiguration } from '../config.js';

const configurePermissions = async () => {
    for (let { type, name, permission } of getPermissionConfiguration()) {
        await game.collections.get(type).getName(name).update({ permission: { default: permission } });
    }
};

export default configurePermissions;
