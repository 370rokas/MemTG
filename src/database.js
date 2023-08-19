const db = require("db")

function addUserById(id, perms) {
    db.run(`INSERT INTO users (id, perms) VALUES (?, ?)`, [id, perms], (err) => {
        if (err) {
            console.error("Error adding user: ", err.message);
            return err.message;
        } else {
            console.log(`Added user ${id}, with perms ${perms}`);
            return true;
        }
    });
}

function removeUserBydId(id) {
    db.run(`DELETE FROM users WHERE id = ?`, [id], (err) => {
        if (err) {
            console.error("Error removing user: ", err.message);
            return err.message;
        } else {
            console.log(`Removed user ${id}`);
            return true;
        }
    });
}

function getUserPerms(id, callback) {
    db.get(`SELECT perms FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error('Error getting user permissions:', err.message);
            callback(null);
        } else {
            callback(row ? row.perms : null);
        }
    });
}

function changeUserPerms(id, newPerms) {
    db.run(`UPDATE users SET perms = ? WHERE id = ?`, [newPerms, id], (err) => {
        if (err) {
            console.error('Error changing user permissions:', err.message);
            return err.message;
        } else {
            console.log('User permissions changed successfully!');
            return true;
        }
    });
}

function getUserPerms(id, callback) {
    db.get(`SELECT perms FROM users WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error('Error getting user permissions:', err.message);
            callback(null);
        } else {
            callback(row ? row.perms : null);
        }
    });
}

db.close();