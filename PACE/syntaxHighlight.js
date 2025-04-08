const replacers = [
       {
           regex: /"(.*?)"/g, //st2
           val: "#FFD658",
           code: "A"
       },
       {
           regex: /(\d+\.?)/g, //number
           val: " #A7C",
           code: "B"
       },
	   {
		   regex: /(\/\/.*)/g,
		   val: "gray",
		   code: "C"
	   },
       {
           regex: /\b(char|short|int|long|float|double|unsigned|void|const|static|typedef|struct|[^\s]+_t)\b/g, //keyword
           val: "#78dce8",
           code: "D"
       },
       {
           regex: /(\w[A-Za-z0-9]*)(?=\()/g, //functions
           val: "#a6e22e",
           code: "E"
       },
       {
           regex: /\b(sizeof|delete|switch|case|if|else|extern|return|for|while|break|continue|include)\b/g, //command
           val: "#E68",
           code: "F"
       },
       {
           regex: /\b(true|false|NULL|\$)(?=[^\w])/g, //literal
           val: "#ae81ff",
           code: "G"
       },
       {
           regex: /([\b\s\[\{\(])([!=]=|[!=]==|\+\+|--|&&|\|\||!|<=|>=|>>|<<|\.\.\.)(?!span)([\b\s\w])/g, //operator
           val: "#f92672",
           code: "H"
       },
    ];


String.prototype.replaceAt = function(index, length, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement.repeat(length) + this.substring(index + length);
}


function findTokens(line){
    
    var rtrnText = '0'.repeat(line.length);
    
    for(x = 0; x < replacers.length; x++){
        
        let matches = [...line.matchAll(replacers[x].regex)];
        
        matches.forEach((match) => {
            rtrnText = rtrnText.replaceAt(match.index-(match.index-line.slice(0, match.index).replaceAll('\n', '').length), match[0].length, replacers[x].code);
        });
    }
    return rtrnText;
}



function convertToCSS(line){
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
            
          for(a = 0; a < replacers.length; a++){
            
              if(line[z] == replacers[a].code){
                  rtrnString += previousColour + " " + z + "ch, " + replacers[a].val + " " + z + "ch, "; 
                  previousChar = line[z];
                  previousColour = replacers[a].val;
              }
           }
            }
        }
    }
    rtrnString += "white " + line.replaceAll('\n', '').length + "ch)";
    return rtrnString;
}
