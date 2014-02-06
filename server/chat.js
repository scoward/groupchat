Messages = new Meteor.Collection("messages")

Meteor.startup(function() {
    console.log("Starting the chat")
    if (Messages.find().count() == 0) {
        Messages.insert({ userName: "Server message", message: "Starting meteor js chat..."})
    }
})
