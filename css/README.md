
We're using Foundation Icon Fonts 3:    
http://zurb.com/playground/foundation-icon-fonts-3

**IMPORTANT NOTE:** 
For all User roles, make sure to convert the username to all lowercase

## DubX Team

```css
/* DubX Team stuff in Avatar List */
#avatar-list .user-{USER_NAME} .dubs:before {
    content: "DubX TEAM  -  ";
    font-weight: 700 !important;
    color: #409fff !important;
}

#avatar-list .user-{USER_NAME} {
    color: #409fff !important;
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:hover:before {
    content: "DubX" !important;
    font-weight: 700;
    font-family: proxima-nova,sans-serif;
    font-size: 10px;
}
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username {
    color: #409fff;
    text-shadow: 0px 0px 1px rgba(0,0,0,.5);
}
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username .user-role,
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username .user-role-icon {
    color: #409fff !important;
}
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:before {
    content: "\f1ee" !important;
    font-family: "foundation-icons";
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    text-decoration: inherit;
    margin-right: 5px;
}
```

## Admin 

```css
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:hover:before {
    content: "Admin";
    font-weight: 700;
    font-family: proxima-nova,sans-serif;
    font-size: 10px;
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username {
    color: #FF7E00;
    text-shadow: 0px 0px 1px rgba(0,0,0,.5);
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:before {
    content: "\f137";
    font-family: "foundation-icons";
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    text-decoration: inherit;
    margin-right: 5px;
}
ul.avatar-list li.admin {
    color: #FF7E00;
}
```

## VIP user styles

```css
/* VIP stuff in CHAT */
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:hover:before {
    content: "DubX VIP" !important;
    font-weight: 700;
    font-family: proxima-nova,sans-serif;
    font-size: 10px;
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username {
    color: #E8C248 !important;
    text-shadow: 0px 0px 1px rgba(0,0,0,.5);
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:before {
    font-family: "foundation-icons";
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    display: inline-block;
    text-decoration: inherit;
    margin-right: 5px;
}

/* And here is where we add User Specific Foundation Icon font*/
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:before {
    content: "\f192" !important; /* <-- This is the Paw icon */
}

/* VIP stuff in Avatar List */
#avatar-list .user-{USER_NAME} .dubs:before {
    content: "DubX VIP  -  ";
    font-weight: 700 !important;
    color: #E8C248 !important;
}

#avatar-list .user-{USER_NAME} {
    color: #E8C248 !important;
}
```
