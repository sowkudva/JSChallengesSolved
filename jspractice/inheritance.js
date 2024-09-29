/* TOPIC Class BASED INHERITANCE , class is a ES6 feature*/
class Person {
  // this method goes on the Person.prototype
  // this method will be shared among the different instances
  talk() {
    console.log('talking ')
  }

  // this is directly called on the class
  static speak() {
    console.log('speaking')
  }
}

const me = new Person()
const you = new Person()

me.talk() // prints talking
you.talk()

// prints speaking
Person.speak()

// errors - TypeError: me.speak is not a function
//me.speak()

// if u want to change the shared method, u have to tap into Person.prototype.talk
Person.prototype.talk = function () {
  console.log('improved talking')
}

me.talk() // prints improved talking
you.talk()

Person.speak = function () {
  console.log('imprvoved speaking')
}

// prints imprvoved speaking
Person.speak()

// above class declaration is same as the function constructor below
function Person2() {
  this.talk = function () {
    console.log('person2 talking')
  }
}

// create an instance of Person2
const newme = new Person2()
newme.talk() // prints person2 talking

Person2.talk = function () {
  console.log('improved person2 talking')
}

newme.talk() // prints person2 talking, does not change.
// this is because, when u define functions this, it becomes the class property and will not cascase

// good parctice to declare properties as this
// and add functions on prototype

class Person3 {
  constructor(age, name, gender) {
    this.age = age
    this.name = name
    this.gender = gender
  }
}

Person3.prototype.dance = function () {
  return 'person dancing'
}

const diffme = new Person3(12, 'Goat', 'F')
console.log(diffme)
console.log(diffme.dance())

/* TOPIC 2 protytpe vs __proto__*/

// every Class that is created has a prototype and methods are part of it. it conatins all the methods that the children can inherit.
// every instance gets proto object which is same as prototype of its parent.

/* TOPIC 3 Factory functions 

1) simple 
2) no duplicate code
3) data privacy 

eg: function personFactory(name){
 return { ' hello ${name} '}
 
 this creates privacy for name, u cannot edit it

*/

/*TOPIC 4: Constructor functions

1) starts with Capitol letter, function Person()
2) uses this keyword to set the proprty
3) uses new keyword to create an instance 
4) the functions are the blueprint 
5) 'this' is already created for us
*/

// function SuperElement(type, content) {
//   this.el = document.createElement(type)
//   this.el.innerText = content
//   document.body.append(el)
//   this.el.addEventListener('click', () => {
//     consolelog(this.el)
//   })
// }
// const h1 = new SuperElement('h1', 'Hello')

/* Topic 5: Factory vs Constructor 

*/

/* TOPIC 6 : this keyword

anywhere 'this' is global object called 'window'
inside a function is the 'function' scope

const mytalk = talk.bind(this, arg)
mytalk()

here you can pass the custom context pasing your own object. That becomes the the this
talk.call(thisArg, ...args)

talk.apply(thisArg, [args])

if u have a class Person and a constructor function that returns this, refers to the Person
but if u have setTimeOut inside the class, and print this, it gets the window object. 
*/
function Person200(name) {
  this.name = name
  this.talk = function () {
    console.log(this)
  }
  setTimeout(function () {
    console.log(this)
  }, 1000) // on browser this prints window obj

  setTimeout(
    function () {
      console.log(this)
    }.bind(this),
    1000
  ) // on browser this prints current Person200 onj as context since u bind with this

  setTimeout(() => {
    console.log(this)
  }, 1000) // if u change it to arrow on browser this prints current Person200 onj as context
}
const me200 = new Person200('son')
me200.talk() // prints the current context Person200 { name: 'son', talk: [Function (anonymous)] }
