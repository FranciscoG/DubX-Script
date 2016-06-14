dubx.optionMentions = function(){
    if (!dubx.options.let_autocomplete_mentions) {
        dubx.options.let_autocomplete_mentions = true;
        dubx.saveOption('autocomplete_mentions', 'true');
        dubx.on('.autocomplete_mentions');
    } else {
        dubx.options.let_autocomplete_mentions = false;
        dubx.saveOption('autocomplete_mentions', 'false');
        dubx.off('.autocomplete_mentions');
    }
};

dubx.mentionNotifications = function(){
    var self = this;

    function startNotifications(permission) {
        if (permission === "granted") {
            Dubtrack.Events.bind("realtime:chat-message", self.notifyOnMention);
            dubx.options.let_mention_notifications = true;
            dubx.saveOption('mention_notifications', 'true');
            dubx.on('.mention_notifications');
        }
    }

    if (!dubx.options.let_mention_notifications) {
        this.isActiveTab = true;

        window.onfocus = function () {
          dubx.isActiveTab = true;
        };

        window.onblur = function () {
          dubx.isActiveTab = false;
        };

        if (!("Notification" in window)) {
            dubx.input("Mention Notifications", "Sorry this browser does not support desktop notifications.  Please use the latest version of Chrome or FireFox");
        } else {
            if (Notification.permission === "granted") {
                startNotifications("granted");
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission(startNotifications);
            } else {
                dubx.input("Mention Notifications", "You have chosen to block notifications. Reset this choice by clearing your cache for the site.");
            }
        }
    } else {
        Dubtrack.Events.unbind("realtime:chat-message", this.notifyOnMention);
        dubx.options.let_mention_notifications = false;
        dubx.saveOption('mention_notifications', 'false');
        dubx.off('.mention_notifications');
    }
};

dubx.notifyOnMention = function(e){
    var content = e.message;
    var user = Dubtrack.session.get('username').toLowerCase();
    var mentionTriggers = ['@'+user];

    if (dubx.options.let_custom_mentions && localStorage.getItem('custom_mentions')) {
        //add custom mention triggers to array
        mentionTriggers = mentionTriggers.concat(localStorage.getItem('custom_mentions').toLowerCase().split(','));
    }

    if (mentionTriggers.some(function(v) { return content.toLowerCase().indexOf(v.trim(' ')) >= 0; }) && !dubx.isActiveTab && Dubtrack.session.id !== e.user.userInfo.userid) {
        var notificationOptions = {
            body: content,
            icon: "https://res.cloudinary.com/hhberclba/image/upload/c_lpad,h_100,w_100/v1400351432/dubtrack_new_logo_fvpxa6.png"
        };
        var n = new Notification("Message from "+e.user.username,notificationOptions);

        n.onclick = function(x) {
            window.focus();
            n.close();
        };
        setTimeout(n.close.bind(n), 5000);
    }
};