Template.user_loggedOut.events({
    "click #login": function(e, tmpl) {
        Meteor.loginWithGithub({
            requestPermissions: ['public_repo']
        }, function (err) {
            if (err) {
                console.log(err)
                // error handling
            } else {
                console.log(this.userId)
                // show alerts
            }
        })
    }
})

Template.user_loggedIn.events({
    "click #logout": function (e, tmpl) {
        Meteor.logout(function(err) {
            if (err) {
                // error handling 
            } else {
                // show alerts
            }
        })
    }
})

Meteor.metamech.loggedIn = false
Meteor.metamech.trackingSub = null
Deps.autorun(function() {
    if (Meteor.user() == null) {
        if (Meteor.metamech.loggedIn != false) {
            Meteor.metamech.trackingSub.stop()
        }
    } else {
        if (Meteor.metamech.loggedIn != true) {
            Meteor.metamech.trackingSub = Meteor.subscribe('track')
            // setup other subs like user-rooms or preferences
        }
    }
})
