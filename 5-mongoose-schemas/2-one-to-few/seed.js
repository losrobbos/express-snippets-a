const mongoose = require('mongoose')
const User = require('./User.model')

const strConn = "mongodb://localhost/d04-a-db"
mongoose.connect(strConn)
.then(() => console.log("Connection to database established!"))
.catch((err) => console.log("[ERROR] Connection failed!", err.message))

// insert some related data
const seed = async () => {
  
  // create user
  const user = await User.create({
    username: "losrobbos",
    email: "los@los.com",
    password: "los123",
    // on to few relation => we just nest the stuff
    socialMedia: [
      { platform: "twitter", link: "https://twitter.com/robbos123" },
      { platform: "instagram", link: "https://instagram.com/robbos123" },
    ]
  })

  // add new social media link
  user.socialMedia.push({
    platform: "linkedin", link: "https://linkedin/robbos123"
  })
  
  console.log(user)
}

seed()
