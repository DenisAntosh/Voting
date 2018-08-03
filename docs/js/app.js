App = {
	web3Provider: null,
	contracts: {},
	url: null,
	account: null,
	address: null,
	allVote: null,
	director: null,

	init: function () {
		url = "https://ropsten.infura.io/";
		return App.initWeb3();
	},

	initWeb3: function () {
		return App.initContract();
	},

	initContract: function () {
		url = "0xd3c6ebf211ede4364739713f8fdba2fd0525e624";
		App.contracts.Voting = web3.eth.contract(Voting).at(url);
		App.account = web3.eth.accounts;
		allVote = false;
		$('#account').text(App.account);
		App.listenToEvents();
	},

	initToNull: function () {
		let tx =
			{
				from: web3.eth.account,
				to: url,
				value: 0x0,
				gas: 3000000,
				gasPrice: web3.toWei(2, "gwei"),
				data: App.contracts.Voting.initToNull.getData()
			};
		web3.eth.sendTransaction(tx, function (err, res) {
			if (res) {
				console.log("Everything went good with approval");
				console.log(res);
			}
			else {
				console.log("There can be some mistakes");
			}
		});
	},

	connectFromVoting: function () {
		let tx = {
			from: web3.eth.account,
			to: url,
			value: 0x0,
			gas: 3000000,
			gasPrice: web3.toWei(2, "gwei"),
			data: App.contracts.Voting.connectFromVoting.getData()
		};

		web3.eth.sendTransaction(tx, function (err, res) {
			if (res) {
				console.log("Everything went good with approval");
				console.log(res);
			}
			else {
				console.log("There can be some mistakes");
			}
		});
	},

	nominateTheCandidacy: function () {
		let tx =
			{
				from: web3.eth.account,
				to: url,
				value: 0x0,
				gas: 3000000,
				gasPrice: web3.toWei(2, "gwei"),
				data: App.contracts.Voting.nominateTheCandidacy.getData()
			};
		web3.eth.sendTransaction(tx, function (err, res) {
			if (res) {
				console.log("Everything went good with approval");
				console.log(res);
			}
			else {
				console.log("There can be some mistakes");
			}
		});
	},

	voteFor: function () {
		App.address = $('#addressForWhomWeAreWoting').val();
		let tx = {
			from: web3.eth.account,
			to: url,
			value: 0x0,
			gas: 3000000,
			gasPrice: web3.toWei(2, "gwei"),
			data: App.contracts.Voting.voteFor.getData(App.address)
		};

		web3.eth.sendTransaction(tx, function (err, res) {
			if (res) {
				console.log("Everything went good with approval");
				console.log(res);
			}
			else {
				console.log("There can be some mistakes");
			}
		});
	},

	checkIfAllVoted: function () 
	{
		let tx = {
			from: web3.eth.account,
			to: url,
			value: 0x0,
			gas: 3000000,
			gasPrice: web3.toWei(2, "gwei"),
			data: App.contracts.Voting.everyoneVoted.getData()
		};

		web3.eth.sendTransaction(tx, function (err, res) {
			if (res) {
				console.log("Everything went good with approval");
				console.log(res);
			}
			else {
				console.log("There can be some mistakes");
			}
		});
},

	resultOfVoting: function() {
	if (allVote == true) {
		let tx = {
			from: web3.eth.account,
			to: url,
			value: 0x0,
			gas: 3000000,
			gasPrice: web3.toWei(2, "gwei"),
			data: App.contracts.Voting.resultOfVoting.getData()
		};

		web3.eth.sendTransaction(tx, function (err, res) {
			if (res) {
				console.log("Everything went good with approval");
				console.log(res);
			}
			else {
				console.log("There can be some mistakes");
			}
		});
	}
	else {
		console.log("Not all have voted");
	}
},

getDirector: function() {
	App.contracts.Voting.director.call(function (err, res) {
		if (err !== null) {
			console.log(err)
		}
		else {
			console.log(res);
			director = res;
			$('#director').text(JSON.stringify(director));
		}
	});
},

listenToEvents: function () {
	App.contracts.Voting.connection({}, {}).watch(function (error, event) {
		if (!error) {
			$("#events").append('<li class="list-group-item">' + event.args.conecter + ' connected to voting</li>');
		} else {
			console.error(error);
		}
	});

	App.contracts.Voting.nominate({}, {}).watch(function (error, event) {
		if (!error) {
			$("#events").append('<li class="list-group-item">' + event.args.nominator + ' nominated the candidacy ' + '</li>');
		} else {
			console.error(error);
		}
	});

	App.contracts.Voting.allVoted({}, {}).watch(function (error, event) {
		if (!error) {
			if (event.args.res == true) {
				$("#events").append('<li class="list-group-item"> All voted. ' + '</li>');
			}
			else {
				$("#events").append('<li class="list-group-item"> Not all voted ' + '</li>');
			}
			allVote = event.args.res;
		} else {
			console.error(error);
		}
	});

	App.contracts.Voting.voted({}, {}).watch(function (error, event) {
		if (!error) {
			$("#events").append('<li class="list-group-item">' + event.args.voter + ' voted ' + '</li>');
		} else {
			console.error(error);
		}
	});
}
};

$(function () {
	$(window).load(function () {
		App.init();
	});
});

const Voting = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "participants",
		"outputs": [
			{
				"name": "numberOfVote",
				"type": "uint256"
			},
			{
				"name": "isDirector",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "nominateTheCandidacy",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "everyoneVoted",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "director",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfEmployees",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numberOfParticipants",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "addEmployees",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "initToNull",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "resultOfVoting",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "connectFromVoting",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "addParticipants",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"name": "employees",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_participant",
				"type": "address"
			}
		],
		"name": "voteFor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "conecter",
				"type": "address"
			}
		],
		"name": "connection",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "nominator",
				"type": "address"
			}
		],
		"name": "nominate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "voter",
				"type": "address"
			}
		],
		"name": "voted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "res",
				"type": "bool"
			}
		],
		"name": "allVoted",
		"type": "event"
	}
]