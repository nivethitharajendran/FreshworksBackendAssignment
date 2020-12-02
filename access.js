var { create,read,del} = require('./index');
//create a new key-value pair
var f1 = create("Sundar",20,400000);
console.log(f1);
var f2=create("Nivi",20,30000);
console.log(f2);
//invoke the read function
var f3=read("Sundar");
console.log(f3);
//invoke the delete function
var f4=del("Sundar");
console.log(f4);
//tries to read a deleted key
var f5=read("Sundar");
console.log(f5);
//tries to read the key having expired ttl
var f6=read("Nivi");
console.log(f6);


//Thread
const { Worker } = require('worker_threads') ;
  
function runService(workerData) { 
    return new Promise((resolve, reject) => { 
        const worker = new Worker( 
                './index.js', { workerData }); 
        worker.on('message', resolve); 
        worker.on('error', reject); 
        worker.on('exit', (code) => { 
            if (code !== 0) 
                reject(new Error( 
`Stopped the Worker Thread with the exit code: ${code}`)); 
        }); 
    }); 
} 
  
async function run() { 
    const result = await runService(create("Hello",10,20000)); 
    console.log(result); 
} 
  
run().catch(err => console.error(err));