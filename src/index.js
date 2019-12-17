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
<<<<<<< HEAD
const httpDns = require('http-dns')
const Doh = require('dns-over-http')
const chromeDns = require('chrome-dns')
//const Dohs = require('dns-over-https')
=======
const ABI = require('./lib/abimanager.js')
global.Web3 = require('web3')

global.Web3.InfuraPri="4fed2035cab14c39ae7602bc54e7f297"
global.Web3.ropstenRPCUrl = "https://ropsten.infura.io/v3/1362a998079949baaea80eb017fe1f0f"
// const dns = require('dns')
// const httpDns = require('http-dns')
// const Doh = require('dns-over-http')
>>>>>>> a5347ee894920464ff810cf208446f68e5f557fb


global.CommonUtils = {
  "punycode":punycode,
  "base64":base64Url,
  "Contracts":{
    ABI : ABI.BAS_Manager_Simple,
    address: "0x70BACAb31f1897dAFECa711475Fa81Fe49e5e04C"
  }
}

global.Basparser = Basparser

