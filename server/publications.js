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
