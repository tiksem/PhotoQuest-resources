/**
 * Created by CM on 11/14/2014.
 */
Array.prototype.remove = function(item) {
    var index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
        return true;
    }

    return false;
};

Array.prototype.unshiftAll = function(items) {
    for(var i = 0; i < items.length; i++){
        this.unshift(items[i]);
    }
};