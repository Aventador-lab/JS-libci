const abis = require("./contracts.js")
const Web3 = require("web3")
const { WebsocketProvider } = require("web3-providers")
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

var Basum = {
	network:"ropsten",
	Token : {
		"abi":abis["BAS_Token"] || [],
		"address":Addresses.BAS_Token[Basum.network] ||""		
	},
	Manager:{
		"abi":abis["BAS_Manager_Simple"] ||[],
		"address" : Addresses.BAS_Manager_Simple[Basum.network] ||""			
	},
	getWSSURI:(projectId) => {
		return `wss://${Basum.network}.infura.io/ws/v3/${projectId}`
	}
}

Basum.insec = "4fed2035cab14c39ae7602bc54e7f297"
Basum.projectId = "1362a998079949baaea80eb017fe1f0f"
Basum.deps = "web3:v1.2.4"

module.exports = {
	"Basum": Basum,
	"Web3":Web3,
	"WebsocketProvider":WebsocketProvider,
	"web3Utils":web3Utils
}