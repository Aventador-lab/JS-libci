/**
 *   ^...^
 *  <_* *_>   
 *    \_/
 *        metamask
 *         "-"   
 * 
 * Copyright (c) 2019 FCEV,Aventador-lab
 * E-mail :dev@FCEV.com
 * git@work:Aventador-lab/JS-libci.git
 * https://ropsten.infura.io/v3/1362a998079949baaea80eb017fe1f0f
 * 
 */
'use strict'
const Verion = "1.0.0"; 

// const Basparser = require('./lib/utils/basparser.js')
const punycode = require('punycode')
const base64Url = require('base64url')

// const httpDns = require('http-dns')
// const Doh = require('dns-over-http')
// const chromeDns = require('chrome-dns')

const { BasuriParser,Basum, Web3} = require('./lib/basether/index.js')


let opts = Basum.getContractOps()
// if(window && window.web3) {
//   window.web3 = _web3
// }
// global.web3 = _web3
// global.BasManager = new _web3.eth.Contract(Basum.Manager.abi,Basum.Manager.address,opts)
// global.BasToken = new _web3.eth.Contract(Basum.Token.abi,Basum.Token.address,opts)

async function initBasManager (_web3){
  global.BasManager = await new _web3.eth.Contract(Basum.Manager.abi,Basum.Manager.address,opts)
  global.BasparserInst = new BasuriParser(BasManager)
  return global.BasManager 
}

async function initWeb3(){
  const wsUrl = Basum.getWSSURI(Basum.projectId)
  const inUrl = Basum.getHttpSecURI(Basum.projectId)
  const basUrl = Basum.getBasInfaURI()
  console.log(wsUrl,"-",inUrl,'-',basUrl);  

  let _web3 = null;
  if(window&&window.ethereum && window.web3){
    window.web3 = _web3 = await new Web3(window.web3.currentProvider)
  }else{
    global.web3 = _web3 = await new Web3(new Web3.providers.HttpProvider(basUrl));
  }
  return initBasManager(_web3);
}

//initWeb3()

global.Web3 = Web3
//console.log(">>> initial complete");
global.CommonUtils = {
  "punycode":punycode,
  "base64":base64Url,
  "Basum":Basum,
  "UriParser":BasuriParser
}



