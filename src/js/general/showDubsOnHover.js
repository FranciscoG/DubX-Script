dubx.showDubsOnHover = function(){
    if(!dubx.options.let_dubs_hover){
        dubx.options.let_dubs_hover = true;
        dubx.saveOption('dubs_hover', 'true');
        dubx.on('.dubs_hover');

         // clear, start over
        this.resetDubs();

        Dubtrack.Events.bind("realtime:room_playlist-dub", this.dubWatcher);
        Dubtrack.Events.bind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
        Dubtrack.Events.bind("realtime:user-leave", this.dubUserLeaveWatcher);
        Dubtrack.Events.bind("realtime:room_playlist-update", dubx.resetDubs);
        Dubtrack.Events.bind("realtime:room_playlist-update", dubx.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song

        var dubupEl = $($('.dubup')[0]).parent('li');
        var dubdownEl = $($('.dubdown')[0]).parent('li');
        var grabEl = $($('.add-to-playlist-button')[0]).parent('li');

        $(dubupEl).addClass("dubx-updubs-hover");
        $(dubdownEl).addClass("dubx-downdubs-hover");
        $(grabEl).addClass("dubx-grabs-hover");

        //Show compiled info containers when casting/changing vote
        $(dubupEl).click(function(event){
            $('#dubx-updubs-container').remove();
                var x = event.clientX, y = event.clientY;

                if(!x || !y || isNaN(x) || isNaN(y)){
                    return $('#dubx-downdubs-container').remove();
                }

                var elementMouseIsOver = document.elementFromPoint(x, y);

            if($(elementMouseIsOver).hasClass('dubx-updubs-hover') || $(elementMouseIsOver).parents('.dubx-updubs-hover').length > 0){
                setTimeout(function(){$(dubupEl).mouseenter();}, 250);
            }
        });
        $(dubdownEl).click(function(event){
            $('#dubx-downdubs-container').remove();
                var x = event.clientX, y = event.clientY;

                if(!x || !y || isNaN(x) || isNaN(y)){
                    return $('#dubx-downdubs-container').remove();
                }

                var elementMouseIsOver = document.elementFromPoint(x, y);

            if($(elementMouseIsOver).hasClass('dubx-downdubs-hover') || $(elementMouseIsOver).parents('.dubx-downdubs-hover').length > 0){
                setTimeout(function(){$(dubdownEl).mouseenter();}, 250);
            }
        });
        $(grabEl).click(function(event){
            $('#dubx-grabs-container').remove();
                var x = event.clientX, y = event.clientY;

                if(!x || !y || isNaN(x) || isNaN(y)){
                    return $('#dubx-grabs-container').remove();
                }

                var elementMouseIsOver = document.elementFromPoint(x, y);

            if($(elementMouseIsOver).hasClass('dubx-grabs-hover') || $(elementMouseIsOver).parents('.dubx-grabs-hover').length > 0){
                setTimeout(function(){$(grabEl).mouseenter();}, 250);
            }
        });

        $(dubupEl).mouseenter(function(){
            if($("#dubx-updubs-container").length > 0) return; //already exists

            var infoPaneWidth = $(dubupEl).innerWidth() + $(dubdownEl).innerWidth();
            var dubupBackground = $('.dubup').hasClass('voted') ? $('.dubup').css('background-color') : $('.dubup').find('.icon-arrow-up').css('color');
            var html;

            if(dubx.dubs.upDubs.length > 0){
                html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-updubs-hover" style="border-color: '+dubupBackground+'">';
                dubx.dubs.upDubs.forEach(function(val){
                    html += '<li class="preview-dubinfo-item users-previews dubx-updubs-hover">' +
                                '<div class="dubinfo-image">' +
                                    '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                                '</div>' +
                                '<span class="dubinfo-text">@' + val.username + '</span>' +
                            '</li>'
                });
                html += '</ul>';                     
            }
            else{
                html = '<div id="dubinfo-preview" class="dubinfo-show dubx-updubs-hover dubx-no-dubs" style="border-color: '+dubupBackground+'">' +
                            'No updubs have been casted yet!' +
                        '</div>';
            }

            var newEl = document.createElement('div');
            newEl.id = 'dubx-updubs-container';
            newEl.className = 'dubinfo-show dubx-updubs-hover';
            newEl.innerHTML = html;
            newEl.style.visibility = "hidden";
            document.body.appendChild(newEl);

            var elemRect = this.getBoundingClientRect();
            var bodyRect = document.body.getBoundingClientRect();

            newEl.style.visibility = "";
            newEl.style.width = infoPaneWidth + 'px';
            newEl.style.top = (elemRect.top-150) + 'px';

            //If info pane would run off screen set the position on right edge
            if(bodyRect.right - elemRect.left >= infoPaneWidth){
                newEl.style.left = elemRect.left + 'px';
            }
            else{
                newEl.style.right = 0;
            }

            document.body.appendChild(newEl);

            $(this).addClass('dubx-updubs-hover');

            $(document.body).on('click', '.preview-dubinfo-item', function(e){
                var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
                dubx.updateChatInputWithString(new_text);
            });

            $('#dubinfo-preview').perfectScrollbar();

            $('.dubx-updubs-hover').mouseleave(function(event){
                var x = event.clientX, y = event.clientY;

                if(!x || !y || isNaN(x) || isNaN(y)){
                    return $('#dubx-downdubs-container').remove();
                }

                var elementMouseIsOver = document.elementFromPoint(x, y);

                if(!$(elementMouseIsOver).hasClass('dubx-updubs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubx-updubs-hover').length <= 0){
                    $('#dubx-updubs-container').remove();
                }

            });
        });
        $(dubdownEl).mouseenter(function(){
            if($("#dubx-downdubs-container").length > 0) return; //already exists

            var infoPaneWidth = $(dubupEl).innerWidth() + $(dubdownEl).innerWidth();
            var dubdownBackground = $('.dubdown').hasClass('voted') ? $('.dubdown').css('background-color') : $('.dubdown').find('.icon-arrow-down').css('color');
            var html;

            if(dubx.userIsAtLeastMod(Dubtrack.session.id)){
                if(dubx.dubs.downDubs.length > 0){
                    html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover" style="border-color: '+dubdownBackground+'">';
                    dubx.dubs.downDubs.forEach(function(val){
                        html += '<li class="preview-dubinfo-item users-previews dubx-downdubs-hover">' +
                                    '<div class="dubinfo-image">' +
                                        '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                                    '</div>' +
                                    '<span class="dubinfo-text">@' + val.username + '</span>' +
                                '</li>'
                    });
                    html += '</ul>';                     
                }
                else{
                    html = '<div id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover dubx-no-dubs" style="border-color: '+dubdownBackground+'">' +
                                'No downdubs have been casted yet!' +
                            '</div>';
                }
            }
            else{
                html = '<div id="dubinfo-preview" class="dubinfo-show dubx-downdubs-hover dubx-downdubs-unauthorized" style="border-color: '+dubdownBackground+'">' +
                            'You must be at least a mod to view downdubs!' +
                        '</div>';
            }

            var newEl = document.createElement('div');
            newEl.id = 'dubx-downdubs-container';
            newEl.className = 'dubinfo-show dubx-downdubs-hover';
            newEl.innerHTML = html;
            newEl.style.visibility = "hidden";
            document.body.appendChild(newEl);

            var elemRect = this.getBoundingClientRect();
            var bodyRect = document.body.getBoundingClientRect();

            newEl.style.visibility = "";
            newEl.style.width = infoPaneWidth + 'px';
            newEl.style.top = (elemRect.top-150) + 'px';

            //If info pane would run off screen set the position on right edge
            if(bodyRect.right - elemRect.left >= infoPaneWidth){
                newEl.style.left = elemRect.left + 'px';
            }
            else{
                newEl.style.right = 0;
            }

            document.body.appendChild(newEl);

            $(this).addClass('dubx-downdubs-hover');

            $(document.body).on('click', '.preview-dubinfo-item', function(e){
                var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
                dubx.updateChatInputWithString(new_text);
            });

            $('#dubinfo-preview').perfectScrollbar();

            $('.dubx-downdubs-hover').mouseleave(function(event){
                var x = event.clientX, y = event.clientY;

                if(!x || !y || isNaN(x) || isNaN(y)){
                    return $('#dubx-downdubs-container').remove();
                }

                var elementMouseIsOver = document.elementFromPoint(x, y);

                if(!$(elementMouseIsOver).hasClass('dubx-downdubs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubx-downdubs-hover').length <= 0){
                    $('#dubx-downdubs-container').remove();
                }

            });
        });
        $(grabEl).mouseenter(function(){
            if($("#dubx-grabs-container").length > 0) return; //already exists

            var infoPaneWidth = $(dubupEl).innerWidth() + $(grabEl).innerWidth();
            var grabsBackground = $('.add-to-playlist-button').hasClass('grabbed') ? $('.add-to-playlist-button').css('background-color') : $('.add-to-playlist-button').find('.icon-heart').css('color');
            var html;

            if(dubx.dubs.grabs.length > 0){
                html = '<ul id="dubinfo-preview" class="dubinfo-show dubx-grabs-hover" style="border-color: '+grabsBackground+'">';
                dubx.dubs.grabs.forEach(function(val){
                    html += '<li class="preview-dubinfo-item users-previews dubx-grabs-hover">' +
                                '<div class="dubinfo-image">' +
                                    '<img src="https://api.dubtrack.fm/user/' + val.userid + '/image">' +
                                '</div>' +
                                '<span class="dubinfo-text">@' + val.username + '</span>' +
                            '</li>'
                });
                html += '</ul>';                     
            }
            else{
                html = '<div id="dubinfo-preview" class="dubinfo-show dubx-grabs-hover dubx-no-grabs" style="border-color: '+grabsBackground+'">' +
                            'This song hasn\'t been grabbed yet!' +
                        '</div>';
            }

            var newEl = document.createElement('div');
            newEl.id = 'dubx-grabs-container';
            newEl.className = 'dubinfo-show dubx-grabs-hover';
            newEl.innerHTML = html;
            newEl.style.visibility = "hidden";
            document.body.appendChild(newEl);

            var elemRect = this.getBoundingClientRect();
            var bodyRect = document.body.getBoundingClientRect();

            newEl.style.visibility = "";
            newEl.style.width = infoPaneWidth + 'px';
            newEl.style.top = (elemRect.top-150) + 'px';

            //If info pane would run off screen set the position on right edge
            if(bodyRect.right - elemRect.left >= infoPaneWidth){
                newEl.style.left = elemRect.left + 'px';
            }
            else{
                newEl.style.right = 0;
            }

            document.body.appendChild(newEl);

            $(this).addClass('dubx-grabs-hover');

            $(document.body).on('click', '.preview-dubinfo-item', function(e){
                var new_text = $(this).find('.dubinfo-text')[0].innerHTML + ' ' ;
                dubx.updateChatInputWithString(new_text);
            });

            $('#dubinfo-preview').perfectScrollbar();

            $('.dubx-grabs-hover').mouseleave(function(event){
                var x = event.clientX, y = event.clientY;

                if(!x || !y || isNaN(x) || isNaN(y)){
                    return $('#dubx-grabs-container').remove();
                }

                var elementMouseIsOver = document.elementFromPoint(x, y);

                if(!$(elementMouseIsOver).hasClass('dubx-grabs-hover') && !$(elementMouseIsOver).hasClass('ps-scrollbar-y') && $(elementMouseIsOver).parent('.dubx-grabs-hover').length <= 0){
                    $('#dubx-grabs-container').remove();
                }

            });
        });
    }
    else{
        dubx.options.let_dubs_hover = false;
        dubx.saveOption('dubs_hover', 'false');
        dubx.off('.dubs_hover');
        Dubtrack.Events.unbind("realtime:room_playlist-dub", this.dubWatcher);
        Dubtrack.Events.unbind("realtime:room_playlist-queue-update-grabs", this.grabWatcher);
        Dubtrack.Events.unbind("realtime:user-leave", this.dubUserLeaveWatcher);
        Dubtrack.Events.unbind("realtime:room_playlist-update", dubx.resetDubs);
        Dubtrack.Events.unbind("realtime:room_playlist-update", dubx.resetGrabs); //TODO: Remove when we can hit the api for all grabs of current playing song
    }
};

dubx.dubUserLeaveWatcher = function(e){
    //Remove user from dub list
    if($.grep(dubx.dubs.upDubs, function(el){ return el.userid === e.user._id; }).length > 0){
        $.each(dubx.dubs.upDubs, function(i){
            if(dubx.dubs.upDubs[i].userid === e.user._id) {
                dubx.dubs.upDubs.splice(i,1);
                return false;
            }
        });
    }
    if($.grep(dubx.dubs.downDubs, function(el){ return el.userid === e.user._id; }).length > 0){
        $.each(dubx.dubs.downDubs, function(i){
            if(dubx.dubs.downDubs[i].userid === e.user._id) {
                dubx.dubs.downDubs.splice(i,1);
                return false;
            }
        });
    }
    if($.grep(dubx.dubs.grabs, function(el){ return el.userid === e.user._id; }).length > 0){
        $.each(dubx.dubs.grabs, function(i){
            if(dubx.dubs.grabs[i].userid === e.user._id) {
                dubx.dubs.grabs.splice(i,1);
                return false;
            }
        });
    }
};

dubx.grabWatcher = function(e){
    //If grab already casted
    if($.grep(dubx.dubs.grabs, function(el){ return el.userid == e.user._id; }).length <= 0){
        dubx.dubs.grabs.push({
            userid: e.user._id,
            username: e.user.username
        });
    }
};

dubx.updateChatInputWithString = function(str){
    $("#chat-txt-message").val(str).focus();
};