Mutator.APPENDAGE_ANGLE_CHANCE = .2;
Mutator.APPENDAGE_ANGLE_POWER = 5;
Mutator.APPENDAGE_ANGLE_AMPLITUDE = .7;

Mutator.prototype.mutateAppendage = function(dna) {
    if (Math.random() < Mutator.APPENDAGE_ANGLE_CHANCE) {
        if (dna.angle === 0)
            dna.angle = Appendage.ANGLE_ALIGN_THRESHOLD;
        else if (dna.angle === Math.PI)
            dna.angle = Math.PI - Appendage.ANGLE_ALIGN_THRESHOLD;

        dna.angle += (Math.random() < .5 ? -1 : 1) * Math.pow(Math.random(), Mutator.APPENDAGE_ANGLE_POWER) * Mutator.APPENDAGE_ANGLE_AMPLITUDE;

        if (dna.angle < Appendage.ANGLE_ALIGN_THRESHOLD)
            dna.angle = 0;
        else if (dna.angle > Math.PI - Appendage.ANGLE_ALIGN_THRESHOLD)
            dna.angle = Math.PI;
    }
};