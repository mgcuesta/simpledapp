import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
//import messagesABI from './Messages.js';

class App extends Component {
 constructor(props) {
    super(props);
    this.state = {isConnected: false,
            sms: 'Mensaje por defecto',
            smsGet: '',
            account: '',
            contractAddress: '0x42ba982b28b43bd435d258fd4b366758d8b4d287',
            from: '0x7A05e28B361B0A6E1b528b7e186BB628B4b596Ff',
            to: '0x5ee1DCd6C0CcED39FFe44948bF1e9305716B2AA4'};
    //this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
    this.web3 = new Web3(Web3.givenProvider);
    this.handleChange = this.handleChange.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.handleGetMessage = this.handleGetMessage.bind(this);
    this.setState = this.setState.bind(this);
 }

   componentWillMount() {
// var erc20ABI = JSON.parse(fs.readFileSync(file+"DummyERC20.json"));
// var abi = erc20ABI.abi #essential
var messagesABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "messageStalingPerior",
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
        "type": "address"
      }
    ],
    "name": "lastMsgIndex",
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
        "type": "address"
      }
    ],
    "name": "keys",
    "outputs": [
      {
        "name": "key",
        "type": "string"
      },
      {
        "name": "keyType",
        "type": "string"
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
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "messages",
    "outputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "text",
        "type": "string"
      },
      {
        "name": "time",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_receiver",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_time",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "message",
        "type": "string"
      }
    ],
    "name": "NewMessage",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_key",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "_keytype",
        "type": "string"
      }
    ],
    "name": "PublicKeyUpdated",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_text",
        "type": "string"
      }
    ],
    "name": "sendMessage",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "lastIndex",
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
        "name": "_who",
        "type": "address"
      }
    ],
    "name": "getLastMessage",
    "outputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "string"
      },
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
        "name": "_who",
        "type": "address"
      },
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "getMessageByIndex",
    "outputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "string"
      },
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
        "name": "_who",
        "type": "address"
      },
      {
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "newMessage",
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
    "inputs": [
      {
        "name": "_who",
        "type": "address"
      }
    ],
    "name": "getPublicKey",
    "outputs": [
      {
        "name": "_key",
        "type": "string"
      },
      {
        "name": "_keyType",
        "type": "string"
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
        "name": "_key",
        "type": "string"
      },
      {
        "name": "_type",
        "type": "string"
      }
    ],
    "name": "setPublicKey",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]
     if(this.web3 && this.web3.eth.net.isListening().then(console.log)) {
       this.setState({isConnected: true,
       messageContract: new this.web3.eth.Contract(messagesABI, this.state.contractAddress)
       });
       //this.setState({account: this.web3.eth.getAccounts().then(function (acs) {this.state.account = acs[0]})});
//       this.web3.eth.getAccounts().then(function (acs) {
//            this.setState ( {account: acs[0]})
//       });
     }
   }

     handleChange(event) {
       this.setState({sms: event.target.value});
     }

     handleGetChange(event) {

     }

     handleNewMessage(event) {
       console.log('try to send msg: '+ this.state.sms);
       this.state.messageContract.methods.sendMessage(this.state.to, this.state.sms).send({ from: this.state.from });
       event.preventDefault();
     }

     handleGetMessage(event) {
       var m = this.state.messageContract.methods.getLastMessage(this.state.to).call()
           .then(
           function (response) {
             //alert(response)
             alert('from:' + response[0])
             alert('message:' + response[1])
             console.log ('texto: '+ response[1]);
             return response[1];
           }
           );
       event.preventDefault();
       this.setState({smsGet: m})
     }

  render() {
      return (
      <div>
        <h2>Is connected?:</h2><br/>
        {this.state.isConnected?'Connected to local node':'Not Connected'}
        <h2>Your account: </h2><br/> {this.state.account}
        <label>
          Message:
          <input type="text" value={this.state.sms} onChange={this.handleChange} />
        </label>
        <button onClick={this.handleNewMessage}> Sent Sms</button>
        <br/>
        <label>
          Message:
          <input type="text" value={this.state.smsGet} onChange={this.handleGetChange}/>
        </label>
        <button onClick={this.handleGetMessage}> Get Sms</button>

      </div>
         );
  }
}

export default App;
