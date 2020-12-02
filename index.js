var date = new Date();
var time = date.getTime();
var fs = require('fs'); 
var validator =require("validator");
var jsonsize=require("json-size");

let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);
//  console.log(data.sai);

module.exports=function(msg){
    console.log(msg);
};

//Create function
const create = function(key,value,timestamp=0) { 
    
    var check=false;

    //checks if the key is already present
    if(data.hasOwnProperty(key)){
         check=true;
    }

   if(check==true)
   {
       
       return "Key "+key+ " already exists";
   }
   else{
       //checks if the key contains only alphabets
       if(validator.isAlpha(key))
       {
            //checks the size of the file to never exceed 1 GB and also checks the size of the value to be 16KB
            if (jsonsize(data)<(1024*1020*1024)&&value<=(16*1024*1024)){

                    if(timestamp==0)
                    {
                        l={value,timestamp};
                        console.log("The key "+key+" has been created successfully");
                        }
                    else
                        {
                            var timestamp=time+timestamp;
                        l={value,timestamp};
                        console.log("The key "+key+" has been created successfully");
                        }
            
            }
            else{
            return "error: Memory limit exceeded";
                }

            //checks the size of the key
            if(key.length<=32){
                data[key]=l;

            //writes the data into the json file    
             let name = JSON.stringify(data);
             fs.writeFileSync('data.json', name);
             return data;

                }
       
        }
        else
        {
           
         return "error: Invalid key name, key name must contain only alphabets and no special characters or numbers!";
        }
    }
 };


//Read function
 const read = function(key) { 
     var check=false;
     console.log("Reading...");
    //checks if the key exists or not
     if(data.hasOwnProperty(key)){
          check=true;
     }

   
    if(check==false)
    {
        return "key "+key+ " not found";
       // return "key not found";
    }
    else{
        b=data[key];
        if(b.value!=0){
            //checks if the Time-to-Live property for a key has expired or not
            if(time<b.timestamp){
                var stri=key.toString()+":"+b.timestamp.toString(); 
                return stri; 
            }
            else{
                
                return "Can't retreive  the key "+key+" error: time-to-live of "+key+" has expired";
            }
        }
        else{
            var stri=key.toString()+":"+b.timestamp.toString();
             return stri;
        }
    }
};


const del = function(key) { 

        var check=false;
        console.log("Deleting...");
        //checks if the key exists or not
        if(data.hasOwnProperty(key)){
            check=true;
        }
    if(check==false)
    {
        return "key" +key+ " not found";
    }
    else{
        b=data[key];
        if(b.value!=0){
            //checks if the Time-to-Live property for a key has expired or not
            if(time<b.timestamp)
            {
                delete data[key];
                let name = JSON.stringify(data);
                //writes into the jsonfile
                fs.writeFileSync('data.json', name);
                return "key " +key+ " is successfully deleted";
            }
            else{
        
                return "The key to be deleted is not found, error: time-to-live of "+key+" has expired";
            }
        }
        else{
            delete data[key];
            let name = JSON.stringify(data);
                fs.writeFileSync('data.json', name);
            return "key " +key+ " is successfully deleted";
        }
    }



} ;

module.exports = {
    create,
    read,
    del, 
};