console.log("js is working");

function sum(a){
    return function (b){
        return a+b
    }
}

console.log(sum(5)(7));