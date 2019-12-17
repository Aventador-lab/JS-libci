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
 * 
 */
'use strict'
const dns = require('chrome-dns')

class BasexerParser {
  constructor(){
    console.log('init>',new Date().toString(),BasexerParser.SearchRule)
    
    this.lastError = null;
  }



  /**
   * @DateTime 2019-12-13
   * @param    {[type]}   searchUrl [description]
   * @return   {json}             [searchUrl,isHttb,encodeHttbUrl]
   */
  parseSearchUrl(searchDetails) {

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
    
    json.bas.ip = this.getDefaultDns(json.bas.alias);

    if(!json.bas.ip){
       this.lastError = 'dns not fund'
      return json    
    }
    json.isHttb = true
    json.redirectUrl = this._handleRedirect(json.bas);

    console.log(JSON.stringify(json,null,2))
    return json;
  }

  getDefaultDns(alias){
    return "104.238.165.23";
  }

  getDns(alias,callback){
    dns.lookup(alias,callback);
  }

  _handleParser(url){
    let searchMatches = BasexerParser.SearchRule.exec(url);
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
    let enginer = BasexerParser.supportEngines.filter(en => en.domain.test(sDomain))

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

    let basMatches = BasexerParser.HttbRule.exec(r.bas.decodeHttbUrl)

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

  _handleRedirect(bas){
    let redirectUrl = "http://";
    redirectUrl += bas.ip;
    if(bas.port) redirectUrl += ":"+bas.port;
    if(bas.path) redirectUrl += "/"+bas.path;
    if(bas.params) redirectUrl += "?"+bas.params;
    if(bas.hash) redirectUrl += "#"+bas.hash;

    return redirectUrl;
  }
}

BasexerParser.SearchRule = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
BasexerParser.HttbRule = /^(?:([A-Za-z]+):)?(\/{0,3})([^?#:/]*)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/
BasexerParser.supportEngines = [
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


module.exports = BasexerParser