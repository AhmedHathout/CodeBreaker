var appname = angular.module('CodeBreaker', []);
appname.controller('homeController', ['$scope',
    function($scope) {

        $scope.cipherChanged = function() {

            $scope.printFrequencies();
            $scope.replace();
            $scope.remainingLetters = "";

        }

        $scope.replaceChanged = function() {

            $scope.replace();
            $scope.remainingLetters = "";

        }

        $scope.remainingLettersBtnClicked = function() {

            $scope.getRemainingLetters();

        }


        $scope.replace = function() {


    		let text = angular.element($('#cipher')).val();
            let replacee = $scope.replacee;
            let replacer = $scope.replacer;
            let error = false;
            $scope.showDuplicatesErrorMessage = false;
            $scope.showLengthErrorMessage = false;

            if ($scope.containsDuplicates(replacee)) {
                $scope.duplicatesError = "Duplicate(s) in the replacee field"
                $scope.showDuplicatesErrorMessage = true;
                error = true;
            }

            else if ($scope.containsDuplicates(replacer)) {
                $scope.duplicatesError = "Duplicate(s) in the replacer field"
                $scope.showDuplicatesErrorMessage = true;
                error = true;
            }

            else
                $scope.duplicatesError = "";

            if (replacer.length != replacee.length) {
                $scope.lengthError = "The 2 Strings do not have the same length";
                $scope.showLengthErrorMessage = true;
                error = true;
            }

            else {
                $scope.replacedText = "";
                $scope.lengthError = "";
            }

            if (error)
                return;

    		for (var i = 0; i < text.length; i++) {

    			var currentChar = text.charAt(i);
    			var index = $scope.getIndex(currentChar, replacee);

    			if (index != -1) {
    				$scope.replacedText += replacer.charAt(index);
    			}

    			else {
    				$scope.replacedText += currentChar;
    			}

    		}

	   }

	    $scope.getIndex = function(c, replacee) {

    		for (var i = 0; i < replacee.length; i++) {

    			if (replacee.charAt(i) == c)
    				return i;

    		}

    		return -1;
	    }

	    $scope.getFrequency = function() {

            let text = angular.element($('#cipher')).val();
    		var frequencies = Array(26).fill(0);

    		for (var i = 0; i < text.length; i++) {

    			var currentChar = text.charAt(i);

    			if (currentChar <= 'Z' && currentChar >= 'A') {
                    var index = (text.charAt(i)).charCodeAt(0) - 'A'.charCodeAt(0)
                    frequencies[index]++;
                }

    		}

            $scope.frequencies = frequencies;
    		return frequencies;

	    }

    	$scope.sort = function (frequencies) {

    		var alphabet = [];

    		for (var i = 0; i < 26; i++) {
    			alphabet[i] = String.fromCharCode('A'.charCodeAt(0) + i);
    		}

    		for (var i = 0; i < 26; i++) {

    			var currentFrequency = frequencies[i];
    			var currentChar = alphabet[i];

    			var j = i - 1;
    			for (; j >= 0; j--) {

    				if (frequencies[j] > currentFrequency) {
    					frequencies[j + 1] = frequencies[j];
    					alphabet[j + 1] = alphabet[j];
    				}

    				else
    					break;

    			}
    			frequencies[j + 1] = currentFrequency;
    			alphabet[j + 1] = currentChar;

    		}

            $scope.alphabet = alphabet;
    		return alphabet;
    	}

    	$scope.printFrequencies = function() {

    		var frequencies = $scope.getFrequency();
    		var alphabet = $scope.sort(frequencies);
            $scope.frequenciesString = "";

    		for (var i = 26 - 1; i >= 0; i--) {

    			if (frequencies[i] == 0)
    				continue;

    			var frequency = frequencies[i];
                $scope.frequenciesString += (alphabet[i] + "\tFrequency = " + frequency + "\n")

    		}


    	}

    	$scope.getRemainingLetters = function() {

            let replacer = $scope.replacer;
    		var occured = Array(26).fill(false);
            $scope.remainingLetters = "";

    		for (var i = 0; i < replacer.length; i++) {

    			var currentChar = replacer.charAt(i);
    			occured[currentChar.charCodeAt(0) - "a".charCodeAt(0)] = true;

    		}

    		for (var i = 0; i < occured.length; i++) {

    			if (!occured[i]) {
                    $scope.remainingLetters += String.fromCharCode(i + "a".charCodeAt(0));
    			}
    		}


    	}

    	$scope.containsDuplicates = function (str) {

            var occured = Array(26).fill(false);
            str = str.toLowerCase();

            for (var i = 0; i < str.length; i++) {

                var index = (str.charAt(i)).charCodeAt(0) - "a".charCodeAt(0);

                if (occured[index])
                    return true;

                else
                    occured[index] = true;

            }

            return false;

        }


    }

]);
