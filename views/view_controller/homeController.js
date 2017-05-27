var appname = angular.module('CodeBreaker', []);
appname.controller('homeController', ['$scope',
    function($scope) {

        $scope.greeting = { text: 'Hello' };

        $scope.cipherChanged = function() {
            // var output = $scope.sort($scope.printFrequencies($scope.getFrequency()), $scope.sort($scope.getFrequency()))
            $scope.printFrequencies();
            $scope.replace();
            $scope.remainingLetters = "";
            // alert($scope.showRemainingLetters)
            // alert(typeof 1)
            // alert(output)
            // alert("fdsaf")
        }

        $scope.replaceChanged = function() {
            $scope.replace();
            $scope.remainingLetters = "";
        }

        $scope.remainingLettersBtnClicked = function() {
            $scope.getRemainingLetters();
        }


        $scope.replace = function() {

    		$scope.replacedText = "";

    		let text = angular.element($('#cipher')).val();
            let replacee = $scope.replacee;
            let replacer = $scope.replacer;
            // alert(replacer)

    		// let replacee = angular.element($('#replacee')).val();
    		// let replacer = angular.element($('#replacer')).val();
            // let text = "sf"
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
            // alert(alphabet)
    		return alphabet;
    	}

	$scope.printFrequencies = function() {

		var frequencies = $scope.getFrequency();
		var alphabet = $scope.sort(frequencies);
        // alert(alphabet)
        $scope.frequenciesString = "";
		for (var i = 26 - 1; i >= 0; i--) {

			if (frequencies[i] == 0)
				continue;

			var frequency = frequencies[i];
            // alert("test" + alphabet[i])
            // alert(alphabet[i] + "\tFrequency = "+ frequency)
            $scope.frequenciesString += (alphabet[i] + "\tFrequency = " + frequency + "\n")

		}

        // alert(output)

	}

	$scope.getRemainingLetters = function() {

        // alert("remainingLetters")
        let replacer = $scope.replacer;
		var occured = Array(26).fill(false);
        $scope.remainingLetters = "";

		for (var i = 0; i < replacer.length; i++) {

			var currentChar = replacer.charAt(i);
            // alert(currentChar)
			occured[currentChar.charCodeAt(0) - "a".charCodeAt(0)] = true;

		}

		for (var i = 0; i < occured.length; i++) {

			if (!occured[i]) {
                // alert(occured)
                $scope.remainingLetters += String.fromCharCode(i + "a".charCodeAt(0));
                // alert(String.fromCharCode(i + "a".charCodeAt(0)))
			}
		}


	}

	// public static void read() throws IOException {
    //
	// 	while (true) {
	// 		String line = br.readLine();
	// 		text += line + '\n';
	// 		if (line.charAt(line.length() - 1) == '0')
	// 			break;
	// 	}
    //
	// }



    }

]);
