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

class BasuriParser{
  constructor(basManager){
    console.log('initialing BasuriParser')
    //if alias unfund in bas TURE will redirect default404 other will browser handle. 
    if(basManager)
      this.BasManager = basManager;

    this.lastError = null;    
  }

  setContract(name,contractInst){
    if(name && contractInst)this[name] = contractInst
  }

  handleURL2Details(searchDetails){
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

    let res = _handleParser.call(this,json.searchUrl)
    if(!res)return json;
    json = Object.assign(json,res)
    
    //console.log(JSON.stringify(json,null,2))
    return json;     
  }

  static handleRedirectUrl(basDetails,ip) {
    if(!basDetails || !basDetails.bas)return null;
    if(typeof ip ==='string')basDetails.bas.ip = ip;
    if(basDetails.bas.ip){
      let redirectUrl = _concatRedirectUrl(basDetails.bas)
      basDetails.redirectUrl = redirectUrl;      
    }
    return basDetails;
  }
}

function _concatRedirectUrl(bas) {
  let url = BasuriParser.schema;
  url += bas.ip;
  if(bas.port) url += ":"+bas.port;
  if(bas.path) url += "/"+bas.path;
  if(bas.params) url += "?"+bas.params;
  if(bas.hash) url += "#"+bas.hash;  

  return url;
}


function _handleParser(url){
  let searchMatches = BasuriParser.SearchRule.exec(url);
  if(!searchMatches || searchMatches.length !=8){
    this.lastError = 'not matched searchEngine'
    return null
  }
  if(!searchMatches[3] || !searchMatches[6]){
    this.lastError = 'not httpb protocol'
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
    this.lastError = 'not matched httpb protocol'
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

  r.isHttb = true

  r.bas.alias = basMatches[3];
  r.bas.port = basMatches[4] ||''
  r.bas.path =  basMatches[5]||''
  r.bas.params = basMatches[6]||''
  r.bas.hash = basMatches[7]||''
  r.bas.ip = ""

  return r;  
}

BasuriParser.forceRedirect = false;
BasuriParser.schema = "http://"
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
