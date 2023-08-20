const db = require("./db.js");

function addUserById(id, perms, callback) {
    db.run(`INSERT INTO users (id, perms) VALUES (?, ?)`, [id, perms], (err) => {
        if (err) {
            console.error("Error adding user: ", err.message);
            callback(err.message, null);
        } else {
            console.log(`Added user ${id}, with perms ${perms}`);
            callback(null, true);
        }
    });
}

function removeUserById(id, callback) {
    db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
        if (err) {
            console.error("Error removing user: ", err.message);
            callback(err.message, null);
        } else {
            console.log(`Removed user ${id}`);
            callback(null, true);
        }
    });
}

function getUserPerms(id, callback) {
    db.get(`SELECT perms FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error('Error getting user permissions:', err.message);
            callback(err.message, null);
        } else {
            callback(null, row ? row.perms : null);
        }
    });
}

function changeUserPerms(id, newPerms, callback) {
    db.run(`UPDATE users SET perms = ? WHERE id = ?`, [newPerms, id], (err) => {
        if (err) {
            console.error('Error changing user permissions:', err.message);
            callback(err.message, null);
        } else {
            console.log('User permissions changed successfully!');
            callback(null, true);
        }
    });
}

function isTableEmpty(callback) {
    db.get(`SELECT COUNT(*) as count FROM users`, (err, row) => {
        if (err) {
            console.error('Error checking if table is empty:', err.message);
            callback(err, null);
        } else {
            const rowCount = row ? row.count : 0;
            callback(null, rowCount === 0);
        }
    });
}

function closeDatabase() {
    db.close();
}

module.exports = {
    addUserById,
    removeUserById,
    getUserPerms,
    isTableEmpty,
    changeUserPerms,
    closeDatabase
};
