/**
 * input is a modal used to display messages and also capture data
 * 
 * @param  {String} title       title that shows at the top of the modeal
 * @param  {String} content     A descriptive message on what the modal is for
 * @param  {String} placeholder placeholder for the textarea
 * @param  {String} confirm     a way to customize the text of the confirm button
 * @param  {Number} maxlength   for the textarea maxlength attribute
 */
var input = function(title,content,placeholder,confirm,maxlength) {
    var textarea = '', confirmButton = '';
    if (placeholder) {
        var mx = maxlength || 999;
        textarea = '<textarea class="input" type="text" placeholder="'+placeholder+'" maxlength="'+ mx +'">'+content+'</textarea>';
    }
    if (confirm) {
        confirmButton = '<div class="'+confirm+' confirm"><p>Okay</p></div>';
    }
    
    var onErr = [
        '<div class="onErr">',
            '<div class="container">',
                '<div class="title">',
                    '<h1>'+title+'</h1>',
                '</div>',
                '<div class="content">',
                    '<p>'+content+'</p>',
                    textarea,
                '</div>',
                '<div class="control">',
                    '<div class="cancel" onclick="dubx.closeErr();">',
                        '<p>Cancel</p>',
                    '</div>',
                    confirmButton,
                '</div>',
            '</div>',
        '</div>'
    ].join('');
    $('body').prepend(onErr);
};


var closeErr = function() {
    $('.onErr').remove();
};

module.exports = {
    input: input,
    closeErr : closeErr
}