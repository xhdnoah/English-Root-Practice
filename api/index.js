const db = require('db')

module.exports = {
  query(root, onFinish) {
    return new Promise((resolve, reject) => {
      db.query(root, (res) => {
        onFinish && onFinish()
        if (!res) {
          resolve({
            root,
            status: false,
            message: '词根 404',
          })
        } else {
          resolve({
            root,
            status: true,
            definition: res.definition,
          })
        }
      })
    })
  },
  end() {
    db.close()
  },
  one(root) {
    return this.query(root, this.end)
  },
  random() {
    return
  },
  all(roots) {
    return new Promise((res, rej) => {
      Promise.all(roots.map((root) => this.query(root))).then((val) => {
        this.end()
        res(val)
      })
    })
  },
}
