const neo4j = require('neo4j-driver')
require('dotenv').config()

const driver = neo4j.driver(
    `bolt://${process.env.MEMGRAPH_HOST}:${process.env.MEMGRAPH_PORT}`,
    neo4j.auth.basic(
        process.env.MEMGRAPH_USER,
        process.env.MEMGRAPH_PASS)
)

const session = driver.session()

module.exports = session


