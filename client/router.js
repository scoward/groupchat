Router.configure({
    layout: 'layout'
    , loadingTemplate: 'loading'
    , notFoundTemplate: 'notFound'
})

GithubController = RouteController.extend({
    template: 'chatroom',
    layoutTemplate: 'layout',
    
    waitOn: function() {
        // TODO validate input
        this.chatroom = {
            type: 'github'
            , owner: this.params.owner
            , repo: this.params.repo
        }
        return [Meteor.subscribe('chat', this.chatroom)
                , Meteor.subscribe('room', this.chatroom)
               ]
               
    },

    data: function() {
        var room = Meteor.metamech.Rooms.findOne(this.chatroom)
            , roomId = room._id
        var messages = Meteor.metamech.Messages.find({room: roomId}, {sort: {timestamp: -1}, limit: 3})
        
        return {
            messageList: messages
            , room: roomId
            , type: 'github'
            , owner: this.params.owner
            , repo: this.params.repo
        }
    }
})

Router.map(function() {
    this.route('chat', {
        path: '/'
    })
    
    this.route('github', {
        path: '/github/:owner/:repo'
        , controller: GithubController
    })
})
