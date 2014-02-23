Template.chatroom.messages = function() {
    this.messageList.rewind()
    var messages = this.messageList.fetch()
    return messages.reverse()
}

Template.chatroom.roomName = function() {
    return this.owner + '/' + this.repo
}

Template.chatroom.rendered = function() {
    if (Session.get('showMore') == true) {
        Session.set('showMore', false)
    } else {
        // TODO Scroll to top? Do we need to force the list to move?
    }
}

Template.chatroom.hasMoreMessages = function() {
    var countObj = Meteor.metamech.Counts.findOne(this.room)
    if (countObj != null) {
        if (countObj.count > parseInt(this.limit)) {
            return true
        }
    }
    return false
}

Template.chatroom.newLimitUrl = function() {
    return this.path + '/' + (parseInt(this.limit) + 20)
}

Template.chatroom.events = {
    'submit': function(e, tmpl) {
        e.preventDefault();
            
        var username;
        if (Meteor.user() == null) {
            username = ""
        } else {
            username = Meteor.user().profile.login
        }

        var newMessage = {
            author: username
            , text: tmpl.find("#msg").value
            , room: this.room
            , timestamp: (new Date()).toUTCString()
        }

        tmpl.find("#msg").value = ""

        Meteor.call("addMessage", newMessage,
                function(err, result) {
                    if (err) {
                        alert("Could not send message", err.reason)
                    }
                }
        )
    },
    'click #showMore': function () {
        Session.set('showMore', true)
    }
}
