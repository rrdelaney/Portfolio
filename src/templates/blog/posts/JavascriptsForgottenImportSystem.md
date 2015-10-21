<meta
    title="Javascript's Forgotten Import System"
    slug="js-import-system"
    date="10/21/2015"
    tags="js,javascript,import,with"
    img="/img/blog/island.jpg">

### Javascript Objects

Javascript is an interesting language. Everything is an object that associates
a key (usually a string, or symbol) to a value. This is how you can define properties
on functions, have ES6 proxies, and more fun things. It's an awesome, interesting concept
that is undervalued.

### With

If there is a most hated-on feature of Javascript, it is defiantly `with`. When creating a
`with` block, Javascript adds the object provided to the block to the lookup-chain. The common example is

```javascript
with (Math) {
    var x = cos(PI);
    var y = sin(0);

    console.log(x, y);
}
```

Seems pretty useful, right? Well unfortunately, `with` has some unexpected consequences. Because it
imports the _entire_ object to the lookup, unintended methods such as `toString` leak into the block.
Even worse is when you use an array as the argument to with! Needless to say, being careless with `with`
leads to some very confusing code. Does a careless use mean we should deprecate the feature though?
Just because people don't free memory in C, should it have to be managed?

### Modules

JS module systems often use objects to determine things to export, using globals such as
`module.exports`. With the popularization of ES2015, we now have a fully fledged module system!
We use syntax such as `export function ...` and `export class ...` to export modules, and import
them with `import ... from ...`. This all seems very familiar though... It's like we had this feature
from the start...

Consider the following code

```javascript
var myModule = (function() {
    var module = {
        exports: Object.create(null)
    };


    // The build system should place an external file here...
    // Start of external file
    module.exports.myFunc = function() {
        console.log('hello world!');
    };

    module.exports.myVar = 7;
    // End of external file

    return module.exports;
})();
```

That creates a module from an external file! Because `module.exports` is initialized with `Object.create(null)`
rather than `{}`, it doesn't inherit anything from the `Object` prototype!

### Javascript's Old Import

Now that we have our module as a _bare_ object, `with` isn't as dangerous. The code

```javascript
with (myModule) {
    ...
}
```

only imports exactly what we intended because of the awesomeness of `Object.create`. If we can automate this
in the build system and prevent developers using `with`, it becomes less scary.
Using this way, we see the original, intended purpose of `with`. We get the same results as the new
`import`, but in a more functional, Javascript-y way.

Javascript is a small, beautiful language at its core. Although ES2015 is great in many ways, the hype
behind classes and modules is weird, because these features have existed in Javascript since the beginning.
There's just some syntactic sugar now.
