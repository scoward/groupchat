Meteor.methods({
    addMessage: function(message) {
        if (message.username == "" ||
            message.username == null) {
            throw new Meteor.Error(413, "Missing a user name...")
        }

        if (message.message == "") {
            throw new Meteor.Error(413, "Missing message content...")
        }
        
        var id = Messages.insert(message)

        var cursor = Messages.find()
        if (cursor.count() > 20) {
            var oldestMessage = Messages.findOne()
            Messages.remove(oldestMessage)
        }
    }
})
