import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Navigation from './components/Navigation'
import Search from './components/Search'
import Domain from './components/Domain'

// ABIs
import ETHDaddy from './abis/ETHDaddy.json'

// Config
import config from './config.json';

function App() {

  const [account , setAccount] = useState(null)
  const [provider , setProvider] = useState(null)

  const [getDomains , setgetDomains ] = useState([])
  const [ethDaddy , setethDaddy] = useState(null)



  const localchainset = async () => {

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    console.log({network})

    const ethDaddy = new ethers.Contract(config[network.chainId].ETHDaddy.address, ETHDaddy, provider)
    setethDaddy(ethDaddy)
    
    const linksCount = await ethDaddy.count()
    console.log({linksCount})

    for (var i = 0 ; i < linksCount ; i++){
       const getDombyid = await ethDaddy.getDom(i)
       getDomains.push(getDombyid)
       console.log(getDomains[i])


    }
    setgetDomains(getDomains)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })

    
  }

  useEffect(()=> {
   localchainset()
  },[])

  return (
    <div>
      <Navigation account={ account } setAccount={setAccount} ></Navigation>
      <Search/>
      <div className='cards__section'>
      <h2 className='cards__title'>Why you need a domain name.</h2>
        <p className='cards__description'>
          Own your custom username, use it across services, and
          be able to store an avatar and other profile data.
        </p>

        <hr />
        <div className='Cards'>
        {getDomains.map((e ,index) =>(
          <Domain domain={e} ethDaddy={ethDaddy} provider={provider} id={index + 1} key={index} />
        ))}
        </div>


      </div>

    </div>
  );
}

export default App;