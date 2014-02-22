// Chatrooms
Meteor.publish('chat', function(params) {
    // TODO ROOMS SHOULD NOT BE CREATED HERE, CHANGE THIS...SOMEHOW
    if (params.type == 'github') {
        var room = Meteor.metamech.Rooms.findOne({owner: params.owner, repo: params.repo, type: params.type})
            , roomId
            , gt
    
        if (room == null) {
            roomId = Meteor.metamech.Rooms.insert({owner: params.owner, repo: params.repo, type: params.type})
            gt = -1
        } else {
            roomId = room._id
            gt = room.count - params.offset
        }

        return Meteor.metamech.Messages.find({room: roomId, count: {$gt: gt}}, {sort: {timestamp: -1}})
    }
    return []
})

Meteor.publish('room', function(params) {
    return Meteor.metamech.Rooms.find({owner: params.owner, repo: params.repo, type: params.type})
})
