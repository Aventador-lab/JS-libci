const abis = require("./contracts.js")
const parseBAS = require("./aliasparser.js")
const Web3 = require("web3")
const { web3Utils } = require("web3-utils")


const Addresses = {
	"BAS_Token":{
		"ropsten":"0x3058A7Ed6a0E15691F9e309cbe982A820928e055"
	},
	"BAS_Manager_Simple":{
		"ropsten":"0x70BACAb31f1897dAFECa711475Fa81Fe49e5e04C"
	}
}

function Basum (){
}

const network = "ropsten"

var Basum = {
	network:network,
	Token : {
		"abi":abis["BAS_Token"] || [],
		"address":Addresses.BAS_Token[network] ||""		
	},
	Manager:{
		"abi":abis["BAS_Manager_Simple"] ||[],
		"address":Addresses.BAS_Manager_Simple[network] || ""			
	},
	getWSSURI:(projectId) => {
		return `wss://${Basum.network}.infura.io/ws/v3/${projectId}`
	},
	getHttpsURI:(projectId) => {
		return `https://${Basum.network}.infura.io/v3/${projectId}`
	},
	getHttpSecURI:(projectId) => {
		return `https://:${Basum.insec}@${Basum.network}.infura.io/v3/${projectId}`
	},
	getBasInfaURI:() =>{
		return "https://ropsten.infura.io/v3/8b8db3cca50a4fcf97173b7619b1c4c3"
	},
	getContractOps:() =>{
		let addr = `${Basum.defacc}`
		return {
			from:addr,
			gasPrice:"20000000000"
		}
	}
}
Basum.defacc = "0xFd30d2c32E6A22c2f026225f1cEeA72bFD9De865"
Basum.insec = "4fed2035cab14c39ae7602bc54e7f297"
Basum.projectId = "1362a998079949baaea80eb017fe1f0f"
Basum.deps = "web3:v1.2.4"
Basum.parseBas = parseBAS

module.exports = {
	"Basum": Basum,
	"Web3":Web3,
	"web3Utils":web3Utils
}