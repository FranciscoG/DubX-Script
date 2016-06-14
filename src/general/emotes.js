
dubx.previewListInit = function(){
    $('head').prepend('<link rel="stylesheet" type="text/css" href="'+dubx.gitRoot+'/css/options/autocomplete.css">');
    var acUL = document.createElement('ul');
    acUL.id = "autocomplete-preview";
    $('.pusher-chat-widget-input').prepend(acUL);

    $(document.body).on('click', '.preview-item', function(e){
        var new_text = $(this).find('.ac-text')[0].textContent;
        dubx.updateChatInput(new_text);
    });

    $(document.body).on('keyup', '.ac-show', dubx.previewListKeyUp);
};

/**************************************************************************
 * Turn on/off the twitch emoji in chat
 */
dubx.optionTwitchEmotes =function(){
    document.body.addEventListener('twitch:loaded', this.loadBTTVEmotes);
    document.body.addEventListener('bttv:loaded', this.loadTastyEmotes);
    
    if (!dubx.options.let_twitch_emotes) {
        if (!dubx.twitchJSONSLoaded) {
            dubx.loadTwitchEmotes();
        } else {
            this.replaceTextWithEmote();
        }

        Dubtrack.Events.bind("realtime:chat-message", this.replaceTextWithEmote);
        dubx.options.let_twitch_emotes = true;
        dubx.saveOption('twitch_emotes', 'true');
        dubx.on('.twitch_emotes');
    } else {
        Dubtrack.Events.unbind("realtime:chat-message", this.replaceTextWithEmote);
        dubx.options.let_twitch_emotes = false;
        dubx.saveOption('twitch_emotes', 'false');
        dubx.off('.twitch_emotes');
    }
};
/**
 * Populates the popup container with a list of items that you can click/enter
 * on to autocomplete items in the chat box
 * @param  {Array} acArray  the array of items to be added.  Each item is an object:
 * {
 *   src : full image src,
 *   text : text for auto completion,
 *   cn : css class name for to be concat with '-preview',
 *   alt : OPTIONAL, to add to alt and title tag
 * }
 */
dubx.previewList = function(acArray) {
    var self = this;

    function makePreviewContainer(cn){
        var d = document.createElement('li');
        d.className = cn;
        return d;
    }
    function makeImg(src, altText) {
        var i = document.createElement('img');
        i.src = src;
        if (altText) {
            i.title = altText;
            i.alt = altText;
        }
        var div = document.createElement('div');
        div.className = "ac-image";
        div.appendChild(i);
        return div;
    }
    function makeNameSpan (name){
        var s = document.createElement('span');
        s.textContent = name;
        s.className = "ac-text"; // autocomplete text
        return s;
    }
    function makeLi (info){
        var container = makePreviewContainer("preview-item "+info.cn+"-previews");
        var span = makeNameSpan(info.text);
        var img;
        if (info.alt) {
            img = makeImg(info.src, info.alt);
        } else {
            img = makeImg(info.src);
        }
        container.appendChild(img);
        container.appendChild(span);
        container.tabIndex = -1;
        return container;
    }

    var aCp =  document.getElementById('autocomplete-preview');
    aCp.innerHTML = "";
    self.displayBoxIndex = -1;
    var frag = document.createDocumentFragment();

    acArray.forEach(function(val,i,arr){
        frag.appendChild(makeLi(val));
    });

    aCp.appendChild(frag);
    aCp.classList.add('ac-show');
};
dubx.previewSearchStr = "";

dubx.updateChatInput = function(str){
    var inputText = $("#chat-txt-message").val();
    var updatedText = inputText.split(' ').map(function(c,i,r){
        var fullStr = str.toLowerCase();
        var partialStr = c.toLowerCase();
        if (fullStr.indexOf(partialStr) === 0) { 
            return str;
        } else {
            return c;
        }
    });
    $('#autocomplete-preview').empty().removeClass('ac-show');
    $("#chat-txt-message").val(updatedText.join(' ') + ' ').focus();
};

dubx.displayBoxIndex = -1;
dubx.doNavigate = function(diff) {
  var self = dubx;
  self.displayBoxIndex += diff;
  var oBoxCollection = $(".ac-show li");
  
  // remove "press enter to select" span
  $('.ac-list-press-enter').remove();

  if (self.displayBoxIndex >= oBoxCollection.length){
      dubx.displayBoxIndex = 0;
  }
  if (self.displayBoxIndex < 0){
       self.displayBoxIndex = oBoxCollection.length - 1;
   }
  var cssClass = "selected";
  var enterToSelectSpan = '<span class="ac-list-press-enter">press enter to select</span>';
  dubx.oBoxCollection.removeClass(cssClass).eq(self.displayBoxIndex).addClass(cssClass).append(enterToSelectSpan).focus();
};

dubx.previewListKeyUp = function(e){
  e.preventDefault();
  switch(e.keyCode) {
      case 38:
          dubx.doNavigate(-1);
          break;
      case 40:
          dubx.doNavigate(1);
          break;
      case 39:
      case 13:
          var new_text = $('#autocomplete-preview li.selected').find('.ac-text')[0].textContent;
          dubx.updateChatInput(new_text);
          break;
      default:
          $("#chat-txt-message").focus();
          break;
  }
};

/**************************************************************************
 * A bunch of utility helpers for the emoji preview
 */
dubx.emojiUtils : {
    createPreviewObj : function(type, id, name) {
        return {
            src : hello[type].template(id),
            text : ":" + name + ":",
            alt : name,
            cn : type
        };
    },
    addToPreviewList : function(emojiArray) {
        var self = dubx.emojiUtils;
        var listArray = [];
        var _key;

        emojiArray.forEach(function(val,i,arr){
            _key = val.toLowerCase();
            if (typeof dubx.twitch.emotes[_key] !== 'undefined') {
                listArray.push(self.createPreviewObj("twitch", dubx.twitch.emotes[_key], val));
            }
            if (typeof dubx.bttv.emotes[_key] !== 'undefined') {
                listArray.push(self.createPreviewObj("bttv", dubx.bttv.emotes[_key], val));
            }
            if (typeof dubx.tasty.emotes[_key] !== 'undefined') {
                listArray.push(self.createPreviewObj("tasty", _key, val));
            }
            if (emojify.emojiNames.indexOf(_key) >= 0) {
                listArray.push(self.createPreviewObj("emoji", val, val));
            }
        });

        dubx.previewList(listArray);
    },
    filterEmoji : function(str){
        var finalStr = str.replace(/([+()])/,"\\$1");
        var re = new RegExp('^' + finalStr, "i");
        var arrayToUse = emojify.emojiNames;
        if (dubx.options.let_twitch_emotes) {
            arrayToUse = dubx.emojiEmotes; // merged array
        }
        return arrayToUse.filter(function(val){
            return re.test(val);
        });
    }
};

/**************************************************************************
 * handles filtering emoji, twitch, and users preview autocomplete popup on keyup
 */
dubx.chatInputKeyupFunc = function(e){
    var self = dubx;
    var currentText = this.value;
    var keyCharMin = 3; // when to start showing previews, default to 3 chars
    var cursorPos = $(this).get(0).selectionStart;
    // console.log("cursorPos", cursorPos);
    var strStart;
    var strEnd;
    var inputRegex = new RegExp('(:|@)([&!()\\+\\-_a-z0-9]+)($|\\s)', 'ig');
    var filterText = currentText.replace(inputRegex, function(matched, p1, p2, p3, pos, str){
        // console.dir( arguments );
        strStart = pos;
        strEnd = pos + matched.length;

        dubx.previewSearchStr = p2;
        keyCharMin = (p1 === "@") ? 1 : 3;

        if (cursorPos >= strStart && cursorPos <= strEnd) {
            // twitch and emoji
            if (p2 && p2.length >= keyCharMin && p1 === ":" && dubx.options.let_emoji_preview) {
                self.emojiUtils.addToPreviewList( self.emojiUtils.filterEmoji(p2) );
            }

            // users
            if (p2 && p2.length >= keyCharMin && p1 === "@" && dubx.options.let_autocomplete_mentions) {
                self.previewList( self.filterUsers(p2) );
            }
        }
        
    });

    var lastChar = currentText.charAt(currentText.length - 1);
    if (self.previewSearchStr.length < keyCharMin ||
        lastChar === ":" ||
        lastChar === " " ||
        currentText === "")
    {
        self.previewSearchStr = "";
        $('#autocomplete-preview').empty().removeClass('ac-show');
    }

    // automatically make first item selectable if not already
    if (!$('.ac-show li:first-child').find(".ac-list-press-enter").length) {
        var spanToEnter = '<span class="ac-list-press-enter">press enter to select</span>';
        $('.ac-show li:first-child').append(spanToEnter).addClass('selected');
    }

    if (e.keyCode === 13 && $('#autocomplete-preview li').length > 0) {
        var new_text = $('#autocomplete-preview li.selected').find('.ac-text')[0].textContent;
        dubx.updateChatInput(new_text);
        return;
    }

    if (e.keyCode === 38) {
        self.doNavigate(-1);
    }
    if (e.keyCode === 40) {
        self.doNavigate(1);
    }
    if (e.keyCode === 13 && currentText.length > 0){
        Dubtrack.room.chat.sendMessage();
    }
};

dubx.optionEmojiPreview =function(){
    if (!dubx.options.let_emoji_preview) {
        dubx.options.let_emoji_preview = true;
        dubx.saveOption('emoji_preview', 'true');
        dubx.on('.emoji_preview');
    } else {
        dubx.options.let_emoji_preview = false;
        dubx.saveOption('emoji_preview', 'false');
        dubx.off('.emoji_preview');
    }
};