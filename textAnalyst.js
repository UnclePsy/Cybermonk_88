let string = "Hello this is a testing string for testing purposes";
let regex = new RegExp(/testing/);
let regex2 = new RegExp(/Hello/);
let fusedRegex = new RegExp(regex.source+"|"+regex2.source,"ig");
fusedRegex.flags
console.dir(fusedRegex);
console.log(string.match(fusedRegex));