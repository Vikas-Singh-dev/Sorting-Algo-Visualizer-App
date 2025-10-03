let button = document.querySelector('#colorButton');

let colors = ["skyblue" , "lightgreen" , "yellow" , "pink" , "orange" , "read" , "brown"];


button.addEventListener('click' , () => {
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    button.style.backgroundColor = randomColor;
});



// create an alert box that displays a greeting message based on current time
   
     let currentHour = new Date().getHours();

     let greeting;
     if (currentHour < 12){
        greeting = "Good Morning!!"
     }
     else if ( (currentHour >12) && (currentHour < 18)){
        greeting = "Good Afternoon!!"
     }
     else if ( (currentHour >18) && (currentHour < 21)){
        greeting = "Good Evening!!"
     }
     else{
         greeting = "Good Night!!"
     };

     alert(greeting);





// Basic Calculator
       function addNum() {
        let num1 = parseFloat(Document.getElementById('num1').value);
        let num2 = parseFloat(Document.getElementById('num2').value);
       }
        let add = num1 + num2;

       let result = document.querySelector('h3');
       result.innertext = `Result: ${add}`;
        

        
