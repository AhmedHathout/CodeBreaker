var CodeBreaker = angular.module('CodeBreaker', []);
CodeBreaker.controller('homeController', ['$scope','$http',
    function($scope, $http) {


        $http.get("http://localhost:8080/user.json").then(function(response){

            $scope.user = response.data.user;

        });

        $scope.getSavedCiphers = function(username) {

            $http({
                url: '/savedCiphers',
                method: "POST",
                data: {'username': username}
            })

            .then(function(response) {
                $scope.ciphers = response.data;
            })

        }

        $scope.saveCipher = function (username, isDecrypted, encryptedTextOnly, cipher, plainText, replacee, replacer) {

            $http({
                url: '/saveCipher/substitution',
                method: "POST",
                data: {'username': username, 'isDecrypted': isDecrypted, 'encryptedTextOnly': encryptedTextOnly, 'cipher': cipher, 'plainText': plainText, 'cipherType': 'substitution', 'replacee': replacee, 'replacer': replacer}
            })
            .then(function(response) {

                $scope.isSavedSuccessfully = true;
                $scope.savingError = false;

            },
            function(response) {

                alert('failure')
                alert(response)

                $scope.isSavedSuccessfully = false;
                $scope.savingError = true;

            });

        }

        $scope.getColor = function() {
            for (var i = 0; i < $scope.replacedText.length; i++) {
                let currentChar = $scope.replacedText[i];
                if (currentChar <= 'z' && currentChar >= 'a')
                    $scope.replacedText.replace(/\#word/gi, '<span>$1</span>');
            }
            return
        };


        $scope.cipherChanged = function() {

            $scope.printFrequencies();
            $scope.replace();
            $scope.remainingLetters = "";
            $scope.isSavedSuccessfully = false;

        }

        $scope.replaceChanged = function() {

            $scope.replace();
            $scope.remainingLetters = "";
            $scope.isSavedSuccessfully = false;

        }

        $scope.replace = function() {

    		let text = $scope.cipher;
            let replacee = $scope.replacee.text;
            let replacer = $scope.replacer.text;
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
                    // let lastLetter = $scope.replacedText.charAt(i);
                    // $scope.replacedText.replaceAt(i, "<span style='color: red;'>" + lastLetter + "</span>");
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

            let replacer = $scope.replacer.text;
    		var occured = Array(26).fill(false);
            $scope.remainingLetters = "";
            console.log(replacer);
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

        $scope.switchFocus = function (field) {

            if ($scope.switchCheckBox) {
                document.getElementById(field).focus();
            }


        }

        $scope.replacee = {

            text: "",
            isFocused: false

        }

        $scope.replacer = {

            text: "",
            isFocused: false

        }

        $scope.switchCheckBox = true;

    }


]);

// CodeBreaker.filter("AddSpan", function() {
//   return function(item) {
//
//     if (item.indexOf("#word") > -1) {
//       return "<span class='x'>" + item + "</span>";
//     } else {
//       return item;
//     }
//   }
// });
