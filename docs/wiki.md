#





## Sources

> https://github.com/stackpath/serverless-scripting-examples/tree/master/dns-over-https


## CRX Guide
https://juejin.im/post/5b55a98ce51d4519873f57af

https://github.com/mdn/webextensions-examples

## Infura


> TEST Account: 0xFd30d2c32E6A22c2f026225f1cEeA72bFD9De865


https://ropsten.infura.io/v3/1362a998079949baaea80eb017fe1f0f

secret: 4fed2035cab14c39ae7602bc54e7f297


### 
>
curl https://ropsten.infura.io/v3/1362a998079949baaea80eb017fe1f0f \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{"jsonrpc":"2.0","method":"eth_getBalance","params": ["0xFd30d2c32E6A22c2f026225f1cEeA72bFD9De865", "latest"],"id":1}'



## source
https://stackoverflow.com/questions/54711421/call-a-smart-contract-function-using-infura


https://ethereum.stackovernet.com/cn/q/3638
const promisify = (inner) => 
  new Promise((resolve,reject) => 
    inner((err,res) =>{
      if(err){
        reject(err)
      }else{
        resolve(res)
      }
    })
  );


https://zhongsp.gitbooks.io/typescript-handbook/doc/handbook/tutorials/Gulp.html 


## Vue
https://morioh.com/p/f4f0a504d77c 

"q=httb%3A%2F%2F%E2%9D%A4&PC=U316&FORM=BESBTB&rdr=1&rdrig=734D014135B54A31B5FE58331CBC148F&ensearch=1"


//https://cn.bing.com/search?q=httpb%3A%2F%2F%E2%9D%A4&PC=U316&FORM=BESBTB&rdr=1&rdrig=734D014135B54A31B5FE58331CBC148F&ensearch=1
//https://www.baidu.com/s?ie=UTF-8&wd=httpb%3A//%E2%9D%A4.com
//https://www.baidu.com/s?ie=UTF-8&wd=httpb%3A//%E2%9D%A4.com/ok%3Faa=bb
//https://www.sogou.com/web?ie=UTF-8&query=httpb%3A%2F%2F%E2%9D%A4.oa%3Fll%3D123
//https://www.google.com/search?q=httpb%3A%2F%2F%E2%9D%A4%E6%93%A6.com%3A8090%2Fjj%3Fad%3Dbb%26jj%3Dsd%23html&oq=httpb%3A%2F%2F%E2%9D%A4%E6%93%A6.com%3A8090%2Fjj%3Fad%3Dbb%26jj%3Dsd%23html&aqs=chrome..69i57j69i58.48264j0j7&sourceid=chrome&ie=UTF-8
//https://www.so.com/s?ie=UTF-8&q=httpb%3A%2F%2F%E2%9D%A4%E6%93%A6.com%3A8090%2Fjj%3Fad%3Dbb%26jj%3Dsd%23html