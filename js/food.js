const Food = function(environmentRadius) {
    this.environmentRadius = environmentRadius;
    this.gridSize = Math.ceil(environmentRadius * 2 / Food.GRID_SPACING);
    this.grid = new Array(this.gridSize * this.gridSize);

    const foods = new Array(Math.round(Math.PI * Math.pow(environmentRadius * (1 - Food.DISTRIBUTION_DEADZONE), 2) * Food.UNITS_PER_PIXEL));

    for (let food = 0; food < foods.length; ++food) {
        const angle = Math.random() * (Math.PI + Math.PI);
        const radius = Math.pow(Math.sqrt(Math.random()), Food.DISTRIBUTION_POWER) * environmentRadius * (1 - Food.DISTRIBUTION_DEADZONE);

        foods[food] = new Vector(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius);
    }

    for (let cell = 0; cell < this.grid.length; ++cell)
        this.grid[cell] = [];

    this.populateGrid(foods);
};

Food.RADIUS = 5;
Food.DISTRIBUTION_POWER = 2.5;
Food.DISTRIBUTION_DEADZONE = .1;
Food.GRID_SPACING = 128;
Food.GRID_SPACING_INVERSE = 1 / Food.GRID_SPACING;
Food.COLOR = "gray";
Food.UNITS_PER_PIXEL = .0006;

Food.prototype.update = function(agents) {
    for (let agent = 0; agent < agents.length; ++agent) {
        const distance = agents[agent].body.radius + Food.RADIUS;
        const xStart = Math.floor((agents[agent].position.x + this.environmentRadius - distance) * Food.GRID_SPACING_INVERSE);
        const yStart = Math.floor((agents[agent].position.y + this.environmentRadius - distance) * Food.GRID_SPACING_INVERSE);
        const xEnd = Math.ceil((agents[agent].position.x + this.environmentRadius + distance) * Food.GRID_SPACING_INVERSE);
        const yEnd = Math.ceil((agents[agent].position.y + this.environmentRadius + distance) * Food.GRID_SPACING_INVERSE);

        for (let y = yStart; y <= yEnd; ++y) for (let x = xStart; x <= xEnd; ++x) {
            if (x < 0 || y < 0 || x >= this.gridSize || y >= this.gridSize)
                continue;

            const cell = this.grid[x + y * this.gridSize];

            for (let food = cell.length; food-- > 0;) {
                const dx = cell[food].x - agents[agent].position.x;
                const dy = cell[food].y - agents[agent].position.y;

                if (dx * dx + dy * dy < distance * distance) {
                    ++agents[agent].eaten;

                    cell.splice(food, 1);
                }
            }
        }
    }
};

Food.prototype.draw = function(context) {
    context.fillStyle = Food.COLOR;

    for (const cell of this.grid) for (const food of cell) {
        context.beginPath();
        context.arc(food.x, food.y, Food.RADIUS, 0, Math.PI + Math.PI);
        context.fill();
    }
};

Food.prototype.populateGrid = function(foods) {
    for (let food = 0; food < foods.length; ++food) {
        const x = Math.floor((foods[food].x + this.environmentRadius) * Food.GRID_SPACING_INVERSE);
        const y = Math.floor((foods[food].y + this.environmentRadius) * Food.GRID_SPACING_INVERSE);

        this.grid[x + y * this.gridSize].push(foods[food]);
    }
};