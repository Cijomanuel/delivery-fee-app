import { useState } from "react";
import { formatDateTime } from "../../utils/dateTimeFormatter";
import { IoMdRefreshCircle } from "react-icons/io";

const FormElement:React.FC = () => {
	
	const [showPrice, setshowPrice] = useState<Boolean>(false); // state used to enable or disable the delivery price viewing section
	const [deliveryPrice, setdeliveryPrice] = useState<number>(0);
	const [cartValue, setcartValue] = useState<number>(0);
	const [deliveryDistance, setdeliveryDistance] = useState<number>(0);
	const [amountOfItems, setamountOfItems] = useState<number>(0);
	const [deliveryTime, setdeliveryTime] = useState<Date>(new Date());
	
	// Main program to calculate the delivery fee
	const mainCalculatorProgram = ():number =>{
		try {
			let  surCharge:number,  deliveryFee:number, time:Date;

		//Sample Date insertion
		 time = new Date(deliveryTime);deliveryFee=0;

		if(cartValue < 200){

			//If cart value <10
			surCharge = (cartValue < 10)?(10-cartValue):0;

			//Delivery Fee for distance,
			deliveryFee += ((deliveryDistance > 500)?(Math.ceil(deliveryDistance/500)):1);

			//Based on number of items,
			if(amountOfItems >= 5){
			surCharge +=(0.5*(amountOfItems -4));
			deliveryFee = ((amountOfItems > 12)?deliveryFee+1.20:deliveryFee);
			}

			deliveryFee += surCharge;

			// Code to check rush hour  
			if (time.getDay() === 5 && time.getHours() >= 15 && time.getHours() <= 19) {
			deliveryFee *= 1.2;
		}
			deliveryFee = (Math.min(deliveryFee,15));
			}
		return deliveryFee;
		} catch (error) {
			console.log(error);
		}
		return 0 ;
	}

	// Function which handling user input zero-value expection and if not, calling the main program
	const getDeliveryPrice = () => {
		let flag = 0;
		if(cartValue === 0){
			alert("Cart value cannot be 0!");
			flag=1;
		}
		if(deliveryDistance === 0){
			alert("Delivery Distance cannot be 0!");
			flag=1;
		}
		if(amountOfItems === 0){
			alert("Amount of Items cannot be 0!");
			flag=1;
		}
		if(flag ===0){
			setdeliveryPrice(mainCalculatorProgram());
			setshowPrice(true);
		}
	};

	// Function which reset and program
	const ResetValues = ():void =>{
		setcartValue(0);
		setdeliveryDistance(0);
		setamountOfItems(0);
		setdeliveryTime(new Date(formatDateTime(new Date())));
		setshowPrice(false);
		setdeliveryPrice(0);
	};

  return (
	<>
 <div style={{ display: 'flex', alignItems: 'center' }}>
		<IoMdRefreshCircle 
			size={28} 
			style={{ marginLeft: 'auto',color:'#29384C'}}  
			data-toggle="tooltip" 
			data-placement="top" 
			title="Reset values"
			onClick={()=>{ResetValues()}}/>
	</div>
	   <div className="text-center mt-3">
			<h3 className="main-header-textstyle">Delivery Fee Calculator</h3>
		</div>
	<div className="p-4">
		<div className="input-group mb-1">
			<span className="input-group-text main-style">
			</span>
			<div 
			  className="form-floating"  
			  data-toggle="tooltip" 
			  data-placement="top" title="Value of the shopping cart in euros.">
				<input 
				  type="text" 
				  id="floating-cart-value" 
				  value={cartValue} 
				  onChange={(e)=>{setcartValue(parseInt(e.target.value && (/^[0-9]*$/.test(e.target.value)) ?e.target.value.replace(/^0+/, '') || '0':"0"))}} 
				  className="form-control" 
				  maxLength={9} 
				  data-test-id="cartValue" //Added as per assessment requirement
				  data-testid="cartValue"/>
				<label htmlFor="floating-cart-value">Cart Value (€)
				</label>
			</div>
		</div>
		<div className="input-group mb-1">
			<span className="input-group-text main-style">
			</span>
			<div 
			  className="form-floating" 
			  data-toggle="tooltip" 
			  data-placement="top" 
			  title="The distance between the store and customer’s location in meters.">
				<input 
				  type="text"  
				  id="floating-delivery-distance" 
				  value={deliveryDistance} 
				  onChange={(e)=>{setdeliveryDistance(parseInt(e.target.value && (/^[0-9]*$/.test(e.target.value)) ?e.target.value.replace(/^0+/, '') || '0':"0"))}}  
				  className="form-control" 
				  maxLength={7} 
				  data-test-id="deliveryDistance" //Added as per assessment requirement
				  data-testid="deliveryDistance"/>
				<label htmlFor="floating-delivery-distance">Delivery Distance (in m)
				</label>
			</div>
		</div>
		<div className="input-group mb-1">
			<span className="input-group-text main-style">
			</span>
			<div 
			  className="form-floating" 
			  data-toggle="tooltip" 
			  data-placement="top" 
			  title="The number of items in the customer's shopping cart.">
				<input 
				  type="text"
				  id="floating-amount-of-items"  
				  value={amountOfItems} 
				  onChange={(e)=>{setamountOfItems(parseInt(e.target.value && (/^[0-9]*$/.test(e.target.value)) ?e.target.value.replace(/^0+/, '') || '0':"0"))}}  
				  className="form-control" 
				  maxLength={4} 
				  data-test-id="numberOfItems" //Added as per assessment requirement
				  data-testid="numberOfItems"/>
				<label htmlFor="floating-amount-of-items">Amount of items
				</label>
			</div>
		</div>
		<div className="input-group mb-1">
			<span className="input-group-text main-style">
			</span>
			<div 
			  className=" form-floating" 
			  data-toggle="tooltip" 
			  data-placement="top" 
			  title="The date/time when the order is being made.">
				<input 
				  type="datetime-local" 
				  id="floating-order-time" 
				  value={formatDateTime(deliveryTime)}  
				  onChange={(e)=>{setdeliveryTime(e.target.value ?new Date(formatDateTime(new Date(e.target.value))):new Date(formatDateTime(new Date())))}} 
				  className="form-control datetime" 
				  data-test-id="orderTime"//Added as per assessment requirement 
				  data-testid="orderTime" />
				<label htmlFor="floating-order-time">Time</label>
			</div>
		</div>
		<div className="text-center mt-3">
			{showPrice? 
			<div className="input-group mb-1 mt-3">
				<span className="input-group-text result-background">
				</span>
				<div className=" form-floating">
					<input 
					  type="text"
					  id="floating-delivery-fee"  
					  value={deliveryPrice} 
					  className="form-control" 
					  data-test-id="fee" //Added as per assessment requirement
					  data-testid="fee" readOnly/>
					<label htmlFor="floating-delivery-fee">Delivery Price (€) </label>
				</div>
			</div>:<span className=""></span>}
		</div>
		<div className="d-grid col-12 mx-auto m-2 mt-2">
			<input
			  type="button"
			  className="btn btn-primary rounded-pill p-2 btn-backgroundcolor" 
			  onClick={()=>{getDeliveryPrice()}}
			  data-test-id="submitButton" //Added as per assessment requirement
			  data-testid="submitButton" 
			  defaultValue={" Calculate delivery price"}
			  readOnly
			  />
		</div>
	</div> 
	</>
  )
}

export default FormElement