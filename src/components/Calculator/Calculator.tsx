import React from 'react'
import '../../assets/Calculator.css'
import 'bootstrap/dist/css/bootstrap.css';
import FormElement from './FormElement';


const Calculator:React.FC = () => {
  return (
    <>
<div className="form-wrap">	
                <div className="d-flex justify-content-center row shadow-lg mb-5 bg-white rounded">
                <div className="col-8 p-0 bckimg-color rounded">
                        <img 
                          src="https://cdn.pixabay.com/photo/2023/02/21/05/47/rain-7803539_1280.jpg"
                          className="img-fluid bckimg" 
                          alt="Wolt delivery" 
                          data-test-id="woltDeliveryImage" //Added as per assessment requirement
                          data-testid="woltDeliveryImage"/>
                    </div>
                    <div className="col p-2 bg-light">
                        <FormElement/>
                    </div>
                </div>
            </div>

    </>
  )
}

export default Calculator