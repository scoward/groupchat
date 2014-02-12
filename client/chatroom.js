Template.chatroom.messages = function() {
    this.messageList.rewind()
    var messages = this.messageList.fetch()
    return messages.reverse()
}

Template.chatroom.roomName = function() {
    return this.owner + '/' + this.repo
}

Template.chatroom.rendered = function() {
    // Add show more button if needed
    if ($("#messages").height() > $("#messagesContainer").height()) {
        var path = this.data.path + '/' + (parseInt(this.data.limit) + 20)
        var showMore = $('<a href="' + path + '"><button id="showMore" value="Show More">Show More</button></a>');
        showMore.prependTo("#messages")
    }
    if (Session.get('showMore') == true) {
        Session.set('showMore') == false
    } else {
        $("#messagesContainer").scrollTop($("#messagesContainer")[0].scrollHeight)
    }
}

Template.chatroom.events = {
    'click #leave': function() {
        if (!window.confirm("Leave this room?", "Do you really want to leave?")) { return; }
        Session.set("room", undefined)
    },
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
