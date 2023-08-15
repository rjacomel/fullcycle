const express = require('express')
const { queryPromise } = require('./queryPromise')

async function createApp() {
  const app = express()
  const sqlTable = `CREATE TABLE IF NOT EXISTS people(id int NOT NULL AUTO_INCREMENT, name varchar(255) NOT NULL, PRIMARY KEY(id))`;

  await queryPromise.query(sqlTable)

  const names = [['Ricardo'], ['Vitor'], ['Maria']]
  const sqlInsert = `INSERT INTO people(name) VALUES ?`;

  await queryPromise.queryMultiple(sqlInsert, names)

  app.get('/', async (req, res) => {
    const selectNames = `SELECT * FROM people`
    const allNames = await queryPromise.query(selectNames)

    const html = `<h1>Lista de nomes cadastrados no banco de dados</h1>\n
  <ul>
    ${allNames.map(name => `<li>${name.name}</li>`).join('')}
  </ul>`

    res.send(html)
  })
  return app
}

module.exports = createApp