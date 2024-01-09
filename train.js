
const input_nodes = 784;
var hidden_nodes = 150;
const output_nodes = 10;
var learning_rate = 0.1;
var epochs = 1;
var network;

var output = document.getElementById("output");

var line = document.getElementById("line");
line.style.width = 0;

//  Cookies

function setCookies() {
    localStorage.clear();
    localStorage.setItem("hNodes", ""+document.getElementById("hnodes").value);
    localStorage.setItem("wih", JSON.stringify(network.wih));
    localStorage.setItem("who", JSON.stringify(network.who));
}

function take() {
    learning_rate = document.getElementById("lr").value;
    hidden_nodes = document.getElementById("hnodes").value;
    epochs = document.getElementById("epochs").value;
    //selector = document.getElementById("file").value;
    console.log("lr: "+learning_rate+" hnodes: "+hidden_nodes+" epochs: "+epochs);
}

 // Network

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


/* Generated from Java with JSweet 3.0.0 - http://www.jsweet.org */
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.main = function (sets, qot) {
        if(!qot){

        var startTime = Date.now();
        var endTime;
        var totalTime;
        //var sets = ([]);
        endTime = /* currentTimeMillis */ Date.now();
        totalTime = endTime - startTime;
        console.info("\n\nData collected\t\ttook " + totalTime + " ms");
        console.log("Learning Rate: "+learning_rate);
        console.info("\nTraining...\t\t");
        network = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate);

        startTime = /* currentTimeMillis */ Date.now();

        var i = 0;

        const intervalID = setInterval(function() {
            // Langlaufender Code in kleinen Schritten ausführen
            console.log(i); // Zum Testen in der Konsole
            
            console.log("Epoch Nr: "+(i+1));
            let prog = ((i)/epochs)*382;
            let fin = Math.round(prog);
            line.style.width = `${fin}px`;
            console.log("FIN: "+fin);

            {
                for (var j = 0; j < /* size */ sets.length-1; j++) {
                    {
                        network.train(/* get */ sets[j]);
                    }
                    ;
                }
            }
            ;



            // Hier erfolgt die Aktualisierung der UI
            
            i++;
            if (i >= epochs) {
                clearInterval(intervalID); // Stoppe den Intervall, wenn fertig

                setTimeout(function() {
                    line.style.width = "382px";
                    endTime = /* currentTimeMillis */ Date.now();
                    totalTime = endTime - startTime;
                    console.info("took " + totalTime / 1000.0 + " s");
                    console.info("Training finished");
                    console.log(typeof(network));
                    var score = 0;
                    for (var i = 0; i < /* size */ sets.length-1; i++) {
                        {
                            if (get_max_index(network.query(/* get */ sets[i])) === /* get */ sets[i][0])
                                score++;
                        }
                        ;
                    }
                    console.info(score + " / " + /* size */ sets.length + "\t\t" + score / /* size */ sets.length);
                    output.innerHTML = score + " / " + /* size */ sets.length + "  ->  " + 100*(score/sets.length) + "%";
                    console.info("\n\n\t---   Process finished   ---");
        
                }, 50);
            }
        }, 50); // Hier wird alle 2 Sekunden ein Schritt ausgeführt


        // for (var i = 0; i < epochs; i++) {
        //     console.log("Epoch Nr: "+(i+1));
        //     let prog = (i/epochs)*252;
        //     let fin = Math.round(prog);
        //     line.style.width = `${fin}px`;
        //     console.log("FIN: "+fin);

        //     changeHTML("showPara", "Test");
        //     {
        //         for (var j = 0; j < /* size */ sets.length-1; j++) {
        //             {
        //                 network.train(/* get */ sets[j]);
        //             }
        //             ;
        //         }
        //     }
        //     ;
        // }
        }
    };
    return Main;
}());
Main["__class"] = "Main";
var NeuralNetwork = /** @class */ (function () {
    function NeuralNetwork(piN, phN, poN, plR) {
        if (this.input_nodes === undefined) {
            this.input_nodes = 0;
        }
        if (this.hidden_nodes === undefined) {
            this.hidden_nodes = 0;
        }
        if (this.output_nodes === undefined) {
            this.output_nodes = 0;
        }
        if (this.learning_rate === undefined) {
            this.learning_rate = 0;
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
        this.learning_rate = plR;
        this.wih = this.createMatrix(this.hidden_nodes, this.input_nodes);
        this.who = this.createMatrix(this.output_nodes, this.hidden_nodes);
    }
    /*private*/ NeuralNetwork.prototype.createMatrix = function (rows, cols) {
        var result = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([rows, cols]);
        for (var i = 0; i < result.length; i++) {
            {
                for (var j = 0; j < result[0].length; j++) {
                    {
                        result[i][j] = Math.random() - 0.5;
                    }
                    ;
                }
            }
            ;
        }
        return result;
    };
    NeuralNetwork.prototype.train = function (input) {
        var target = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([this.output_nodes, 1]);
        for (var index19037 = 0; index19037 < target.length; index19037++) {
            var d = target[index19037];
            {
                d[0] = 0.01;
            }
        }
        target[input[0]][0] = 0.99;
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
        var output_errors = (function (dims) { var allocate = function (dims) { if (dims.length === 0) {
            return 0;
        }
        else {
            var array = [];
            for (var i = 0; i < dims[0]; i++) {
                array.push(allocate(dims.slice(1)));
            }
            return array;
        } }; return allocate(dims); })([target.length, 1]);
        for (var i = 0; i < output_errors.length; i++) {
            {
                output_errors[i][0] = target[i][0] - this.final_outputs[i][0];
            }
            ;
        }
        var weight_dif = this.dot(this.calculateError(output_errors, this.final_outputs), this.transpose(this.hidden_outputs));
        for (var i = 0; i < this.who.length; i++) {
            {
                for (var j = 0; j < this.who[0].length; j++) {
                    {
                        this.who[i][j] += this.learning_rate * weight_dif[i][j];
                    }
                    ;
                }
            }
            ;
        }
        var hidden_errors = this.dot(this.transpose(this.who), output_errors);
        weight_dif = this.dot(this.calculateError(hidden_errors, this.hidden_outputs), this.transpose(inputs));
        for (var i = 0; i < this.wih.length; i++) {
            {
                for (var j = 0; j < this.wih[0].length; j++) {
                    {
                        this.wih[i][j] += this.learning_rate * weight_dif[i][j];
                    }
                    ;
                }
            }
            ;
        }
        setCookies();
    };
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
function runNeuralNetwork(){
    /*fetch('100.csv')
    .then(response => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(csvText => {
        // Hier hast du den Inhalt der CSV-Datei
        console.log(csvText);
        // Du kannst den Text weiter verarbeiten, z. B. in Zeilen aufteilen
        const lines = content.split('\n');
        const sets = lines.map(line => line.split(',').map(val => parseInt(val)));
        Main.main(sets);
        // Verarbeite jede Zeile weiter
        lines.forEach(line => {
        const values = line.split(',');
        console.log(values);
        // Hier kannst du die Werte der Zeile verarbeiten
        });
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });*/
    
    
    
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;
            const lines = content.split('\n');
            const sets = lines.map(line => line.split(',').map(val => parseInt(val)));
            console.log(sets.length);
            Main.main(sets, 0);
        };
        reader.readAsText(file);
    }
}

function test() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const content = event.target.result;
            const lines = content.split('\n');
            const sets = lines.map(line => line.split(',').map(val => parseInt(val)));
            console.log(sets.length);

            network = new NeuralNetwork(input_nodes, hidden_nodes, output_nodes, learning_rate);
            Main.main(sets, 1);
        };
        reader.readAsText(file);
    }
}