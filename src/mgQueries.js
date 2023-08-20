const driver = require('./db')
const neo4j = require('neo4j-driver')

async function getMgInfo(session) {

    try {
        const result = await session.run(
            'SHOW STORAGE INFO;'
        );

        let res = {};

        result.records.forEach(record => {
            let key = record.get("storage info");
            let val = "";

            const value = record.get("value");
            if (value instanceof neo4j.types.Integer) {
                val = (value.high * Math.pow(2,32) + value.low);
            } else {
                val = value;
            }

            res[key] = val;
        });

        return res;
    } catch (err) {
        console.log(err);
        return {};
    }
}

module.exports = {getMgInfo}