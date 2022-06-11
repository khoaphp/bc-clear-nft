const web3 = new Web3(window.ethereum);
var currentAccount = null;

const XENG_Address = "0x02625Ee1202D2bF3988Ea5E9af69148324bb7Ef3";
const XENG_ABI =[{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"symbol","type":"string"},{"internalType":"uint256","name":"amount","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
const XENG_Contract = web3.eth.Contract(XENG_ABI, XENG_Address);
console.log(XENG_Contract);

const HERO_Address = "0x4eEAcBfBa252e2F39f9E2f4eA8f9C47D5DA3b65e";


var price_token_per_hero = 1000;

$(document).ready(function(){
    check_Metamask();
});

function BuyHeroByXENG_Approve(amount){
    var totalXeng = amount * price_token_per_hero;
    XENG_Contract.methods.approve(HERO_Address, totalXeng+ "000000000000000000").send({
        from:currentAccount,
        value:0
    }, (err, res)=>{
        if(err){
            console.log(err);
            // call unity to close waiting screen
        }else{
            console.log(res);
        }
    });

}

function LoginMetaMask(){
    connect_Metamask().then((data)=>{
        currentAccount = data[0];
        web3.eth.net.getId().then((networkId)=>{
            if(networkId!=97){
                alert("Wrong network, please connect BSC Testnet.");
            }else{
                var randS = "Your secret keywords: " + randomString(50);
                web3.eth.personal.sign(randS, currentAccount, (err, sign)=>{
                    if(err){
                        alert("Sign error");
                        window.location="./";
                    }else{
                        console.log(randS);
                        console.log(sign);

                        unityInstance.SendMessage("Canvas","setupAccountFromMetamask", currentAccount+"_"+randS+"_"+sign);
                        //unityInstance.SendMessage("WaitingScreen","setupAccountFromMetamask",currentAccount+"_"+randS+"_"+sign);
                    }
                });
            }
        });
    });
}

async function connect_Metamask(){
    const accounts = ethereum.request({method:"eth_requestAccounts"});
    return accounts;
}

function check_Metamask(){
    if(typeof window.ethereum !== "undefined"){
        console.log("MM is okay");
    }else{
        console.log("MM is not installed.");
    }
}

function randomString(stringLength){
    var arr = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3","4","5","6", "7", "8", "9"];
    var result = "";
    for(var count=0; count<stringLength; count++){
        result += arr[Math.floor(Math.random()*arr.length)];
    }
    return result;
}