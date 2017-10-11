ko.extenders.numeric = function(target, precision) {
    var result = ko.dependentObservable({
        read: function() {
            return target().toFixed(precision); 
        },
        write: target 
    });
    
    result.raw = target;
    return result;
};
