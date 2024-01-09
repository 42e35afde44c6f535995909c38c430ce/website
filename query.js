//  Draw

const container = document.querySelector('.container');
const sizeEl = document.querySelector('.size');
const color = document.getElementById('C-input');
const resetBtn = document.getElementById('reset');

var output = document.getElementById("query-output");
var self = document.getElementById("self");
var pre = document.getElementById("pre");

// Getting the value of the size input
let size = 28;
let draw = false;

function create(size) {
    console.log("Creating Grid...");
  // Updating the --size CSS variable
  container.style.setProperty('--size', size);
  for (let i = 0; i < size * size; i++) {
    const div = document.createElement('div');
    div.classList.add('pixel');

    div.addEventListener('mouseover', function(){
        if(!draw) return
        div.style.backgroundColor = color.value;
    });
    div.addEventListener('mousedown', function(){
        // We don't need to check if draw is true here
        // because if we click on a pixel that means we want to draw that pixel
        div.style.backgroundColor = color.value;
        console.log("mouse down");
    });

    container.appendChild(div);
  }
}

create(size);

window.addEventListener('mouseup', function(){
    draw = false;
});

window.addEventListener('mousedown', function(){
    draw = true;
});

function reset(){
    container.innerHTML = '';
    create(size);
}

function read(){
    var set =[0];
    var test = container.children;
    for(let i = 0; i < test.length; i++){
        if(test[i].style.backgroundColor == ''){
            set.push(0);
        } else{
            set.push(255);
        }
    }
    return set;
}

var NeuralNetwork = /** @class */ (function () {
    function NeuralNetwork(piN, phN, poN) {
        if (this.input_nodes === undefined) {
            this.input_nodes = 0;
        }
        if (this.hidden_nodes === undefined) {
            this.hidden_nodes = 0;
        }
        if (this.output_nodes === undefined) {
            this.output_nodes = 0;
        }
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
        this.input_nodes = piN;
        this.hidden_nodes = phN;
        this.output_nodes = poN;
    }
    /*private*/ NeuralNetwork.prototype.calculateError = function (errors, outputs) {
        var result = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([errors.length, 1]);
        for (var i = 0; i < result.length; i++) {
            {
                result[i][0] = errors[i][0] * outputs[i][0] * (1 - outputs[i][0]);
            }
            ;
        }
        return result;
    };
    NeuralNetwork.prototype.query = function (input) {
        var inputs = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([input.length - 1, 1]);
        for (var i = 1; i < input.length; i++) {
            {
                inputs[i - 1][0] = 0.9 * input[i] / 255.0 + 0.01;
            }
            ;
        }
        this.calculate(inputs);
        var result = (function (s) { var a = []; while (s-- > 0)
            a.push(0); return a; })(this.final_outputs.length);
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
        var result = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([rowsA, colsB]);
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
        var result = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([matrix[0].length, matrix.length]);
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
    /*private*/ NeuralNetwork.prototype.gf1 = function (mue, sigma, y, sgn) {
        var result = mue + sigma * Math.sqrt(-2.0 * Math.log(sigma * y * Math.sqrt(2.0 * Math.PI)));
        if (sgn)
            return result;
        return -1 * result;
    };
    NeuralNetwork.count = 0;
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

function queryNetwork() {
    if(self.checked){
        console.log("self selected");
        var test = localStorage.getItem("hNodes");
        var network = new NeuralNetwork(784, test, 10);
        network.wih = JSON.parse(localStorage.getItem("wih"));
        network.who = JSON.parse(localStorage.getItem("who"));
        
        let result = get_max_index(network.query(read()));
        console.log("res: "+result);
        output.innerHTML = result;
    } else if(pre.checked){
        console.log("pre selected");
    }
}