//https://cn.bing.com/search?q=httb%3A%2F%2F%E2%9D%A4&PC=U316&FORM=BESBTB&rdr=1&rdrig=734D014135B54A31B5FE58331CBC148F&ensearch=1
//https://www.baidu.com/s?ie=UTF-8&wd=httb%3A//%E2%9D%A4.com
//https://www.baidu.com/s?ie=UTF-8&wd=httb%3A//%E2%9D%A4.com/ok%3Faa=bb
//https://www.sogou.com/web?ie=UTF-8&query=httb%3A%2F%2F%E2%9D%A4.oa%3Fll%3D123
//https://www.google.com/search?q=httb%3A%2F%2F%E2%9D%A4%E6%93%A6.com%3A8090%2Fjj%3Fad%3Dbb%26jj%3Dsd%23html&oq=httb%3A%2F%2F%E2%9D%A4%E6%93%A6.com%3A8090%2Fjj%3Fad%3Dbb%26jj%3Dsd%23html&aqs=chrome..69i57j69i58.48264j0j7&sourceid=chrome&ie=UTF-8
//https://www.so.com/s?ie=UTF-8&q=httb%3A%2F%2F%E2%9D%A4%E6%93%A6.com%3A8090%2Fjj%3Fad%3Dbb%26jj%3Dsd%23html
const sEngines = [
	{
		"name":"google",
		"domain":/^www.google.com$/,
		"sKey":/^q=httb:\/\/.+$/g,
		"keyLen":2
	},
	{
		"name":"baidu",
		"domain":/^www.baidu.com$/,
		"sKey":/^wd=httb:\/\/.+$/g,
		"keyLen":3
	},
	{
		"name":"bing",
		"domain":/^[a-z]+.bing.com$/,
		"sKey":/^q=httb:\/\/.+$/g,
		"keyLen":2
	},
	{
		"name":"sogou",
		"domain":/^www.sogou.com$/,
		"sKey":/^query=httb:\/\/.+$/g,
		"keyLen":6
	},
	{
		"name":"360",
		"domain":/^www.so.com$/,
		"sKey":/^q=httb:\/\/.+$/g,
		"keyLen":2
	}
]
const bregex = /^http[s]?[a-z]{2,4}.(google.com|bing.com|baidu.com|sogou.com|so.com)\/[a-z]{1,6}\?\W*\w*/;
//https://cn.bing.com/search?q=httb%3A%2F%2F%E2%9D%A4&PC=U316&FORM=BESBTB&rdr=1&rdrig=734D014135B54A31B5FE58331CBC148F&ensearch=1

var parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
var parse_bas = /^(?:([A-Za-z]+):)?(\/{0,3})([^?#:/]*)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
let fields = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
function tt(url){
  console.log(url)
  let data = parse_url.exec(url)

  console.log(JSON.stringify(data,null,2));
}

function basParse(url){
	let json = {
		"originUrl":url,
		"isHttb":false,
		"engine":"",
		"encodeFullHttb":"",
		"redirectUrl":""
	}

	let res = praserSearch(url);
	if(res==null)return json;

	let ip = getDNS(res.bas.alias)
	res.bas.ip = ip;
	json.redirectUrl = handleRedirectUrl(res.bas)
	json.isHttb= true
	return Object.assign(json,res);
}

function getDNS(alias){
	return "1.1.1.1";
}

function handleRedirectUrl(bas){
	let url = "http://"
	url += bas.ip;
	if(bas.port)url += ":"+bas.port;
	if(bas.path)url += "/"+bas.path;
	if(bas.basParamsStr)url += "?"+bas.basParamsStr;
	if(bas.hash)url += '#'+bas.hash;
	return url;
}

/**
 * bas
 * 	alias:❤擦-_^.com
 *  ip:
 *  port:8080
 *  path:sdds/sfsdf
 *	basParamsStr: sdfsdf=sfdsdf&sfdsfs=sf
 *	hash: dllsddsfds
 */
function praserSearch(url){
	let data = parse_url.exec(url)

	if(!data||data.length!=8)return null;
	if(!data[6] ||!data[3])return null;
	let sDomain = data[3]
	let paramsStr = data[6]

	let engineType = sEngines.filter(item => item.domain.test(sDomain))

	if(engineType.length!=1)return null;

	let res = {
		"engine":engineType[0].name
		
	}

	let r = {}

	let params = paramsStr.split(/\&/)
		.filter(s => decodeURIComponent(s)
		.match(engineType[0].sKey))

	console.log(JSON.stringify(params,null,2))
	if(params.length!=1)return null;
	res.encodeFullHttb = params[0].substring(engineType[0].keyLen)
	r.fullHttb = decodeURIComponent(res.encodeFullHttb)
	console.log(r.fullHttb)
	let basArr = parse_bas.exec(r.fullHttb);
	if(!basArr||basArr.length!=8)return null;
	r.alias=basArr[3];
	r.ip="1.1.1.1"
	r.port=basArr[4]||''
	r.path=basArr[5]||''
	r.basParamsStr=basArr[6]||''
	r.hash=basArr[7]||''

	res.bas = r;

	return res;
}

function BasParserUI(url){
	let bInstance = new Basparser();
	let dets =  bInstance.parseSearchUrl(url)
	//basParse(url)
	setUI(dets)
}

function setUI(dets){
	$('.inUrl').text(dets.searchUrl)
	$('.encodeHttbUrl').text(dets.encodeHttbUrl)
	$('.isHttb').text(dets.isHttb?'true' : 'false')
	if(dets.isHttb){
		$('.searchEngine').text(dets.engine)
		$('.fullParams').text(dets.bas.params)
		$('.redirectUrl').text(dets.redirectUrl)
		$('.basAlias').text(dets.bas.alias)

		$('.basIP').text(dets.bas.ip)
		$('.fullHttb').text(dets.bas.decodeHttbUrl)
	}
}

function init(){
	let u = "https://www.baidu.com/s?ie=UTF-8&wd=httb%3A//%E2%9D%A4.com/ok%3Faa=bb";
	$('.searchUrl').val(u)
} 


!(function(document,$){
	$('#btnA').on('click',()=>{
		let url = $('.sUrl').val()
		if(url){
			tt(url);
		}
	})

	$('#btnB').on('click',()=>{
		let url = $('.subUrl').val()
		if(url){
			let deUrl = decodeURIComponent(url);
			$('.bShow').text(deUrl);
		}
	})

	$('#btnC').on('click',()=>{
		let url = $('.searchUrl').val()
		if(url){
			BasParserUI(url)
		}
	})

	$('#btnD').on('click',()=>{
		let val = $('#aliasSearch').val()
		if(val){
			let inst = new Basparser();
			inst.getDns(val,(err,address,family)=>{
				if(!err){
					$('.ipFamily').text(family)
					$('.ipAddress').text(address)
				}else{
					$('.errDns').text(err.message)
				}
			})
		}
	})

	$('#btnE').on('click',(event)=>{
		let vd = $('#domain').val()
		if(vd){
			let s = CommonUtils.base64.toBase64(vd);
			$('.encodeBase64Url').text(s)
		}
<<<<<<< HEAD
		//await test()
=======
		//test()
		//
		getBalance();
>>>>>>> a5347ee894920464ff810cf208446f68e5f557fb
		return false;
	})

	init();

})(window.document,jQuery)

<<<<<<< HEAD
=======


function test(){
	const url = 'https://dns.google.com:443/experimental'
	 
	const results = []
	const lookups = [
	  {type: 'A', name: 'google.com'},
	  {type: 'A', name: 'littlstar.com'},
	  {type: 'A', name: 'twitter.com'},
	]
	 
	for (const lookup of lookups) {
	  CommonUtils.Doh.query({url}, [lookup], (err, res) => {
	    if (err) { throw err }
	    results.push(res.answers)
	    if (results.length == lookups.length) {
	      console.log(results)
	    }
	  })
	}	
}

var web3 = new Web3(Web3.providers.HttpProvider(Web3.ropstenRPCUrl))
const basContract = new web3.eth.Contract(CommonUtils.Contracts.ABI,CommonUtils.Contracts.address);
function getBalance(){
	console.log('getBlance')
	
	basContract.methods.queryByString.call('nbs',(err,data) =>{
		if(!err){
			console.log(data)
		}else{
			console.log(err)
		}
	})

}
>>>>>>> a5347ee894920464ff810cf208446f68e5f557fb
