import React from 'react'
import loading from './Spinner-1s-200px.gif'

const Spinner = () => {
 
    return (
      <div className='text-center my-3'>
        <img src={loading}  style={{height:"70px",width: "70px"}} alt='loading'/>
      </div>
    )
  
}
export default Spinner
