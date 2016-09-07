
We're using Foundation Icon Fonts 3:    
http://zurb.com/playground/foundation-icon-fonts-3

**IMPORTANT NOTE:** 
For all User roles, make sure to convert the username to all lowercase

Roles:

* [Team](#team)    
* [Admin](#admin)    
* [VIP](#vip)    
* [Admin & DubX](#admin-and-dubx)   
* [Owners](#owners)

## Team

Icon:

![Star](http://i.imgur.com/Et8jo1T.png)

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

#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username:hover:before {
    content: "DubX" !important;
    font-weight: 700;
    font-family: proxima-nova,sans-serif;
    font-size: 10px;
}
#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username {
    color: #409fff;
    text-shadow: 0px 0px 1px rgba(0,0,0,.5);
}
#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username .user-role,
#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username .user-role-icon {
    color: #409fff !important;
}
#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username:before {
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

Icon:

![Crown](http://i.imgur.com/eqAv215.png)

```css
#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username:hover:before {
    content: "Admin";
    font-weight: 700;
    font-family: proxima-nova,sans-serif;
    font-size: 10px;
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username {
    color: #FF7E00;
    text-shadow: 0px 0px 1px rgba(0,0,0,.5);
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username:before {
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

## VIP

Icon: VIP users typically get the "Sherriff-Badge" icon but we also allow some VIPs to get another icon

![Sherriff-Badge](http://i.imgur.com/3LxR8YM.png)

```css
/* User Specific Foundation Icon font*/
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:before {
    content: "\f1ae" !important; /* <-- This is the Sheriff-Badge icon */
}

/* VIP stuff in CHAT */
#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username:hover:before {
    content: "DubX VIP" !important;
    font-weight: 700;
    font-family: proxima-nova,sans-serif;
    font-size: 10px;
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username {
    color: #E8C248 !important;
    text-shadow: 0px 0px 1px rgba(0,0,0,.5);
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username:before {
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


/* VIP stuff in Avatar List */
#avatar-list .user-{USER_NAME} {
    color: #E8C248 !important;
}
/* And here is where we add User Specific Foundation Icon font*/
#chat .chat-container ul.chat-main li.user-{USER_ID} .stream-item-content .activity-row .username:before {
    content: "\f192" !important; /* <-- This is the Paw icon */

}
#avatar-list .user-{USER_NAME} .dubs:before {
    content: "DubX VIP  -  ";
    font-weight: 700 !important;
    color: #E8C248 !important;
}
```




## Admin and Dubx

For Dubtrack admins that also work on Dubx

2 Icons:  

![Crown](http://i.imgur.com/eqAv215.png)    
![Star](http://i.imgur.com/Et8jo1T.png)

```css
/* VIP stuff in Avatar List */
#avatar-list .user-{USER_NAME} .dubs:before {
    content: "Admin & DubX" !important;
    font-weight: 700;
    font-family: proxima-nova,sans-serif;
    font-size: 10px;
}

#avatar-list .user-{USER_NAME},
#avatar-list li.currentDJ .user-{USER_NAME}:after {
    color: #89BE6C !important;
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:hover:before {
    content: "Admin & DubX" !important;
    font-weight: 700;
    font-family: proxima-nova,sans-serif;
    font-size: 10px;
}

#avatar-list .user-{USER_NAME} p.username {
    color: #89BE6C !important;
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username {
    color: #89BE6C !important;
    text-shadow: 0px 0px 1px rgba(0,0,0,.5);
}
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:before {
    content: "\f137  \f1ee";
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

## Owners

2 Icons:  

![Crown](http://i.imgur.com/eqAv215.png)    
![Shield](http://i.imgur.com/Jk3hlIv.png)

```css
#avatar-list .user-{USER_NAME} .dubs:hover:before {
    content: "DubX Owner  -  ";
    font-weight: 700 !important;
    color: #89BE6C !important;
}
#avatar-list .user-{USER_NAME},
#avatar-list li.currentDJ .user-{USER_NAME}:after {
    color: #89BE6C !important;
}
#avatar-list .user-{USER_NAME} p.username {
    color: #89BE6C !important;
}

#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username {
    color: #89BE6C !important;
    text-shadow: 0px 0px 1px rgba(0,0,0,.5);
}
#chat .chat-container ul.chat-main li.user-{USER_ID} .activity-row .text p a.username:before {
    content: "\f137  \f1af";
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
