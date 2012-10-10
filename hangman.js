function globalIndexOf(word, letter) {
    var start = 0;
    var positions = [];
    var pos = -1;
    do {
        pos = word.indexOf(letter, start);
        if (pos > -1) {
            positions.push(pos);
            start = pos + 1;
        }
    } while (pos > -1);
    
    return positions;
}

var module = angular.module('hangmanApp', []);

module.directive('hangmankey', function () {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.click(function () {
                if (!scope.gameover) {
                    scope.testLetter(scope.letter);
                    this.disabled = true;
                };
            });
        }
    }
});

function hangmanController($scope) {
    $scope.word = "ABACATE";
    $scope.chances = 6;
    $scope.alphabet = [
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O",
        "P","Q","R","S","T","U","W","X","Y","Z"
    ];
    $scope.wrongLetters = "";
    $scope.correctLetters = 0;
    $scope.gameover = false;
    
    $scope.testLetter = function (letter) {
        var positions = globalIndexOf($scope.word, letter);
        
        if (positions.length > 0) {
            for (var i = 0; i < positions.length; i++) {
                $("#letter" + positions[i]).append(letter);
            }
            $scope.correctLetters += positions.length;
            if ($scope.correctLetters == $scope.word.length){
                $scope.gameover = true;
                alert("You win!");
            }
        }
        else {
            $scope.chances -= 1;
            $("#wrongLetters").append(letter);
            $("#body" + $scope.chances).show();
            if ($scope.chances == 0) {
                $("#answer").append("Resposta: " + $scope.word);
                $scope.gameover = true;
                alert("Game over");
            };
        };
    }
}
