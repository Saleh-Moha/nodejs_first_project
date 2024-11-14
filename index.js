// const { Command } = require('commander');
// const program = new Command();

// program
//   .name('test-nodejs')
//   .description('CLI to some JavaScript string utilities')
//   .version('1.8.0');

// program.parse(process.argv);

// const fs = require("node:fs");

// console.log("first")

// fs.readFile("./file.txt","utf-8",(err,data)=>{
//   console.log("data ->",data)
// })

// console.log("socend")



// const crypto = require("node:crypto")

// const start = performance.now();

// process.env.UV_THREADPOOL_SIZE=1024;

// crypto.pbkdf2('secret','salt',100000,64,'sha512',()=>{
//   console.log("time -> ",performance.now() - start)

// });
// crypto.pbkdf2('secret','salt',100000,64,'sha512',()=>{
//   console.log("time -> ",performance.now() - start)

// });
// crypto.pbkdf2('secret','salt',100000,64,'sha512',()=>{
//   console.log("time -> ",performance.now() - start)

// });
// crypto.pbkdf2('secret','salt',100000,64,'sha512',()=>{
//   console.log("time -> ",performance.now() - start)

// });
// crypto.pbkdf2('secret','salt',100000,64,'sha512',()=>{
//   console.log("time -> ",performance.now() - start)

// });
// crypto.pbkdf2('secret','salt',100000,64,'sha512',()=>{
//   console.log("time -> ",performance.now() - start);
// });



const http = require("node:http")

const server = http.createServer((req,res)=>{
  res.write("hello , world")
  res.end( )
})

server.listen(3001,()=>{
  console.log(
    "listennig on port 3001"
  );
})