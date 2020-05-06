// -------------------BUDGET CONTROLLER------------------- //
// -------------------BUDGET CONTROLLER------------------- //
// -------------------BUDGET CONTROLLER------------------- //

var budgetController = (function(){
    
    //Private function constructor for expenses
    var Expense = function(id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    //Prototyoe which calculates percentage of the total budget used
    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100)
        } else{
             this.percentage = -1
        }
    }

    //Prototyoe which returns the percentage of the total budget used
    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }


    //Private function constructor for income
    var Income = function(id, description, value)
    {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    //Private function which calclates the sum of inc and exp
    var calculateTotal = function(type)
    {
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        })
        data.totals[type] = sum;
    }
    
    //Object containing all data
    var data = { 
        allItems:
        {
            exp:[],
            inc:[]
        },

        totals: 
        {
            exp: 0,
            inc: 0
        },

        budget:0,
        percentage: -1
    }


    //Methods which will be accessible to other controllers
    return {
        additem: function(type, des, val) {
            var newItem, ID;

            //Create New ID
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1
            } else{
                ID = 0
            }

            //Create new item based on 'inc' or 'exp' type
            if (type === 'exp'){
                newItem = new Expense(ID, des, val)
            } else if (type === 'inc'){
                newItem = new Income(ID, des, val)
            }

             //push in to new data structure
            data.allItems[type].push(newItem)
        
            //Return the new element
            return newItem;
        },

        deleteItem: function(type, id){
            var ids, index;

            //Create new array for all ids
            ids = data.allItems[type].map(function(current){
                return current.id
            })

            //get index of the clicked id
            index = ids.indexOf(id);

            //Remove the data of the id clicked
            if (index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function(){

            //Calculate total inc and exp
            calculateTotal('inc');
            calculateTotal('exp');

            //Calculate budget, inc - expenses
            if (data.totals['inc'] > 0){
                data.budget = data.totals['inc'] - data.totals['exp'];
            } else {
                data.percentage = -1;
            }
            

            //Calculate percentage of income that we spend
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100)
        },

        calculatePercentages: function(){
            
            //Caclculate percentage of whole budget used for each expense
            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            })
        },

        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(cur){
                return cur.getPercentage();
            })
            return allPerc;
        },

        getBudget: function(){
            return {
                budget: data.budget,    
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            }
        },

        test: function(){
            return console.log(data);
        }
    }
})();






// -------------------UI CONTROLLER------------------- //
// -------------------UI CONTROLLER------------------- //
// -------------------UI CONTROLLER------------------- //
var UIController = (function(){

    //Self-explanotory
    var DOMstrings = {
        inputDescription: '.add__description',
        inputType:   '.add__type',
        inputValue:  '.add__value',
        inputBtn:    '.add__btn',
        incomeList:  '.income__list',
        expenseList: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }

    var formatNumber = function(num, type){
        var numSplit;

        //Removes sign of number
        num = Math.abs(num); // 20000

        //To 2 decimal numbers
        num = num.toFixed(2); //20000.00
        numSplit = num.split('.');

        int = numSplit[0]; //20000
        if (int.length > 3){
            int = int.substr(0, int.length - 3)  + ',' + int.substr(int.length - 3, 3);
                        //20                        ,               000
        }

        dec = numSplit[1];

        type === 'exp' ? sign = '-' : sign = '+';
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    //Methods which will be accessible to other controllers
    return{
        getInput: function(){
            //Get the type, description and amount(value) which the user inputs
            return {
                type: document.querySelector(DOMstrings.inputType).value, //will either be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value:  parseFloat(document.querySelector(DOMstrings.inputValue).value)
                   };        },

        addListItem: function(obj, type){
            var element, html;

            //Create html with user values for income
            if (type === 'inc'){
                element = DOMstrings.incomeList

                html = 
                `<div class="item clearfix" id="inc-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                    <div class="right clearfix">
                        <div class="item__value">${formatNumber(obj.value, type)}</div>
                        <div class="item__delete">
                         <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                </div>
            </div>`

            } 
            //Create html with user values for expense
            else if(type === 'exp'){
                element = DOMstrings.expenseList
                
                html = 
                `
                <div class="item clearfix" id="exp-${obj.id}">
                    <div class="item__description">${obj.description}</div>
                        <div class="right clearfix">
                            <div class="item__value">${formatNumber(obj.value, type)}</div>
                        <div class="item__percentage">21%</div>
                        <div class="item__delete">
                            <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                        </div>
                    </div>
                </div>
                `
            }

            //Add newly created html to interface
            document.querySelector(element).innerHTML += html;
            
        },

        deleteListItem: function(selectorID){
            
            el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },

        clearFields: function(){
            var fields, fieldsArr;

            //Gets the description and amount inputs
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + 
            DOMstrings.inputValue);

            //Converting 'fields' in to an array
            fieldsArr = Array.prototype.slice.call(fields);

            //Looping through the array and making the values empty and refocus on desc input
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
                fieldsArr[0].focus();
            })
        },
        displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).innerHTML = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).innerHTML = formatNumber(obj.totalInc, 'inc')
            document.querySelector(DOMstrings.expenseLabel).innerHTML = formatNumber(obj.totalExp, 'exp')
 
            if (obj.percentage > 0){
                document.querySelector(DOMstrings.percentLabel).innerHTML = obj.percentage + '%';
             }else {
                document.querySelector(DOMstrings.percentLabel).innerHTML = '---';
            }
        },

        displayPercentages: function(percentages){

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            var nodeListForEach = function(list, callback){
                for (var i = 0; i < list.length; i++){
                    callback(list[i], i);
                }
            }

            nodeListForEach(fields, function(current, index){
                if(percentages[index] > 0){
                current.innerHTML = percentages[index] + '%'
                } else{
                    current.innerHTML = '---'
                }
            })
        },

        displayMonth: function(){
            var now, months, year, month;

            now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June',
             'July', 'August', 'September', 'October', 'November', 'December']

            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).innerHTML = months[month] + ' ' + year;
        },

        changedType: function(){

            var elements = document.querySelectorAll(
                DOMstrings.inputType + ',' + 
                DOMstrings.inputDescription + ',' + 
                DOMstrings.inputValue)

                var borderStyle = function(){ this.style.border = "1px red solid" }
                var borderStyleTwo = function(){ this.style.border = '1px solid #e7e7e7'}
                var borderStyleThree = function(){ this.style.border = "1px green solid" }


            if (document.querySelector(DOMstrings.inputType).value == 'exp'){

                //Change color of circled tick
                document.querySelector(DOMstrings.inputBtn).setAttribute('style', 'color:red')

                elements.forEach(function(cur){
                    cur.addEventListener('mouseover', borderStyle)
                    cur.addEventListener('mouseleave', borderStyleTwo) 
                })
            } else{
            
                //Change style of inputValue textBox
                document.querySelector(DOMstrings.inputBtn).setAttribute('style', 'color:green')

                elements.forEach(function(cur){
                    cur.addEventListener('mouseover', borderStyleThree)
                    cur.addEventListener('mouseleave', borderStyleTwo)
                })
            }
        },

        //Allow the DOMstrings to be accessible by other controllers
        getDOMstrings: function(){
            return DOMstrings;
        } }
})();





// -------------------CONTROLLER------------------- //
// -------------------CONTROLLER------------------- //
// -------------------CONTROLLER------------------- //
var controller = (function(budgetctrl, UICtrl){


//FUNCTION FOR ALL EVENT LISTENERS
var setupEventListeners = function()
{
    //Gets DOMstrings from UIController
    var DOM = UICtrl.getDOMstrings();

    //Call the ctrlAddItem function when the user clicks the input button
    document.querySelector(DOM.inputBtn).addEventListener('click', cntrlAddItem);
    
    //Call the ctrlAddItem function when the user presses enter
    document.addEventListener('keypress', function(e) {
    if(e.keyCode === 13 || event.which === 13){
        cntrlAddItem();} })

    //Delete item from list
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    //Change border color based on whether + or - is selected
    document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType)


}

//FUNCTION FOR UPDATING THE BUDGET
var updateBudget = function(){
    
    //Calculate Budget
    budgetctrl.calculateBudget();

    //Return the budget
    var budget = budgetctrl.getBudget();

    //Display the budget
    UICtrl.displayBudget(budget);
};

//FUNCTION FOR UPDATING THE PERCENTAGES
var updatePercentages = function(){

    //Calculate percentages
    budgetctrl.calculatePercentages();

    //Read percentages from budgetController
    var percentages = budgetctrl.getPercentages();

    //Update UI with new percentages
    UICtrl.displayPercentages(percentages);
}

//FUNCTION FOR ADDING ITEMS
var cntrlAddItem = function(){ 
    var input, newItem, newListItem;

    //Get the field input data
    input = UICtrl.getInput();


    if(input.description !== "" && !isNaN(input.value) !== "" && input.value > 0){

        //Add item to the budget controller
        newItem = budgetctrl.additem(input.type, input.description, input.value)

        //Add item to the UI
        newListItem = UICtrl.addListItem(newItem, input.type)

        //Clear the field input data
        UICtrl.clearFields()

        //Calculate and update the budget
        updateBudget();

        //Calculate and update percentages
        updatePercentages();
    }
}

//FUNCTION FOR DELETING ITEMS
var ctrlDeleteItem = function(event){
    var itemID, splitID, type, ID;
    
    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id
  
    if(itemID){
        splitID = itemID.split('-');
        type = splitID[0];
        ID = parseInt(splitID[1]);

        //Delete item from data structure
        budgetctrl.deleteItem(type, ID);

        //Delete item from UI
        UICtrl.deleteListItem(itemID);

        //Update Budget
        updateBudget();

        //Calculate and update percentages
        updatePercentages();
    }
}


    //INITIALISATION FUNCTION
    //Function which is called at start up
    return {
        init: function()
        {
            setupEventListeners();
            UICtrl.displayMonth();

            updateBudget({
            })
        }}


//Pass other controllers through these parenthases
})(budgetController, UIController);




//INITIALISATION FUNCTION
//Function which is called at start up
controller.init();