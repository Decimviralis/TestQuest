var canvas = document.getElementById('universumField');
var ctx = canvas.getContext('2d');


var model = {
    timer : 0,
    cageArr : [],
    cageArrStartGame : [],

    playMapWidth :300,
    playMapHeight : 300,

    horizontalCellsCount : 30,
    verticalCellsCount : 30,

    x : 0,
    y : 0,


    stepCount : 0,

    playMap : function () {
        for (var i = 0; i < this.verticalCellsCount; i++) {
            model.cageArr[i] = [];
            for (var j = 0; j < this.horizontalCellsCount; j++) model.cageArr[i][j] = 0;
        }
    },
    upperBorderParamVerification : function (i) {
        return i===0 ? 30 : i;
    },
    lowerBorderParamVerification : function (i) {
        return i===29 ? -1 : i;
    }
};

var controller = {
    canvas:onclick = function (event) {
        model.x = event.offsetX;
        model.y = event.offsetY;
        model.x = Math.floor(model.x/10);
        model.y = Math.floor(model.y/10);
        if (model.cageArr[model.y][model.x] === 0) {
            model.cageArr[model.y][model.x] = 1;
        } else {
            model.cageArr[model.y][model.x] = 0;
        }
        view.drawPlayMap();
    },
    initPlayMap: function() {
        model.playMap();
    },
    startGame : function () {
        for (var i = 0; i < model.verticalCellsCount; i++) {
            model.cageArrStartGame[i] = [];
            for (var j = 0; j < model.horizontalCellsCount; j++) {
                var neighbour = 0;
                if (model.cageArr[model.upperBorderParamVerification(i)-1][j] === 1) neighbour++;
                if (model.cageArr[i][model.lowerBorderParamVerification(j)+1] === 1) neighbour++;
                if (model.cageArr[model.lowerBorderParamVerification(i)+1][j] === 1) neighbour++;
                if (model.cageArr[i][model.upperBorderParamVerification(j)-1] === 1) neighbour++;
                if (model.cageArr[model.upperBorderParamVerification(i)-1][model.lowerBorderParamVerification(j)+1] === 1) neighbour++;
                if (model.cageArr[model.lowerBorderParamVerification(i)+1][model.lowerBorderParamVerification(j)+1] === 1) neighbour++;
                if (model.cageArr[model.lowerBorderParamVerification(i)+1][model.upperBorderParamVerification(j)-1] === 1) neighbour++;
                if (model.cageArr[model.upperBorderParamVerification(i)-1][model.upperBorderParamVerification(j)-1] === 1) neighbour++;
                if (neighbour == 2 || neighbour == 3) model.cageArrStartGame[i][j] = 1;
                if(neighbour < 2 || neighbour > 3) model.cageArrStartGame[i][j] = 0;
            }
            console.log(neighbour);
        }
        model.cageArr = model.cageArrStartGame;
        view.drawPlayMap();
        model.stepCount++;
        document.getElementById("stepCount").innerHTML = model.stepCount.toString();
        model.timer = setTimeout(controller.startGame, 300);
    },
    stopTimer : function () {
        clearTimeout(model.timer);
    }
};

var view = {
    drawPlayMap : function () {
        ctx.clearRect(0, 0, model.playMapWidth, model.playMapHeight);
        for (var i = 0; i < model.verticalCellsCount; i++) {
            for (var j = 0; j < model.horizontalCellsCount; j++) {
                if (model.cageArr[i][j] === 1) {
                    ctx.fillRect(j * 10, i * 10, 10, 10);
                    ctx.stroke();
                } else {
                    ctx.clearRect(j * 10, i * 10, 10, 10);
                    ctx.stroke();
                }
            }
        }
    }
};

(function() {

    var app = {

        init: function () {
            controller.initPlayMap();
            this.main();
            this.event();
        },

        main: function () {

        },

        event: function () {
            var startButton = document.getElementById("start");
            startButton.onclick = controller.startGame;
            var pauseButton = document.getElementById("pause");
            pauseButton.onclick = controller.stopTimer;
        }

    };

    app.init();

}());