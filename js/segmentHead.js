const SegmentHead = function(position) {
    Segment.call(this, position);
};

SegmentHead.prototype = Object.create(Segment.prototype);

SegmentHead.prototype.setAnchor = function(position, direction) {
    this.position = position;
    this.direction.set(direction);
};