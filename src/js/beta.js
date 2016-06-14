
var hello_run;
if (!hello_run && Dubtrack.session.id) {
    hello_run = true;

   
    //Ref 2: Options
    var hello = {

        
        
        
        
        
        
        
        spacebar_mute: function() {
            if (!dubx.options.let_spacebar_mute) {
                dubx.options.let_spacebar_mute = true;
                $(document).bind('keypress.key32', function() {
                    var tag = event.target.tagName.toLowerCase();
                    if (event.which === 32 && tag !== 'input' && tag !== 'textarea') {
                        $('#main_player .player_sharing .player-controller-container .mute').click();
                    }
                });
                dubx.saveOption('spacebar_mute', 'true');
                dubx.on('.spacebar_mute');
            } else {
                dubx.options.let_spacebar_mute = false;
                $(document).unbind("keypress.key32");
                dubx.saveOption('spacebar_mute','false');
                dubx.off('.spacebar_mute');
            }
        },
        filterUsers :function(str){
            var re = new RegExp('^@' + str, "i");
            return dubx.roomUsers.filter(function(val){
                return re.test(val.text);
            });
        },
        updateUsersArray: function(){
            var self = dubx;
            self.roomUsers = []; // clear, start over
            Dubtrack.room.users.collection.models.forEach(function(val,i, arr){
                var u = val.attributes._user;
                self.roomUsers.push({
                    src : "https://api.dubtrack.fm/user/"+u._id+"/image",
                    text : "@" + u.username,
                    cn : "users"
                });
            });
        },
        userAutoComplete: function(){
            //Remove keydown event chat view to replace with our event
            Dubtrack.room.chat.delegateEvents(_(Dubtrack.room.chat.events).omit('keydown input#chat-txt-message'));

            $(document.body).on('keyup', "#chat-txt-message", this.chatInputKeyupFunc);
            dubx.whenAvailable("Dubtrack.room.users", dubx.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-ban", dubx.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-join", dubx.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-kick", dubx.updateUsersArray);
            Dubtrack.Events.bind("realtime:user-leave", dubx.updateUsersArray);
        },
        snooze: function() {
            if (!dubx.eventUtils.snoozed && Dubtrack.room.player.player_volume_level > 2) {
                dubx.eventUtils.currentVol = Dubtrack.room.player.player_volume_level;
                Dubtrack.room.player.setVolume(0);
                dubx.eventUtils.snoozed = true;
                Dubtrack.Events.bind("realtime:room_playlist-update", dubx.eventSongAdvance);
            } else if (dubx.eventUtils.snoozed) {
                Dubtrack.room.player.setVolume(dubx.eventUtils.currentVol);
                dubx.eventUtils.snoozed = false;
            }
        },
        eventSongAdvance: function(e) {
            if (e.startTime < 2) {
                if (dubx.eventUtils.snoozed) {
                    Dubtrack.room.player.setVolume(dubx.eventUtils.currentVol);
                    dubx.eventUtils.snoozed = false;
                }
                return true;
            }
        },
        eventUtils: {
            currentVol: 50,
            snoozed: false
        }
    };
    

} else {
    function onErr(error) {
        var onErr = [
            '<link rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/asset.css">',
            '<div class="onErr">',
                '<div class="container">',
                    '<div class="title">',
                        '<h1>Oh noes:</h1>',
                    '</div>',
                    '<div class="content">',
                        '<p>'+error+'</p>',
                    '</div>',
                    '<div class="control">',
                        '<div class="cancel" onclick="dubx.closeErr();">',
                            '<p>Cancel</p>',
                        '</div>',
                        '<div class="confirm confirm-err">',
                            '<p>Okay</p>',
                        '</div>',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');
        $('body').prepend(onErr);
    }
    if (!Dubtrack.session.id) {
        onErr('You\'re not logged in. Please login to use DUBX.');
    } else {
        onErr('Oh noes! We\'ve encountered a runtime error');
    };
    function closeErr() {
        $('.onErr').remove();
    };
    $('.cancel').click(closeErr);
    $('.confirm-err').click(closeErr);
}
