const SegmentHead = function(position) {
    Segment.call(this, position);
};

SegmentHead.prototype = Object.create(Segment.prototype);

SegmentHead.prototype.setAnchor = function(position, offset, angle) {
    this.positionPrevious.set(this.position);
    this.directionPrevious.set(this.direction);

    this.position.set(position);
    this.position.add(offset);
    this.direction.fromAngle(angle);
};