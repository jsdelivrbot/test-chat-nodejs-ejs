class Message {

  static create (content, callback) {

    // Récupération du client mongodb
    let mongoClient = require('mongodb').MongoClient
    // Paramètres de connexion
    let url = 'mongodb://localhost:27017/test'

    // Connexion au serveur avec la méthode connect
    mongoClient.connect(url, function(err, db) {
      if (err) {
        return console.error('Connection failed', err)
      }
      console.log('Connection successful on ', url)

      // Récupération de la collection users
      let collection = db.collection('messages')
      // Création d'objets
      let message = {
          text: content,
          date: new Date()
      }
      // Enregistrement de plusieurs objets en db avec insertMany
      //collection.insertMany([user1, user2], function (err, result) {
      //})
      //Enregistrement d'un objet en db avec insertOne
      collection.insertOne(message, function(err, result) {
          if (err) {
              console.error('Insert failed', err);
          } else {
              console.log('Insert successful', result.ops);
              callback(result)
          }
      })
      // Fermeture de la connexion
      db.close()
    })
  }

  static all (cb) {
    // Récupération du client mongodb
    let mongoClient = require('mongodb').MongoClient
    // Paramètres de connexion
    let url = 'mongodb://localhost:27017/test'
    // Connexion au serveur avec la méthode connect
    mongoClient.connect(url, function(err, db) {
      if (err) {
        return console.error('Connection failed', err)
      }
      console.log('Connection successful on ', url)
      // Récupération de la collection users
      let collection = db.collection('messages')
      // Récupération de tous les documents de la collection
      collection.find().sort({date:-1}).toArray(function (err, result) {
          if (err) {
              console.error('Find all messages failed', err)
          } else {
              console.log('Find all messages successful', result)
              cb(result)
          }
      })
      db.close()
    })
  }

  static find (id, cb) {
    // Récupération du client mongodb
    let mongoClient = require('mongodb').MongoClient
    // Paramètres de connexion
    let url = 'mongodb://localhost:27017/test'
    // Connexion au serveur avec la méthode connect
    mongoClient.connect(url, function(err, db) {
      if (err) {
        return console.error('Connection failed', err)
      }
      console.log('Connection successful on ', url)
      // Récupération de la collection users
      let collection = db.collection('messages')
      let ObjectId = require('mongodb').ObjectId
      let o_id = new ObjectId(id)
      let query = { _id: o_id }
      collection.find(query).toArray(function (err, res) {
          if (err) {
              console.error('Find message failed', err)
          } else {
              console.log('Find message successful', res[0])
              cb(res[0])
          }
      })
      db.close()
    })
  }
}

module.exports = Message
