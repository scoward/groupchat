// Chatrooms
Meteor.publish('chat', function(params) {
    if (params.type == 'github') {
        var room = Meteor.metamech.Rooms.findOne({owner: params.owner, repo: params.repo, type: params.type})
            , roomId
    
        if (room == null) {
            roomId = Meteor.metamech.Rooms.insert({owner: params.owner, repo: params.repo, type: params.type})
        } else {
            roomId = room._id
        }

        // Need to limit the publish or too much data will be sent over the wire.
        if (params.limit == null) {
            params.limit = 50
        }

        return Meteor.metamech.Messages.find({room: roomId}, {sort: {timestamp: -1}, limit: params.limit})
    }
    return []
})

Meteor.publish('room', function(params) {
    return Meteor.metamech.Rooms.find({owner: params.owner, repo: params.repo, type: params.type})
})

// Publish the amount of messages in a chatroom to the "counts" collection
Meteor.publish('counts', function(params) {
    var self = this
        , count = 0
        , initializing = true
    var room = Meteor.metamech.Rooms.findOne({owner: params.owner, repo: params.repo, type: params.type})
        , roomId = room._id
    var handle = Meteor.metamech.Messages.find({room: roomId}).observeChanges({
        added: function(id) {
            count++
            if (!initializing) {
                self.changed("counts", roomId, {count: count})
            }
        },
        removed: function(id) {
            count--;
            self.changed("counts", roomId, {count: count})
        }
    })

    // Only send changes after the initial added calls are made.
    // Mark subscription as ready and return initial count.
    intializing = false
    self.added("counts", roomId, {count: count})
    self.ready()

    // Stop observing the cursor when a client unsubs.
    self.onStop(function() {
        handle.stop()
    })
})
