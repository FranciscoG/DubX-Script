
### SASS info


####Roles

There are 5 types of stylings for users

* Admin    
* DubX Team    
* Admin & DubX    
* VIP    
* Owners

To add stylings for one of these roles you can use one of these mixins

```sass
// admin only needs the user ID
@include makeAdmin("USER_ID");

// DubX Team
@include addRole("team", "USER_NAME", "USER_ID");

// VIP
@include makeVIP("USER_NAME", "USER_ID");

// Owner
@include makeOwner("USER_NAME", "USER_ID");

// Admin + DubX
@include makeAdminDubx("USER_NAME","USER_ID");
```

Each of these mixins can also take 2 extra arguments to override the icon and color that are set in `variables.scss`.    

Example:

```sass
// do NOT include the "\" when including a custom icon
@include makeVIP("USER_NAME", "USER_ID", "f192", "#00aeff");
```