// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {

  let ethda , own , deployer , d1

  const eth_daddy = await ethers.getContractFactory('ETHDaddy')
  ethda = await eth_daddy.deploy('ETH DADDY' , 'ETHD')


  own = (await ethers.getSigner())

  const names = ["jack.eth", "john.eth", "henry.eth", "cobalt.eth", "oxygen.eth", "carbon.eth"]
  const costs = [tokens(10), tokens(25), tokens(15), tokens(2.5), tokens(3), tokens(1)]


  for(var i =0 ; i < names.length ; i++ ){
    d1 = await ethda.connect(own).list(names[i], costs[i])
    await d1.wait()

    console.log(`Listed Domain ${i + 1}: ${names[i]}`)
  }

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
