(function($){
    'use strict';
    
    $("#leftInput").on("keyup", function(){
       if (ValidateInputs($(this).val(), "leftInput")){
           $("#leftInput-notification").remove();
       }
    });
    
    $("#rightInput").on("keyup", function(){
       if (ValidateInputs($(this).val(), "rightInput")){
           $("#rightInput-notification").remove();
       }
    });
    
    $("#convertBtn").on("click", function(){
        
        // The rule :
        // - if the left input has a valid value we perform the operation immediately.
        // - if the right input has a value and the left input is empty we make revrse operation.
        // - if one of the inputs is invalid then we won't do any operation.
        // - if both inputs are invalid we don't do anything also.
        
        var _InputsValue = [
            { val : $("#leftInput").val(), name  : "leftInput"}, 
            { val : $("#rightInput").val(), name  : "rightInput" } 
        ];
        
        if (ValidateInputs(_InputsValue[0].val, _InputsValue[0].name)){
            $("#rightInput").val(parseInt($("#leftInput").val(), parseInt($("input[name=leftBase]:checked").val())).toString(parseInt($("input[name=rightBase]:checked").val())));
        } else if (_InputsValue[0].val == "" && ValidateInputs(_InputsValue[1].val, _InputsValue[1].name) ){
            $("#leftInput").val(parseInt($("#rightInput").val(), parseInt($("input[name=rightBase]:checked").val())).toString(parseInt($("input[name=leftBase]:checked").val())));
        } else if (!ValidateInputs(_InputsValue[0].val, _InputsValue[0].name && !ValidateInputs(_InputsValue[1].val, _InputsValue[1].name))){
            
        }
        
    })
    
    var _ValidInpus = {leftInput : true, rightInput : true};
   
   /**
     * Validate inputs.
     *
     */
    function ValidateInputs(val, id){
        var _Valid = RegExp(/^[0-9aAbBcCdDeEfE]+$/);
        
        if (_Valid.test(val)){
            _ValidInpus[id] = true;
            return val;
        } else if (_ValidInpus[id]) {
            _ValidInpus[id] = false;
            ShowNotifications($("#notifications"), "should be a number!", "danger", id);
        }
        
        return NaN;
    }
    
    
    function ExecuteOperation(codeOps, val){
        return DecToBin(val);
    }
    
    /**
     * 
     * Show notifications in a specific place.
     *
     */
    function ShowNotifications(container, message, type, relatedto){
        var _NotificationTypes = ["warning", "danger", "success", "info"];
        
        if (Array.prototype.indexOf(type, _NotificationTypes)){
            container.append(
                '<p role="alert" class="notification bg-' + type + '" id ="' + relatedto + '-notification"><strong>' +
                type + '</strong> : <i>' + (relatedto == "leftInput" ? "Left Input" : "Right Input") + '</i>, ' + message + '!</p>'
            )
        }
    }
    
    /**
     * Convert a Decimal to a binary number.
     *
     */
    function DecToBin(number){
        var result = "";
        console.log("inside DecToBin : ", number);
        for (var i = number; i > 0; i = Math.floor(i / 2)){
            // console.log(" i = " + i + " i #")
            result = (i % 2).toString() + result;
        }
        
        console.log("inside DecToBin : ", result);
        
        return result;
    }
    
    /**
     * Convert a decimal to binary number using recursion.
     *
     */
    function DecToBinRec(number){
        if ( number == 0) {
            return '';
        } else {
            return DecToBinRec(Math.floor(number / 2)) + (number % 2).toString();
        }
    }
    
    
    
    
})(window.jQuery);