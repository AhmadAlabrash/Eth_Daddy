const { expect } = require("chai")
const { ethers } = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

describe("ETHDaddy", async() =>  {
  let ethda , own , deployer , d1

  

  beforeEach('Deploy contract ...' , async()=>{

   const eth_daddy = await ethers.getContractFactory('ETHDaddy')
   ethda = await eth_daddy.deploy('ETH DADDY' , 'ETHD')


   own = (await ethers.getSigner())
   signers = await ethers.getSigners();
   deployer = signers[1]

   d1 = await ethda.connect(own).list('jack.eth', tokens(10))
   await d1.wait()

   d1_get = await ethda.getDom(0);
   
   


  })

  describe('checks variables ....', ()=> {

    it('check name ...' , async() => {

      const nam = await ethda.name()
      expect(nam).to.equal('ETH DADDY')
      //await console.log(deployer)
  
    })
  
    it('check symbol ...' ,async ()=> {
  
      const syb = await ethda.symbol()
      expect(syb).to.equal('ETHD')
  
    } )

    it('check owner ... ', async() => {

      const own2 = await ethda.owner();
      expect(own2).to.equal(own.address)
      
    })


  })

  describe('list domains here ...' , async () => {
    it('list a jack.eth ...' , async ()=> {
      
      dom1 = await ethda.domains(0)
      console.log(dom1)
      expect(dom1.name).to.be.equal('jack.eth')


    })


    it('get first domain ...' , async ()=> {
      

      expect(d1_get.name).to.be.equal('jack.eth')


    })
  })

  describe("Minting and Updat the owner ...", async () => {
   
    it('buyer buy first nft ...' , async () => {

    let buyer = await signers[3]

    const mint1 = await ethda.connect(buyer).mint(0 , {value : tokens(11)})
    await mint1.wait()
    
    let buyer_check = await ethda.ownerOf(0)
    expect(buyer_check).to.equal(buyer.address)


    })

    it('withdraw the smart contract to the owner address ...', async ()=> {
      const wa = await ethda.connect(own).withdraw();
      await wa.wait()

      let own_balance = await ethda.getBalance(own.address) ;
      console.log(own_balance)
    })


  })




})
