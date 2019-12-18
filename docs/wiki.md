#





## Sources

> https://github.com/stackpath/serverless-scripting-examples/tree/master/dns-over-https


## CRX Guide
https://juejin.im/post/5b55a98ce51d4519873f57af



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