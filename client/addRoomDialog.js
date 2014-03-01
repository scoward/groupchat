Template.addRoomDialog.events = {
    'click .close': function(e) {
        e.preventDefault()
        $('#addRoomDialog').modal('toggle')
    }
}
