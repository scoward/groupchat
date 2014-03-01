ServiceConfiguration.configurations.remove({
    // not entirely sure why this is removed
    service: "github"
})

ServiceConfiguration.configurations.insert({
    service: "github"
    , clientId: "48525e16b115b5f2ed4a"
    , secret: "e7a784500a427dff8723d67b60aae048e63b1f4b"
})

Accounts.onCreateUser(function(options, user) {
    var accessToken = user.services.github.accessToken
        , result
        , profile

    result = Meteor.http.get("https://api.github.com/user", {
        params: {
            access_token: accessToken
        },
        headers: {
            "User-Agent": "Meteor/1.0"
        }
    })

    if (result.error) 
        throw result.error

    profile = _.pick(
        result.data
        , "login"
        , "name"
        , "avatar_url"
        , "url"
        , "company"
        , "blog"
        , "location"
        , "email"
        , "bio"
        , "html_url"
    )
    
    user.profile = profile

    return user;
})
