const contract_abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "add_candidate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "add_voter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "vot_email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "voting_process",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "all_email",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "can_count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "can_list",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "ID",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "vote_count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "result",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "vot_list",
		"outputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "voted",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "voter_count",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract_address = '0xF350D11FF35425Fc2b0fe2CFa53afF79182E4AD2' ;

const accou = "0x43496721633d9Fc6c3627610C7f1c7d4C93E0Ff5";

// const NameContract;

var App = {

    dep : async ()=>{

        const Web3 = require ('web3');

        web3 = new Web3(new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545"));

        App.NameContract = new web3.eth.Contract(contract_abi, contract_address);

        //console.log(App.NameContract);
        /*
        web3.eth.getCoinbase(function(err,account){
            if (err == null){
                App.account = account;
                console.log(App.account);
            }
        })
        */
        // await App.NameContract.methods.add_voter("me").send({from: accou});

        // console.log(await App.NameContract.methods.vot_list('aa').call())

        //await App.NameContract.methods.add_candidate("dd").send({from: accou,gas:3000000});
        
        console.log("contract deployed")

    },

    add_Voter : async (_email) => {

        await App.NameContract.methods.add_voter(_email).send({from: accou,gas:3000000});
        
        console.log("voter added");
    },

    add_Candidate : async (_email) => {

        await App.NameContract.methods.add_candidate(_email).send({from: accou,gas:3000000});
        
        console.log("candidate added");
    },

    vote_can : async (_sender,_email) => {

        await App.NameContract.methods.voting_process(_sender,_email).send({from: accou,gas:3000000});
        
        console.log("voting done");
    },
    
    result : async () => {

        ele_result = await App.NameContract.methods.result().call()
    
        console.log(ele_result)

        return (ele_result);

    }

};

module.exports = App;