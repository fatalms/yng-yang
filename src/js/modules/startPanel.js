// создать полотно, сетку и добавить события для чекбоксов
class SrartPanel {
    constructor(colors, settings) {
        const {canvas, grid} = createStartPanel(colors, settings);
        this._settings = settings;
        this._colors = colors;
        this.canvas = canvas;
        this.grid = grid;
        this.panel;
        this.setDefaultMatrix();
    }

    // очистить полотно
    clearCanvas() {
        this.canvas.getContext("2d").clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // обнулить матрицу панели
    setDefaultMatrix() {
        this.panel = this.defaultMatrix();
    }

    // создать пустую матрицу поля
    defaultMatrix() {
        const {width, height, cellSize} = this._settings,
            iMax = Math.floor(width / cellSize),
            jMax = Math.floor(height / cellSize),
            panel = [];

        for (let i = 0; i < iMax; i++) panel[i] = new Array(jMax);
        return panel;
    }

    putCoordinateToCanvas(x, y) {
        const {cellSize, cellType} = this._settings,
            ctx = this.canvas.getContext("2d");
        ctx.fillStyle = this._colors[`${cellType}`];
        ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }

    putCoordinate({x, y}) {
        const {cellSize, cellType} = this._settings,
            ctx = this.canvas.getContext("2d");
        this.panel[x / cellSize][y / cellSize] = cellType == "empty" ? null : cellType;
        ctx.fillStyle = this._colors[`${cellType}`];
        ctx.fillRect(x, y, cellSize, cellSize);
    }

    printCoordinates(colors) {
        const {cellSize} = this._settings,
            ctx = this.canvas.getContext("2d");
        this.clearCanvas();
        this.panel.forEach((arr, i) => {
            arr.forEach((item, j) => {
                ctx.fillStyle = colors[item || "empty"];
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            });
        });
    }

    printGrid(colors) {
        const {cellSize} = this.settings;
        let ctx = this.grid.getContext("2d");
        ctx.strokeStyle = colors.grid;
        let w = this.grid.width - 1;
        let h = this.grid.height - 1;
        for (let x = 0; x <= w; x += cellSize) ctx.strokeRect(x, 0, 0.1, h);
        for (let y = 0; y <= h; y += cellSize) ctx.strokeRect(0, y, w, 0.1);
    }

    setEventListeners() {
        // Показать/убрать сетку
        const gridCheck = document.querySelector("#grid-checkbox"),
            canvasCheck = document.querySelector("#canvas-checkbox");

        if (!gridCheck.checked) this.grid.classList.add("_hidden");
        if (!canvasCheck.checked) this.canvas.classList.add("_hidden");

        gridCheck.addEventListener("input", () => {
            this.grid.classList.toggle("_hidden");
        });
        // Показать/убрать полото
        canvasCheck.addEventListener("input", () => {
            this.canvas.classList.toggle("_hidden");
        });

        document.querySelector("#clear-button").addEventListener("click", () => {
            this.clearCanvas();
            this.setDefaultMatrix();
        });
    }

    set settings(value) {
        this._settings = value;
    }

    get settings() {
        return this._settings;
    }
}

function createStartPanel(colors, settings) {
    const {width, height, cellSize} = settings;
    // сетка canvas
    function createGrid() {
        const cnv = document.querySelector("#grig-canvas");
        cnv.width = width;
        cnv.height = height;
        let ctx = cnv.getContext("2d");
        ctx.strokeStyle = colors.grid;
        let w = cnv.width - 1;
        let h = cnv.height - 1;
        for (let x = 0; x <= w; x += cellSize) ctx.strokeRect(x, 0, 0.1, h);
        for (let y = 0; y <= h; y += cellSize) ctx.strokeRect(0, y, w, 0.1);
        return cnv;
    }

    // основное полотно
    function createCanvas() {
        const cnv = document.querySelector("#main-canvas");
        cnv.width = width;
        cnv.height = height;
        return cnv;
    }

    return {
        canvas: createCanvas(),
        grid: createGrid(),
    };
}

export default SrartPanel;
