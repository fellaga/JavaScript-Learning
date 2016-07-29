(function($){
    'use strict';
    
    
    $(document).ready(function(){
         $(document).on('keyup', "#operand1, #operand2", function(){
             OperandValidator($(this).val(), $(this).attr("id"));
         } );
         
         // operations
         $(document).on("click", "#addition, #substraction, #multiplication, #division", function(){
            var result = Calculation(
                     OperandValidator($("#operand1").val(), "operand1"),
                     OperandValidator($("#operand2").val(), "operand2"),
                     $(this).data('ops')
                );
            $("#result-screen").append(
                '<div class="input-group results"><span class="input-group-addon"><strong>' + $(this).data('ops') + 
                '</strong></span><input type="text" class="form-control" readonly value="' + result + '" />' +
                '</div>'
            );
            
         });
    });
    
    $(document).on('click', '#refresh-results', function(){
       $("#result-screen").children().remove(); 
       $("#operand1").val("");
       $("#operand2").val("");
    });
   
    
    var _AllValide = {
        operand1 : true, 
        operand2 : true
        
    };
    
    function Calculation(op1, op2, ops){
        switch(ops){
            case "+":
                return parseFloat(op1) + parseFloat(op2);
            case "-":
                return parseFloat(op1) - parseFloat(op2);
            case "x":
                return parseFloat(op1) * parseFloat(op2);
            case "/":
                return parseFloat(op1) / parseFloat(op2);
            default:
                return false;
        }
    }
    
    /**
     * Validatte the operands entered by the user.
     *
     */
    function OperandValidator(operand, id){
        var validPattern = new RegExp(/^[0-9]+$/);
        
        if (!validPattern.test(operand) && _AllValide[id]){
            _AllValide[id] = false;
            ShowNotifications($("#notifications"), "The operand must be a squance of numbers!", "danger", id);
            DisableEnableOperations(true);
        } else if (validPattern.test(operand) || _AllValide[id]) {
            _AllValide[id] = true;
            $("#" + id + "-notification").remove();
            DisableEnableOperations(false);
            return operand
        }
    }
    
    function DisableEnableOperations(switcher){
        $("#addition").prop('disabled', switcher);
        $("#substraction").prop('disabled', switcher);
        $("#multiplication").prop('disabled', switcher);
        $("#division").prop('disabled', switcher);
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
                type + '</strong> : <i>' + relatedto + '</i>, ' + message + '!</p>'
            )
        }
    }
    
})(window.jQuery);