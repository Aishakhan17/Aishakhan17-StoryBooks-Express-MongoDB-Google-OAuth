const moment = require("moment")


module.exports = {
    formatDate: function(date, format) {
        return moment(date).format(format)
    },
    truncate: function (str, len) {
    if (str.length > len && str.length > 0) {
        var new_str = str + " ";
        new_str = str.substr (0, len);
        new_str = str.substr (0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : str.substr (0, len);

        return new_str +'...'; 
    }
    return str;
    },
    stripTags: function( txt ) {
        // console.log(txt)
        // exit now if text is undefined 
        if(typeof txt == "undefined") return;
        // the regular expresion
        var regexp = /<[\/\w]+>/g
        // replacing the text
        return txt.replace(regexp, '');
        
    },
    editIcon: function(storyUser, loggedUser, storyId, floating = true ) {
        if (storyUser._id.toString() === loggedUser._id.toString()) {
            // storyId = storyId.toString()
            // console.log(storyUser._id.toString(), loggedUser._id.toString(), storyId)
            if (floating) {
                return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            }
            else {
                return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`
            }
        }
        else {
            return ""
        }
    },
    select: function (selected, options) {
        return options
        .fn(this)
        .replace(
            new RegExp(' value="' + selected + '"'),
            '$& selected="selected"'
        )
        .replace(
            new RegExp('>' + selected + 'options'),
            ' selected = "selected"'
        )
    },
}

