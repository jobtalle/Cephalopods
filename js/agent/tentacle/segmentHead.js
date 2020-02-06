const SegmentHead = function(position) {
    Segment.call(this, position);
};

SegmentHead.prototype = Object.create(Segment.prototype);

SegmentHead.prototype.setAnchor = function(position, angle) {
    this.position.set(position);
    this.direction.fromAngle(angle);
};