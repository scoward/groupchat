Router.configure({
    layout: 'layout'
    , loadingTemplate: 'loading'
    , notFoundTemplate: 'notFound'
})

GithubController = RouteController.extend({
    template: 'chatroom',
    layoutTemplate: 'layout',
                 
    load: function() {
        Session.set('offset', 20)
    },
    
    waitOn: function() {
        // TODO validate URL input
        this.chatroom = {
            type: 'github'
            , owner: this.params.owner
            , repo: this.params.repo
            , offset: Session.get('offset')
        }
        // TODO figure out why this can happen
        if (isNaN(this.chatroom.offset)) {
            this.chatroom.offset = 20 // default
        }
        Meteor.metamech.chatSub = Meteor.subscribe('chat', this.chatroom)
        return [Meteor.metamech.chatSub
                , Meteor.subscribe('room', this.chatroom)
               ]
    },

    data: function() {
        var room = Meteor.metamech.Rooms.findOne({
            type: 'github'
            , owner: this.params.owner
            , repo: this.params.repo
        })
        
        var roomId = room._id
            , messages = Meteor.metamech.Messages.find({room: roomId}, {sort: {timestamp: 1}})
        
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
