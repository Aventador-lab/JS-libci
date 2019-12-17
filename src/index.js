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

const Basparser = require('./lib/utils/basparser.js')
const punycode = require('punycode')
const base64Url = require('base64url')

const httpDns = require('http-dns')
const Doh = require('dns-over-http')
const chromeDns = require('chrome-dns')

const { Basum, Web3, WebsocketProvider, web3Utils} = require('./lib/basether/index.js')

const wsUrl = Basum.getWSSURI(Basum.projectId)
console.log(wsUrl);
const _web3 = new Web3(new WebsocketProvider(wsUrl))
if(web3){web3 = _web3;}

global.web3 = _web3;
global.BasManager = new web3.eth.Contract(Basum.Manager.abi,Basum.Manager.address)

global.CommonUtils = {
  "punycode":punycode,
  "base64":base64Url,
  "basum":Basum,
  "web3Utils":web3Utils
}

global.Basparser = Basparser

