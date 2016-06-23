/*
    THE Q PUBLIC LICENSE version 1.0
    Copyright (C) 1999-2005 Trolltech AS, Norway.
    Everyone is permitted to copy and distribute this license document.
    The intent of this license is to establish freedom to share and change the software regulated by this license under the open source model.
    This license applies to any software containing a notice placed by the copyright holder saying that it may be distributed under the terms of the Q Public License version 1.0. Such software is herein referred to as the Software. This license covers modification and distribution of the Software, use of third-party application programs based on the Software, and development of free software which uses the Software.
    Granted Rights
    1. You are granted the non-exclusive rights set forth in this license provided you agree to and comply with any and all conditions in this license. Whole or partial distribution of the Software, or software items that link with the Software, in any form signifies acceptance of this license.
    2. You may copy and distribute the Software in unmodified form provided that the entire package, including - but not restricted to - copyright, trademark notices and disclaimers, as released by the initial developer of the Software, is distributed.
    3. You may make modifications to the Software and distribute your modifications, in a form that is separate from the Software, such as patches. The following restrictions apply to modifications:
    a. Modifications must not alter or remove any copyright notices in the Software.
    b. When modifications to the Software are released under this license, a non-exclusive royalty-free right is granted to the initial developer of the Software to distribute your modification in future versions of the Software provided such versions remain available under these terms in addition to any other license(s) of the initial developer.
    4. You may distribute machine-executable forms of the Software or machine-executable forms of modified versions of the Software, provided that you meet these restrictions:
    a. You must include this license document in the distribution.
    b. You must ensure that all recipients of the machine-executable forms are also able to receive the complete machine-readable source code to the distributed Software, including all modifications, without any charge beyond the costs of data transfer, and place prominent notices in the distribution explaining this.
    c. You must ensure that all modifications included in the machine-executable forms are available under the terms of this license.
    5. You may use the original or modified versions of the Software to compile, link and run application programs legally developed by you or by others.
    6. You may develop application programs, reusable components and other software items that link with the original or modified versions of the Software. These items, when distributed, are subject to the following requirements:
    a. You must ensure that all recipients of machine-executable forms of these items are also able to receive and use the complete machine-readable source code to the items without any charge beyond the costs of data transfer.
    b. You must explicitly license all recipients of your items to use and re-distribute original and modified versions of the items in both machine-executable and source code forms. The recipients must be able to do so without any charges whatsoever, and they must be able to re-distribute to anyone they choose.
    c. If the items are not available to the general public, and the initial developer of the Software requests a copy of the items, then you must supply one.
    Limitations of Liability
    In no event shall the initial developers or copyright holders be liable for any damages whatsoever, including - but not restricted to - lost revenue or profits or other direct, indirect, special, incidental or consequential damages, even if they have been advised of the possibility of such damages, except to the extent invariable law, if any, provides otherwise.
    No Warranty
    The Software and this license document are provided AS IS with NO WARRANTY OF ANY KIND, INCLUDING THE WARRANTY OF DESIGN, MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
    Choice of Law
    This license is governed by the Laws of Norway. Disputes shall be settled by Oslo City Court.
*/

// contact section
var bugReport = require('./contact/bugReport.js');
// general section
var snow = require('./general/snow.js');
var autovote = require('./general/autovote.js');
var afkStuff = require('./general/afk.js');

var dubx = {
  // options and constants  
  our_version : '03.05.00 - Dub Vote Info',
  srcRoot: 'https://rawgit.com/FranciscoG/DubX-Script/modularize',
  options : {
      let_autovote: false,
      let_split_chat: false,
      let_fs: false,
      let_medium_disable: false,
      let_warn_redirect: false,
      let_afk: false,
      let_active_afk: true,
      let_chat_window: false,
      let_css: false,
      let_hide_avatars: false,
      let_nicole: false,
      let_show_timestamps: false,
      let_video_window: false,
      let_twitch_emotes: false,
      let_emoji_preview: false,
      let_spacebar_mute: false,
      let_autocomplete_mentions: false,
      let_mention_notifications: false,
      let_downdub_chat_notifications: false,
      let_updub_chat_notifications: false,
      let_grab_chat_notifications: false,
      let_dubs_hover: false,
      let_custom_mentions: false,
      let_snow: false,
      draw_general: false,
      draw_userinterface: false,
      draw_settings: false,
      draw_customize: false,
      draw_contact: false,
      draw_social: false,
      draw_chrome: false
    },
    dubs : {
      upDubs: [],
      downDubs: [],
      grabs: []
    },

    // functions
    report_modal: bugReport.report_modal,
    snow: snow,
    autovote: autovote,
    afk: afkStuff.afk,
    createAfkMessage: afkStuff.createAfkMessage
};