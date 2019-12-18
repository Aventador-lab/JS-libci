/**
 *   ^...^
 *  <_* *_>   
 *    \_/
 *        metamask
 *         "-"   
 * 
 * Copyright (c) 2019 BAS,Aventador-lab
 * E-mail :dev@BAS.com
 * git@work:Aventador-lab/JS-libci.git
 * 
 */
'use strict'
const NO_MANAGER_INST = "need set manager contract instance."

function BasuriParser(){

}

BasuriParser.prototype.constructor = function(basManager){
  console.log('initialing BasuriParser')
  this.NoRegistedForce404 = false //if alias unfund in bas TURE will redirect default404 other will browser handle. 
  if(basManager)
    this.BasManager = basManager;

  this.lastError = null;
}

BasuriParser.prototype.setContract = function(name,contractInst){
  if(name && contractInst)this[name] = contractInst
}

BasuriParser.prototype.handleBasDns = function(searchDetails){
  this.lastError = null 
  let json = {
    "isHttb":false,
    "encodeHttbUrl":null,
    "redirectUrl":null,
    "bas":{}
  }
  if(typeof searchDetails ==='string' && searchDetails){
    json.searchUrl = searchDetails
  }else if(typeof searchDetails ==='object' && searchDetails.url){
    json.searchUrl = searchDetails.url
  }else{
    return json;
  }

  let res = this._handleParser(json.searchUrl)
  if(!res)return json;
  json = Object.assign(json,res)
  


  console.log(JSON.stringify(json,null,2))
  return json;  
}

function _handleParser(){
  let searchMatches = BasuriParser.SearchRule.exec(url);
  if(!searchMatches || searchMatches.length !=8){
    this.lastError = 'not matched searchEngine'
    return null
  }
  if(!searchMatches[3] || !searchMatches[6]){
    this.lastError = 'not httb protocol'
    return null
  }
  let r = {}
  let sDomain = searchMatches[3]
  let sParamsString = searchMatches[6]
  let enginer = BasuriParser.supportEngines.filter(en => en.domain.test(sDomain))

  if(enginer.length !=1) {
    this.lastError = 'not matched searchEngine'
    return null
  }

  r.engine = enginer[0].name 

  let params = sParamsString.split(/\&/)
    .filter(s => decodeURIComponent(s).match(enginer[0].sKey))

  if(params.length !=1){
    this.lastError = 'not matched httb protocol'
    return null    
  }

  r.bas = {}
  r.encodeHttbUrl = params[0].substring(enginer[0].keyLen)
  r.bas.decodeHttbUrl = decodeURIComponent(r.encodeHttbUrl)

  let basMatches = BasuriParser.HttbRule.exec(r.bas.decodeHttbUrl)

  if(!basMatches || basMatches.length != 8){
    this.lastError = 'not matched httb protocol'
    return null      
  }

  r.bas.alias = basMatches[3];
  r.bas.port = basMatches[4] ||''
  r.bas.path =  basMatches[5]||''
  r.bas.params = basMatches[6]||''
  r.bas.hash = basMatches[7]||''
  r.bas.ip = ""

  return r;  
}

BasuriParser.prototype.handleRedirectUrl = function(){
  let redirectUrl = "http://";
  redirectUrl += bas.ip;
  if(bas.port) redirectUrl += ":"+bas.port;
  if(bas.path) redirectUrl += "/"+bas.path;
  if(bas.params) redirectUrl += "?"+bas.params;
  if(bas.hash) redirectUrl += "#"+bas.hash;

  return redirectUrl;  
}

BasuriParser.default404 = ""
BasuriParser.SearchRule = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
BasuriParser.HttbRule = /^(?:([A-Za-z]+):)?(\/{0,3})([^?#:/]*)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
BasuriParser.supportEngines = [
  {
    "name":"google",
    "domain":/^www.google.com$/,
    "sKey":/^q=httpb:\/\/.+$/g,
    "keyLen":2
  },
  {
    "name":"baidu",
    "domain":/^www.baidu.com$/,
    "sKey":/^wd=httpb:\/\/.+$/g,
    "keyLen":3
  },
  {
    "name":"bing",
    "domain":/^[a-z]+.bing.com$/,
    "sKey":/^q=httpb:\/\/.+$/g,
    "keyLen":2
  },
  {
    "name":"sogou",
    "domain":/^www.sogou.com$/,
    "sKey":/^query=httpb:\/\/.+$/g,
    "keyLen":6
  },
  {
    "name":"360",
    "domain":/^www.so.com$/,
    "sKey":/^q=httpb:\/\/.+$/g,
    "keyLen":2
  }
]

module.exports = BasuriParser
