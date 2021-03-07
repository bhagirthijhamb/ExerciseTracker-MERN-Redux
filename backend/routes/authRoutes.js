module.exports = (app) => {
  app.get('/', function(req, res, next) {
    res.send([ 'water', 'fire', 'air' ])
  })

  app.post('/signup', (req, res, next) => {
    res.send({ success: true })
  })
}