let fs = require("fs");
const { connect } = require("http2");
let inputArr = process.argv.slice(2);

let optionsArr = [];
let filesArr = [];

for(let i = 0; i < inputArr.length; i++){
    let firstchar = inputArr[i].charAt(0);
    if(firstchar == "-"){
        optionsArr.push(inputArr[i]);
    }else{
        filesArr.push(inputArr[i]);
    }
}

for(let i = 0; i < filesArr.length; i++){
    let doesexist = fs.existsSync(filesArr[i]);
    if(doesexist == false){
        console.log("File doesn't exist");
        return;
    }
}

let content = "";
for(let i = 0; i < filesArr.length; i++){
    content = content + fs.readFileSync(filesArr[i]) + "\r\n";
}
// console.log(content);
// console.log(optionsArr);

let contentArr = content.split("\r\n");

let isSPresent = optionsArr.includes("-s");
if(isSPresent){
    for(let i = 1; i < contentArr.length; i++){
        if(contentArr[i] == "" && contentArr[i-1] == ""){
            contentArr[i] = null;
        }
        if(contentArr[i] == "" && contentArr[i-1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i = 0; i < contentArr.length; i++){
        if(contentArr[i] !== null){
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}

// console.log(contentArr.join("\n"));

let isNPresent = optionsArr.includes("-n");
if(isNPresent == true){

    if((optionsArr.indexOf("-n") < optionsArr.indexOf("-b")) || optionsArr.indexOf("-b") == -1){
        for(let i = 0; i < contentArr.length; i++){
            contentArr[i] = `${i + 1} ${contentArr[i]}`;
        }
    }
}

// console.log(contentArr.join("\n"));

let isBPresent = optionsArr.includes("-b");
if(isBPresent == true){

    if((optionsArr.indexOf("-b") < optionsArr.indexOf("-n")) || optionsArr.indexOf("-n") == -1){
        let number = 1;
        for(let i = 0; i < contentArr.length; i++){
            if(contentArr[i] != ""){
                contentArr[i] = `${number} ${contentArr[i]}`;    
                number++;
            }     
        }
    }
}

console.log(contentArr.join("\n"));
