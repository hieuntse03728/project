/**
 * Created by hieun on 7/14/2017.
 */
var moment = require('moment');
module.exports = {
    convert: function (unixtime) {
        unixtime = parseInt(unixtime);
        unixtime = new Date(unixtime*1000);
        unixtime = moment(unixtime).format('MMMM Do YYYY, h:mm:ss a');
        return unixtime;
    }
};
