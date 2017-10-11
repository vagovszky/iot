ko.observableArray.fn.setAt = function(index, value) {
    this.valueWillMutate();
    this()[index] = value;
    this.valueHasMutated();
}