import { useEffect, useState } from "react"
import Web3 from "web3"

const RebateTreasuryABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"DENOMINATOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Tomb","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"TombOracle","outputs":[{"internalType":"contract IOracle","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"Treasury","outputs":[{"internalType":"contract ITreasury","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WFTM","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"assets","outputs":[{"internalType":"bool","name":"isAdded","type":"bool"},{"internalType":"uint256","name":"multiplier","type":"uint256"},{"internalType":"address","name":"oracle","type":"address"},{"internalType":"bool","name":"isLP","type":"bool"},{"internalType":"address","name":"pair","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"bond","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"bondFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bondThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"bondVesting","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buybackAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"call","outputs":[{"internalType":"bytes","name":"","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"claimableTomb","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getBondPremium","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"getTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTombPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getTombReturn","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastBuyback","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address[]","name":"tokens","type":"address[]"}],"name":"redeemAssetsForBuyback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"secondaryFactor","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"secondaryThreshold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"bool","name":"isAdded","type":"bool"},{"internalType":"uint256","name":"multiplier","type":"uint256"},{"internalType":"address","name":"oracle","type":"address"},{"internalType":"bool","name":"isLP","type":"bool"},{"internalType":"address","name":"pair","type":"address"}],"name":"setAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"primaryThreshold","type":"uint256"},{"internalType":"uint256","name":"primaryFactor","type":"uint256"},{"internalType":"uint256","name":"secondThreshold","type":"uint256"},{"internalType":"uint256","name":"secondFactor","type":"uint256"},{"internalType":"uint256","name":"vestingPeriod","type":"uint256"}],"name":"setBondParameters","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tomb","type":"address"}],"name":"setTomb","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"oracle","type":"address"}],"name":"setTombOracle","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"treasury","type":"address"}],"name":"setTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"totalVested","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"vesting","outputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"period","type":"uint256"},{"internalType":"uint256","name":"end","type":"uint256"},{"internalType":"uint256","name":"claimed","type":"uint256"},{"internalType":"uint256","name":"lastClaimed","type":"uint256"}],"stateMutability":"view","type":"function"}]
const ERC20ABI = [{ "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "owner", "type": "address" }, { "indexed": true, "name": "spender", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" } ], "name": "Transfer", "type": "event" } ]

const web3 = new Web3("https://rpc.ftm.tools")
const RebateTreasury = new web3.eth.Contract(RebateTreasuryABI, "0x8f555E00ea0FAc871b3Aa70C015915dB094E7f88")
const Threeomb = new web3.eth.Contract(ERC20ABI, "0x14DEf7584A6c52f470Ca4F4b9671056b22f4FfDE")

const assetList = [
    "0xc54A1684fD1bef1f077a336E6be4Bd9a3096a6Ca", // 2shares
    "0x6398ACBBAB2561553a9e458Ab67dCFbD58944e52", // 2shares/FTM LP
    "0x83A52eff2E9D112E9B022399A9fD22a9DB7d33Ae", // 3omb/wftm
    "0x6437ADAC543583C4b31Bf0323A0870430F5CC2e7", //3shares
    "0xd352daC95a91AfeFb112DBBB3463ccfA5EC15b65", //3shares/wftm
]

function useRebateTreasury() {

    const [ tombPrice, setTombPrice ] = useState(0)
    const [ tombAvailable, setTombAvailable ] = useState(0)
    const [ bondPremium, setBondPremium ] = useState(0)
    const [ bondVesting, setBondVesting ] = useState(0)
    const [ assets, setAssets ] = useState(assetList.map(asset => ({
        token: asset,
        params: {
            multiplier: 0,
            isLP: false
        },
        price: 0
    })))

    async function update() {
        const [
            tombPrice,
            tombBalance,
            vestedTomb,
            bondPremium,
            bondVesting,
            assetParams,
            assetPrices
        ] = await Promise.all([
            RebateTreasury.methods.getTombPrice().call(),
            Threeomb.methods.balanceOf(RebateTreasury._address).call(),
            RebateTreasury.methods.totalVested().call(),
            RebateTreasury.methods.getBondPremium().call(),
            RebateTreasury.methods.bondVesting().call(),
            Promise.all(assetList.map(asset => RebateTreasury.methods.assets(asset).call())),
            Promise.all(assetList.map(asset => RebateTreasury.methods.getTokenPrice(asset).call()))
        ])

        setTombPrice(+web3.utils.fromWei(tombPrice))
        setTombAvailable(+web3.utils.fromWei(tombBalance) - +web3.utils.fromWei(vestedTomb))
        setBondPremium(+bondPremium / 10000)
        setBondVesting(+bondVesting / 10000)

        const assets = []
        for (let a = 0; a < assetList.length; a ++) {
            assets.push({
                token: assetList[a],
                params: {
                    multiplier: assetParams[a].multiplier,
                    isLP: assetParams[a].isLP
                },
                price: +web3.utils.fromWei(assetPrices[a])
            })
        }
        setAssets(assets)
    }

    useEffect(() => {
        update()
        const interval = setInterval(update, 10000)
        return () => clearInterval(interval)
    }, [])

    return {
        RebateTreasury,
        tombPrice,
        bondPremium,
        bondVesting,
        tombAvailable,
        assets
    }
}

export default useRebateTreasury