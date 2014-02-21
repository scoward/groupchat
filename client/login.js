Template.user_loggedOut.events({
    "click #login": function(e, tmpl) {
        Meteor.loginWithGithub({
            requestPermissions: ['public_repo']
        }, function (err) {
            if (err) {
                console.log(err)
                // error handling
            } else {
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
