String.prototype.replaceAt = function(index, length, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement.repeat(length) + this.substring(index + length);
}


function findTokens(line, regexObjs){
    var rtrnText = '0'.repeat(line.length);
    
    for(x = 0; x < regexObjs.length; x++){
        
        let matches = [...line.matchAll(regexObjs[x].regex)];
        
        matches.forEach((match) => {
            rtrnText = rtrnText.replaceAt(match.index-(match.index-line.slice(0, match.index).replaceAll('\n', '').length), match[0].length, regexObjs[x].code);
        });
    }
    return rtrnText;
}



function convertToCSS(line, regexObjs){
    let rtrnString = "linear-gradient(to right, ";
    let previousChar = "";
    let previousColour = "white";
    
    
    for(z = 0; z < line.length; z++){
        if(line[z] != previousChar){
            
            if(line[z] == 0){
                rtrnString += previousColour + " " + z + "ch, white " + z + "ch, "; 
                previousChar = "0";
                previousColour = "white";
            }else{
            
          for(a = 0; a < regexObjs.length; a++){
            
              if(line[z] == regexObjs[a].code){
                  rtrnString += previousColour + " " + z + "ch, " + regexObjs[a].val + " " + z + "ch, "; 
                  previousChar = line[z];
                  previousColour = regexObjs[a].val;
              }
           }
            }
        }
    }
    rtrnString += "white " + line.replaceAll('\n', '').length + "ch)";
    return rtrnString;
}
