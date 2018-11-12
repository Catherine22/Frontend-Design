# ECMAScript
ES5: First released in 2009   
ES6, ECMAScript 2015: First released in 2015    
ES7, ECMAScript 2016: First released in 2016    
ES8, ECMAScript 2016: First released in 2017

## Navigator
- [ES5 Review](#ES5_Review)       
    - [Strict Mode](#Strict_Mode)       
- [ES6 Review](#ES6_Review)        
  - [1. JSON](#JSON)   
  - [2. Create Objects](#Create_objects)   
  - [3. Object Properties](#Object_Properties)   
  - [4. Array](#Array)   
  - [5. ```bind()```, ```call()``` and ```apply()```](#bind_call_and_apply)    
  - [6. ```var```, ```let``` and ```const```](#var_let_and_const)   
  - [7. Destructing](#Destructing)   
  - [8. Merge_String_and_variables_to_String](#Merge_String_and_variables_to_String)   
  - [9. Object Function](#Object_Function)   
  - [10. Arrow Function](#Arrow_Function)   
  - [11. ...](#Triple_dots)   
  - [12. Default Arguments](#Default_Arguments)   
  - [13. Promise](#Promise)   
  - [14. Symbol](#Symbol)        
- [Reference](#Reference)   


## ES5_Review
1. Define variables by ```var```    
2. Define function letructor by ```new```
3. ```eval```   
4. Unique variables

[ES5 example](https://github.com/Catherine22/Front-end-warm-up/tree/master/ES6/ES5.html)

### Strict_Mode
```JavaScript
'use strict';
```

## ES6_Review
### JSON   
- Convert JSON to JS objects via ```var JS_OBJECT = JSON.parse(JSON_STRING)```    
- Convert JS objects to JSON via ```var JSON_STRING = JSON.stringify(JS_OBJECT)```    

### Create_Objects    
```JavaScript
Object.create(prototype, [descriptors])
```
- ```value```: the value of the property   
- ```writable```: (false) whether or not the value can be modified    
- ```configurable```: (false) whether or not the value can be removed     
- ```enumerable```: (false)     

E.g. Create person2 with ```username```, ```age```, ```sex``` and ```title```   
```JavaScript
let person1 = {username: 'Bob', age: 20};
let person2 = Object.create(person1, {
  sex: {
    value: 'M',
    writable: true,
    enumerable: true
  },
  title: {
    value: 'chef',
    writable: true,
    configurable: true,
  }
});
```
Assign value = 'M' by ```value: 'M'```      

In ```sex```, ```writable``` is true, so we can update ```sex```    
```JavaScript
person2.sex = 'F';
```

In ```title```, ```configurable``` is true, so we can delete ```title```    
```JavaScript
delete person2.title;
```

Enum properties (```enumerable``` must be ```true```)
```JavaScript
for (let i in person2) {
  console.log(i);
  // title is not available due to enumerable = false
}
```

### Object_Properties
```JavaScript
Object.defineProperties(object, [descriptors])
```
```JavaScript
let person3 = {firstName: 'Conan', lastName: 'Bryan'};
let person4 = Object.defineProperties(person3, {
    fullName: {
        get: function() {
            return `${this.firstName} ${this.lastName}`;
            },
        set: function(data) {
            let name = data.split(' ');
            this.firstName = name[0];
            this.lastName = name[1];
            }
     }
});

console.log(person4.fullName); // Conan Bryan
person4.fullName = "Conan O'Bryan";
console.log(person4.fullName); // firstName = Conan, lastName = 'O'Bryan'
```

Call ```get``` and ```set```
```JavaScript
let person5 = {
    firstName: 'Conan',
    lastName: 'Bryan',
     get fullName () {
        return `${this.firstName} ${this.lastName}`;
        },
     set fullName (data) {
        let name = data.split(' ');
        this.firstName = name[0];
        this.lastName = name[1];
        }
 };
console.log(person5.fullName); // Conan Bryan
person5.fullName = "Conan O'Bryan";
console.log(person5.fullName); // firstName = Conan, lastName = 'O'Bryan'
```

### Array
```JavaScript
let arr = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'];
```
Array.prototype.indexOf(value)
```JavaScript
arr.indexOf('A'); // 0
```

Array.prototype.lastIndexOf(value)
```JavaScript
 arr.lastIndexOf('A'); // 4
```

Array.prototype.forEach
```JavaScript
arr.forEach(function(value, index){
    console.log(`arr[${index}] = ${value}`);
});
// arr[0] = A, arr[1] = B ...
```

**Array.prototype.map**
```JavaScript
let newArr = arr.map(function(value, index){
    return value.toLowerCase();
});
// newArr = ["a", "b", "c", "d", "a", "b", "c", "d"]
```

**Array.prototype.filter**
```JavaScript
 let newArr = arr.filter(function (value, index) {
     if(value === 'A' || value === 'C'){
         return value;
     }
 });
// newArr = ["A", "C", "A", "C"]
```

### bind_call_and_apply
**call() vs apply()**
We have 3 ways to run a function: ```func()```, ```func.call()``` and ```func.apply()```. When it comes to ```call()``` and ```apply()```, the first argument we input is used to assign to ```this```.         
For example.        
```JavaScript
let myCar = {
    typeOfCar: 'Sedan',
    colour: 'Black',
    spec: function() {
        console.log(`typeOfCar: ${this.typeOfCar}, colour: ${this.colour}`);
    },
    update: function(typeOfCar, colour) {
        this.typeOfCar = typeOfCar;
        this.colour = colour;
        console.log(`typeOfCar: ${this.typeOfCar}, colour: ${this.colour}`);
    }
};
```

To call spec function, we can      
```JavaScript
myCar.spec();
```

```JavaScript
let myCoupe = {typeOfCar: 'Sedan', colour: 'Black'};
myCar.spec.call(myCoupe);
```

```JavaScript
let myCoupe = {typeOfCar: 'Sedan', colour: 'Black'};
myCar.spec.apply(myCoupe);
```


To call update function, we can      
```JavaScript
myCar.update('Coupe', 'Blue');
```

```JavaScript
myCar.update.call(myCoupe, 'Coupe', 'Blue');
```

```JavaScript
myCar.update.apply(myCoupe, ['Coupe', 'Blue']);
```

**bind()**
We have a ```getX()``` for example,        
```JavaScript
let module = {
    x: 81,
    getX: function() {
        console.log('this', this);
        return this.x;
    }
};
module.getX(); // 81
// this {x: 81, getX: ƒ}
```

Now we create a variable retrieveX referring to getX, the getX function isn't executed yet.
```JavaScript
let retrieveX = module.getX;
retrieveX(); // undefined
// this Window {postMessage: ƒ, blur: ƒ ...}
```

```JavaScript
let boundGetX = retrieveX.bind(module);
boundGetX(); // 81
// this {x: 81, getX: ƒ}
```

bind() can be used as a callback function as well
```JavaScript
// A function letructor
function LateBloomer() {
    this.petalCount = 2;
}

LateBloomer.prototype.bloom = function () {
    // Call declare() for 5 seconds
    window.setTimeout(this.declare.bind(this), 5000);
};

LateBloomer.prototype.declare = function () {
    console.log('I am a beautiful flower with ' + this.petalCount + ' petals!');
};
```

Call ```bloom()```
```JavaScript
let flower = new LateBloomer();
flower.bloom();
```

### var_let_and_const
Example 1,
```JavaScript
console.log(aVar); // undefined
console.log(aLet); // causes ReferenceError: aLet is not defined
console.log(aConst); // causes ReferenceError: aConst is not defined
var aVar = 1;
let aLet = 2;
const aConst = 3;
```

Example 2 - A common misunderstanding   
In this case, it will pop up an alert with number 3 whatever buttons we click.    
Because ```onclick``` event is referring to a callback function.
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <button>Button1</button>
    <br>
    <button>Button2</button>
    <br>
    <button>Button3</button>
    <br>

    <script>
        let buttons = document.getElementsByTagName('button');
        for(var i=0; i<buttons.length; i++){
            var btn = buttons[i];
            btn.onclick = function() {
                alert(i);
            }
        }
    </script>
</head>
<body>

</body>
</html>
```

To fix this problem, we used to use Invoked Function Expression (IIFE), and this time, we get 0, 1, 2 for each button.
```JavaScript
for(var i=0; i<buttons.length; i++){
    var btn = buttons[i];
    (function (i) {
        btn.onclick = function() {
            alert(i);
        }
    })(i);
}
```
Or use ```let``` to fix it, we get 0, 1, 2 as well.
```JavaScript
for(let i=0; i<buttons.length; i++){
    var btn = buttons[i];
    btn.onclick = function() {
        alert(i);
    }
}
```

> ```let```
> ```let``` provides local scope （作用域） to execute a block of code.    
> In the for-loop case, for each i we just define with ```let``` owns a block scope

We use const to define a constant like ```const E = 2.71828183```.

### Destructing
Let's say we have an object
```JavaScript
let conan = {username: "Conan O'brian", age: 55, gender: 'M'};
```

Or an array, and we want to pick up some of the elements.
```JavaScript
let colours = ['red', 'yellow', 'white', 'blue'];
let [, y, , b] = colours;
console.log(y, b); // yellow, blue
```

### Merge_String_and_variables_to_String
```JavaScript
var age = 10;
console.log(`I am ${age}`);
```
### Object_Function
In the past, we define functions of an object by key word ```myfunc: function() {}```. By contrast, we can simply define a function by ```myfunc() {}``` in ES6.
```JavaScript
let myPhone = {
  colour: 'white',
  typeOfPhone: 'iPhone',

  // ES5 style
  getColour: function() {
      return this.colour;
  },

  // ES6 style
  getType() {
      return this.typeOfPhone;
  }
};
console.log(myPhone.getColour()); // white
console.log(myPhone.getType());  // iPhone
```

### Arrow_Function
```JavaScript
// No arguments
let arrowFunc1 = () => console.log('I am an arrow function');
// Single argument
let arrowFunc2 = data => console.log(data);
// Multiple arguments
let arrowFunc3 = (data1, data2) => console.log(data1, data2);
// Multiple lines
let getCircumference = (radius) => {
  const PI = 3.14;
  return 2 * radius * PI;
};
```

Callback functions
```JavaScript
let btn1 = document.getElementById('btn1');
btn1.onclick = function() {
    alert("Click btn1");
};
```
With arrow functions, we write
```JavaScript
let btn2 = document.getElementById('btn2');
btn2.onclick = () => {
    alert("Click btn2");
};
```
> **this**
In arrow functions, ```this``` refers to the object encapsulates this arrow function whereas no object wraps the arrow function, then the ```this``` of the arrow function refers to ```window```.

```JavaScript
var name = '???';

let cat = {
  name: 'Cat',
  showName1: () => {
    console.log(this, this.name);
  },
  showName2 : function() {
    console.log(this, this.name);
  }
};
cat.showName1(); // Window {postMessage: ƒ, blur: ƒ, …} "???"
cat.showName2(); // {name: "Cat", showName1: ƒ, showName2: ƒ} "Cat"

function showName1(name) {
    console.log(this, name);
}
showName2 = (name) => {
    console.log(this, name);
};
showName1('Dog'); // Window {postMessage: ƒ, blur: ƒ, …} "Dog"
showName2('Dog'); // Window {postMessage: ƒ, blur: ƒ, …} "Dog"
```

[ES6 example](https://github.com/Catherine22/Front-end-warm-up/tree/master/ES6/ES6.html)

### Triple_dots
1. Merge Array
```JavaScript
let a1 = [1, true, 's'];
let a2 = ['p', 'q', ...a1]; // ["p", "q", 1, true, "s"]

a1 = [2, 3, 4, 5];
a2 = [1, ...a1, 6]; // [1, 2, 3, 4, 5, 6]
```

2. Clone objects        

In JS, when we assign an object to another object, technically, the both objects share the same reference (address).        
That means these two objects will be updated simultaneously.

Array
```JavaScript
let a1 = [1, true, 's'];
let a3 = a1;
a3.push('######');

// a1: [1, true, "s", "######"]
// a3: [1, true, "s", "######"]
```

Object
```javascript
let state = {title: 'title', subtitle: 'subtitle'};
let newState = state;
newState.title = 'new title';

// state: {title: "title", subtitle: "new subtitle"}
// newState: {title: "title", subtitle: "new subtitle"}
```

To avoid to be manipulated by new reference a3, we use ```...``` as a key word to copy an independent object

Array
```JavaScript
let a1 = [1, true, 's'];
let a3 = [...a1];
a3.push('######');

// a1: [1, true, "s"]
// a3: [1, true, "s", "######"]
```

### Default_Arguments

Object
```javascript
let state = {title: 'title', subtitle: 'subtitle'};
let newState = {...state, subtitle: 'new subtitle', page: 5};

// state === newState: false
// state.title === newState.title: true
// state: {title: 'title', subtitle: 'subtitle'}
// newState: {title: 'title', subtitle: 'new subtitle', page: 5}
```

```JavaScript
// default gender = 'M'
function showPersonalInfo(name, gender = 'M') {
}
```

### Promise
To avoid Callback Hell    
Three states of Promise:    
- pending: initialising   
- fullfilled: success   
- rejected: fail    


E.g. Retrieve cities from https://agile-island-78787.herokuapp.com/openAPI/cities
```JavaScript
function getCities() {
  return new Promise((resolve, reject) => {
      console.log('pending...');

      let xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState === XMLHttpRequest.DONE) {
              if (xmlHttp.status === 200) {
                  // success
                  resolve({data: xmlHttp.responseText});
              } else {
                  // fail to retrieve data
                  reject({data: xmlHttp.status})
              }
          }
      };

      xmlHttp.open('GET', 'https://agile-island-78787.herokuapp.com/openAPI/cities');
      xmlHttp.send();
      console.log('request sent');
  });
}

getCities().then((response) => {
  console.log('fulfilled');
  alert(response.data);
}, (response) => {
  console.log('rejected');
  alert(`Error code: ${response.data}`);
});

// pending...
// request sent
// fulfilled or rejected
// Show a response pop-up
```

E.g. Get London id by cities API and get weather conditions with the id by weather API
```JavaScript
function connect(url) {
  // GET https://agile-island-78787.herokuapp.com/openAPI/cities
  // GET https://agile-island-78787.herokuapp.com/openAPI/weather?id=1851632
  return new Promise((resolve, reject) => {
      console.log('pending...');

      let xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function () {
          if (xmlHttp.readyState === XMLHttpRequest.DONE) {
              if (xmlHttp.status === 200) {
                  // success
                  resolve({data: xmlHttp.responseText});
              } else {
                  // fail to retrieve data
                  reject({data: xmlHttp.status})
              }
          }
      };

      xmlHttp.open('GET', url);
      xmlHttp.send();
  });
}

connect('https://agile-island-78787.herokuapp.com/openAPI/cities').then((response) => {
    console.log('fulfilled');
    let cities = JSON.parse(response.data);
    cities.forEach(function (value, index) {
        console.log(value);
        if (value.city === 'London') {
            connect(`https://agile-island-78787.herokuapp.com/openAPI/weather?id=${value.id}`)
                .then((response) => {
                    console.log('fulfilled');
                    alert(response.data);
                }, (response) => {
                    console.log('rejected');
                    alert(`Error code: ${response.data}`);
                });
        }
    });
    console.log(response.data);
}, (response) => {
    console.log('rejected');
    alert(`Error code: ${response.data}`);
});
```

### Symbol

# Reference
[尚硅谷前端HTML5视频 ECMAScript视频](https://www.bilibili.com/video/av27143015/?p=1)