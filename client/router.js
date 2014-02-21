Router.configure({
    layout: 'layout'
    , loadingTemplate: 'loading'
    , notFoundTemplate: 'notFound'
})

GithubController = RouteController.extend({
    template: 'chatroom',
    layoutTemplate: 'layout',
    
    waitOn: function() {
        var limit = this.params.limit ? this.params.limit : "20"
        // TODO validate input
        this.chatroom = {
            type: 'github'
            , owner: this.params.owner
            , repo: this.params.repo
            , limit: limit
        }
        return [Meteor.subscribe('chat', this.chatroom)
                , Meteor.subscribe('room', this.chatroom)
                , Meteor.subscribe('counts', this.chatroom)
               ]
    },

    data: function() {
        var room = Meteor.metamech.Rooms.findOne({
            type: 'github'
            , owner: this.params.owner
            , repo: this.params.repo
        })
        
        var roomId = room._id
            , messages = Meteor.metamech.Messages.find({room: roomId}, {sort: {timestamp: -1}})
            , limit = this.params.limit ? this.params.limit : "20"
            , path = this.params.limit ? this.path.substring(0, this.path.lastIndexOf('/')) : this.path
        
        return {
            messageList: messages
            , room: roomId
            , type: 'github'
            , owner: this.params.owner
            , repo: this.params.repo
            , limit: limit
            , path: path
        }
    }
})

Router.map(function() {
    this.route('chat', {
        path: '/'
    })
    
    this.route('github', {
        path: '/github/:owner/:repo/:limit?'
        , controller: GithubController
    })
})
