Meteor.methods({
    addMessage: function(message) {
        if (message.author == "" ||
            message.author == null) {
            throw new Meteor.Error(413, "Message missing author...")
        }

        if (message.text == "") {
            throw new Meteor.Error(413, "Missing message text...")
        }
        
        if (message.room == "") {
            throw new Meteor.Error(413, "Message not associated with a room")
        }
        
        var id = Meteor.metamech.Messages.insert(message)
    }
})
