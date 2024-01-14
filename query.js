//  Draw

const container = document.querySelector('.field');
const sizeEl = document.querySelector('.size');
const color = document.getElementById('C-input');
const resetBtn = document.getElementById('reset');

const color_background = document.getElementById('color-reset-container');
const reset_btn = document.getElementById("reset");

var output = document.getElementById("query-output");
var self = document.getElementById("self");
var pre = document.getElementById("pre");

color.addEventListener('input', function () {
    const val = color.value;
    const gs_col = `rgb(${val}, ${val}, ${val})`;
    color_background.style.backgroundColor = gs_col;
    reset_btn.style.color = gs_col;
    reset_btn.style.backgroundColor = `rgb(${255-val}, ${255-val}, ${255-val})`;
});

let size = 28;
let draw = false;
if (window.matchMedia("(min-width: 480px)").matches) {
    function create(size) {
        console.log("Creating Grid...");
        for (let i = 0; i < size * size; i++) {
            const div = document.createElement('div');
            div.classList.add('pixel');

            div.addEventListener('mouseover', function () {
                if (!draw) return
                const val = color.value;
                const gs_val = `rgb(${val}, ${val}, ${val})`;
                div.style.backgroundColor = gs_val;
            });
            div.addEventListener('mousedown', function () {
                const val = color.value;
                var gs_val = `rgb(${val}, ${val}, ${val})`;
                div.style.backgroundColor = gs_val;
            });
            div.style.backgroundColor = "rgb(255,255,255)";

            container.appendChild(div);
        }
    }
    window.addEventListener('mouseup', function () {
        draw = false;
    });

    window.addEventListener('mousedown', function () {
        draw = true;
    });
} else {
    function create(size) {
        console.log("Creating Grid...");

        container.addEventListener('touchmove', function (event) {
            event.preventDefault();
            if (!draw) return;

            const touch = event.touches[0];
            const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);


            if (targetElement && targetElement.classList.contains('pixel')) {
                const val = color.value;
                var gs_val = `rgb(${val}, ${val}, ${val})`;
                targetElement.style.backgroundColor = gs_val;
            }
        });

        container.addEventListener('touchstart', function (event) {
            event.preventDefault();
            const touch = event.touches[0];
            const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);

            if (targetElement && targetElement.classList.contains('pixel')) {
                const val = color.value;
                var gs_val = `rgb(${val}, ${val}, ${val})`;
                targetElement.style.backgroundColor = gs_val;
            }
        });

        for (let i = 0; i < size * size; i++) {
            const div = document.createElement('div');
            div.classList.add('pixel');
            div.style.backgroundColor = "rgb(255,255,255)";
            container.appendChild(div);
        }
    }
    window.addEventListener('touchend', function () {
        draw = false;
    });

    window.addEventListener('touchstart', function () {
        draw = true;
    });
}
create(size);

function reset() {
    container.innerHTML = '';
    create(size);
}

function read() {
    var set = [0];
    var divs = container.children;
    for (let i = 0; i < divs.length; i++) {
        var colorString = divs[i].style.backgroundColor;
        var red = 255-parseInt(colorString.split(")")[0].split("(")[1].split(",")[1]);
        set.push(red);
    }
    return set;
}

var NeuralNetwork = /** @class */ (function () {
    function NeuralNetwork() {
        if (this.wih === undefined) {
            this.wih = null;
        }
        if (this.who === undefined) {
            this.who = null;
        }
        if (this.hidden_inputs === undefined) {
            this.hidden_inputs = null;
        }
        if (this.hidden_outputs === undefined) {
            this.hidden_outputs = null;
        }
        if (this.final_inputs === undefined) {
            this.final_inputs = null;
        }
        if (this.final_outputs === undefined) {
            this.final_outputs = null;
        }
    }
    /*private*/ NeuralNetwork.prototype.calculateError = function (errors, outputs) {
        var result = (function (dims) {
            var allocate = function (dims) {
                if (dims.length === 0) {
                    return 0;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                }
            }; return allocate(dims);
        })([errors.length, 1]);
        for (var i = 0; i < result.length; i++) {
            {
                result[i][0] = errors[i][0] * outputs[i][0] * (1 - outputs[i][0]);
            }
            ;
        }
        return result;
    };
    NeuralNetwork.prototype.query = function (input) {
        var inputs = (function (dims) {
            var allocate = function (dims) {
                if (dims.length === 0) {
                    return 0;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                }
            }; return allocate(dims);
        })([input.length - 1, 1]);
        for (var i = 1; i < input.length; i++) {
            {
                inputs[i - 1][0] = 0.9 * input[i] / 255.0 + 0.01;
            }
            ;
        }
        this.calculate(inputs);
        var result = (function (s) {
            var a = []; while (s-- > 0)
                a.push(0); return a;
        })(this.final_outputs.length);
        for (var i = 0; i < result.length; i++) {
            {
                result[i] = this.final_outputs[i][0];
            }
            ;
        }
        return result;
    };
    /*private*/ NeuralNetwork.prototype.calculate = function (inputs) {
        this.hidden_inputs = this.dot(this.wih, inputs);
        this.hidden_outputs = this.activationFunction(this.hidden_inputs);
        this.final_inputs = this.dot(this.who, this.hidden_outputs);
        this.final_outputs = this.activationFunction(this.final_inputs);
    };
    /*private*/ NeuralNetwork.prototype.dot = function (matrixA, matrixB) {
        var rowsA = matrixA.length;
        var rowsB = matrixB.length;
        var colsA = matrixA[0].length;
        var colsB = matrixB[0].length;
        if (colsA !== rowsB)
            return null;
        var result = (function (dims) {
            var allocate = function (dims) {
                if (dims.length === 0) {
                    return 0;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                }
            }; return allocate(dims);
        })([rowsA, colsB]);
        for (var i = 0; i < rowsA; i++) {
            {
                for (var j = 0; j < colsB; j++) {
                    {
                        for (var n = 0; n < rowsB; n++) {
                            {
                                result[i][j] += matrixA[i][n] * matrixB[n][j];
                            }
                            ;
                        }
                    }
                    ;
                }
            }
            ;
        }
        return result;
    };
    /*private*/ NeuralNetwork.prototype.activationFunction = function (x) {
        for (var i = 0; i < x.length; i++) {
            {
                for (var j = 0; j < x[i].length; j++) {
                    {
                        x[i][j] = 1 / (1 + Math.pow(Math.E, -x[i][j]));
                    }
                    ;
                }
            }
            ;
        }
        return x;
    };
    /*private*/ NeuralNetwork.prototype.transpose = function (matrix) {
        var result = (function (dims) {
            var allocate = function (dims) {
                if (dims.length === 0) {
                    return 0;
                }
                else {
                    var array = [];
                    for (var i = 0; i < dims[0]; i++) {
                        array.push(allocate(dims.slice(1)));
                    }
                    return array;
                }
            }; return allocate(dims);
        })([matrix[0].length, matrix.length]);
        for (var i = 0; i < matrix.length; i++) {
            {
                for (var j = 0; j < matrix[0].length; j++) {
                    {
                        result[j][i] = matrix[i][j];
                    }
                    ;
                }
            }
            ;
        }
        return result;
    };
    return NeuralNetwork;
}());
NeuralNetwork["__class"] = "NeuralNetwork";

function get_max_index(input) {
    var i = 0;
    for (var n = 0; n < input.length; n++) {
        {
            if (input[n] > input[i])
                i = n;
        }
        ;
    }
    return i;
};

async function queryNetwork() {
    output.style.color = "red";
    if (self.checked) {
        console.log("self selected");
        var network = new NeuralNetwork;
        network.wih = JSON.parse(localStorage.getItem("wih"));
        network.who = JSON.parse(localStorage.getItem("who"));
        let result = get_max_index(network.query(read()));
        console.log("res: " + result);
        output.innerHTML = result;
    } else if (pre.checked) {

        console.log("pre selected");
        let jsonFilePath = "data/data_gson_1000_4.json";

        try {
            let response = await fetch(jsonFilePath);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            let data = await response.json();

            var network = new NeuralNetwork(784, 1000, 10);
            network.wih = Array.from(data[0]);
            network.who = Array.from(data[1]);
            console.log(network.wih.length);
            let result = get_max_index(network.query(read()));
            console.log("res: " + result);
            output.innerHTML = result;

        } catch (error) {
            console.error('Error loading JSON:', error);;
        }
    }

    output.style.color = "white";
}

async function button_query() {
    await queryNetwork();
}