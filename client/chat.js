Messages = new Meteor.Collection("messages")

Template.chat.messages = function() {
    return Messages.find()
}

Template.chat.events = {
    'submit': function(e, tmpl) {
        e.preventDefault();
        console.log("Clicked submit")
            
        var username;
        if (Meteor.user() == null) {
            username = ""
        } else {
            username = Meteor.user().profile.login
        }

        var newMessage = {
            username: username
            , message: tmpl.find("#chatinput").value
        }

        tmpl.find("#chatinput").value = ""

        Meteor.call("addMessage", newMessage,
                function(err, result) {
                    if (err) {
                        alert("Could not send message", err.reason)
                    }
                }
        )
    }
}
