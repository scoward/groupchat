Template.chatroom.messages = function() {
    this.messageList.rewind()
    var messages = this.messageList.fetch()
    return messages
}

Template.chatroom.roomName = function() {
    return this.owner + '/' + this.repo
}

Template.chatroom.rendered = function() {
    // TODO move this to the router if possible using before/after
    if (this.handle == null) {
        var firstrun = true
        this.handle = Deps.autorun(function() {
            var offset = Session.get('offset')
            if (firstrun == false) {
                Meteor.metamech.chatSub = Meteor.subscribe('chat', 
                        {type: this.type
                         , owner: this.owner
                         , repo: this.repo
                         , offset: offset
                        })
            } else {
                firstrun = false
            }
        })
    }
}

Template.chatroom.destroyed = function() {
    if (this.handle) {
        this.handle.stop()
        this.handle = null
    }
}

Template.chatroom.hasMoreMessages = function() {
    var room = Meteor.metamech.Rooms.findOne({_id: this.room})
    if (room.count > this.messageList.count()) {
        return true
    }
    return false
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
                // TODO probably shouldn't show an alert :)
                function(err, result) {
                    if (err) {
                        alert("Could not post message", err.reason)
                    }
                }
        )
    },
    'click #showMore': function (e) {
        e.preventDefault()
        var oldOffset = Session.get('offset')
        Session.set('offset', oldOffset + 50)
    }
}
