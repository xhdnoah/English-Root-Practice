const path = require('path')
const sqlite = require('sqlite3').verbose()
const csv = require('csv-parser')
const fs = require('fs')

const dbPath = path.join(__dirname, 'englishRoot.db')

module.exports = {
  open() {
    const db = (this.db = new sqlite.Database(dbPath))
    db.exec(`CREATE TABLE IF NOT EXISTS
      rootItems ( root TEXT, definition TEXT, example TEXT);`)

    const insertRow = db.prepare('INSERT INTO rootItems (root, definition, example) VALUES (?, ?, ?)')

    fs.createReadStream('./english-root.csv')
      .pipe(csv())
      .on('data', (root) => {
        insertRow.run(root.root, root.definition, root.example)
      })
      .on('end', () => {
        console.log('CSV file successfully processed')
        insertRow.finalize()
        db.close()
      })
  },
  close() {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  },
  random() {
    const sql = `select * from rootDict order by random() limit 1`
    this.db.all(sql)
  },
  query(root, cb) {
    if (!this.db) {
      this.open()
    }
    const sql = `select * from rootDict where root="${root}"`
    this.db.all(sql, (err, rows) => {
      if (err) {
        cb(null)
      } else {
        if (rows.length > 0) {
          cb(rows[0])
        } else {
          cb(null)
        }
      }
    })
  },
}
