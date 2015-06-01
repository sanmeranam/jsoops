#Jsoops
JavaScript oops implementation made easy now. Create your JavaScript class by inheriting from another class as simple as other OOPs programing laguage. During my JavaScript coding, I found that, JavaScript is a such a complex to implement class and use in inheritance model to beginers. 

I made an small and light weight API which will  allow to creating JavaScript class, implmenting inherinace model will be easy. Find below one sample code to create a JavaScript class.

```html
<html>
    <head>
    <script src="Jsoops.js" type="text/javascript"></script>
    </head>
    <body>
        <script type="text/javascript">
                Jsoops.defineClass('com.MyClass', {
                    init: function (name) {
                        this.name = name;
                    },
                    public: {
                        firstName:"",
                        lastName:"",
                        getFullName:function(){
                            return this.getFirstName()+" "+this.getLastName();
                        }
                    },
                    static: {
                        getIt: function () {
                            return "Got it!";
                        }
                    }
                });
                //Creating object as we do in JavaScript.
                var obRef=new com.MyClass("Test Name");
                //Setters and getters method are generated for all public members.
                obRef.setFirstName("Sameer");
                obRef.setLastName("Saha");
                //Access public methods using object reference
                alert(obRef.getFullName());
                
                //Access static methods using Class name
                alert(com.MyClass.getIt());
                //Also get the Class name from object reference.
                var cMyClass=obRef.getClass();
                alert(com.MyClass.getIt());
        </script>
    </body>
</html>
```
###Features
* Pure JavaScript API. No need to invoke third party api to use this api.
* _Namespace_ supported for class name.``Jsoops.defineClass("com.abc.MyClass",{ });``.
* Setter getter will generate for all non-function instance member of class defination.
* One line inheritance from base class by just passing base class namespace like ``extend:"BaseClassName"``.
* Get class reference from object.
* Allow to define static members directly within class defination.
* Non-native ``equals()`` and ``toString()`` implemented for easy use.

###Class Defination
Simply we can call Jsoops ```Jsoops.defineClass(sClassName,oClassDefination) ``` to create JavaScript class. All non-function members will generate getter ans setter automat
* ``sClassName`` type __String__ . Class namespace. __e.g.__ ``"com.test.MyClass"`` or ``"TestClass"``.
* ``oClassDefination`` type __object__ { }. Class definition. 
    *  ``init:function() { }`` [_optional_] Wee can implement your constructor here with you without arguments. In this block, all public members will available with ``this`` reference including setters and getters.
    *  ``public: { }`` [_optional_] We need define all instance members and member functions here. There will no change to memeber function, but for all instance member, setter getter will generate.
    *  ``static:{ }`` [_optional_] We can define our static members here, which we can access using class reference.
    * ``extend:" "`` [_optional_] This is to inherit from another base class, means all instance member will be available to inherited class.

###Inheritance
A simple example of inheritance implementation using Jsoops.
```javascript
            //Base class defination
            Jsoops.defineClass("BaseClass", {
                init: function (name) {
                    this.name = name;
                },
                public: {
                    showMe: function () {
                        alert(this.name);
                    },
                    getIt: function (SurName) {
                        this.name = SurName + this.name;
                    }
                }
            });
            //Inherited class defination 
            Jsoops.defineClass('com.MyClass', {
                
                extend:"BaseClass",
                
                init: function (age, name) {
                    BaseClass.call(this, name);//Calling base class constructor
                    this.age = age;
                },
                public: {
                    getDetails: function () {
                        return this.name + " ," + this.age;
                    },
                    getIt: function () {//Overiding base class method
                        BaseClass.prototype.getIt.apply(this, arguments);//Calling base class overide method.
                    }
                }
            });

            var obMyClass = new com.MyClass(12, 'Janat');
            alert(obMyClass instanceof com.MyClass);//true
            alert(obMyClass instanceof BaseClass);//true

            obMyClass.showMe();//Calling base class methos
```
