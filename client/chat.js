Template.rooms.events = {
    'click #addRoom': function() {
        var roomName = window.prompt("Name the room", "My room") || "Anonymous Room";
        if (roomName) {
            Meteor.metamech.Rooms.insert({"name": roomName})
        }
    }
}

Template.chat.currentRoom = function() {
    return Session.get('room') || false
}

Template.rooms.availableRooms = function() {
    return Meteor.metamech.Rooms.find({})
}

Template.roomItem.events = {
    'click .enter': function() {
        Session.set("room", this._id)
    },
    'click .delete': function() {
        Meteor.metamech.Rooms.remote({_id: this._id})
    }
}

Template.oldchat.events = {
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
