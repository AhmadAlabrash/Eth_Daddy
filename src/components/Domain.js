import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

const Domain = ({ domain, ethDaddy, provider, id }) => {

  const buyHandler = async () => {
     console.log('32!!!!!!!!32323232!!!!!!!!!')
     const signer = await provider.getSigner()
     const mint1 = await ethDaddy.connect(signer).mint(id ,{ value :domain.cost})
     await mint1.wait()
  }

  return (
    <div className='card'>
      <div className='card__info'>
        <h3>{domain.name}</h3>
        <p>
            <>
              <strong>
                {ethers.utils.formatUnits(domain.cost.toString(), 'ether')}
              </strong>
              ETH
            </>
          
        </p>
   
      </div>
      <>
      {!domain.isOwned ? <button type="button" className='card__button' onClick={() => buyHandler()}> Buy It </button> : <p>IsOwned</p>}
      </>
        
       
    
        
      
    </div>
  );
}

export default Domain;