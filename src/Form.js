import React from 'react';
import './App.css';
import * as yup from 'yup'
import App from './App'

const Form = props => {
    const { formValues, orders, formErrors, disabled, inputChange, checkboxChange, submit } = props;

//prevent page refresh on form submission************************************************************    
const onSubmit = evt => {
    
    evt.preventDefault()
    submit()
}

//update state when checkbox is clicked************************************************************
const onCheckboxChange = evt => {
    const { name, checked } = evt.target
    checkboxChange(name, checked)
}

//update state when entering data into form and trigger validation************************************************************
const onInputChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)
}






return(
<div>
    <form onSubmit = {onSubmit}>
        
        <div>
            <div>{formErrors.name}</div>
            {/* <div>{formErrors.size}</div> */}
            <div>{formErrors.toppings}</div>
            <div>{formErrors.special}</div>
        </div>

        <label>
            Name
            <input className = 'nametab' type = "text" name = "name" onChange = {onInputChange} value = {formValues.name}/>
        </label>
        <br></br>

        <label>
            Pizza Size
            <select id="dropdown" name="size" value = {formValues.size} onChange = {onInputChange}  > 
                <option> Select a size </option>    
                <option value= "Small">Small</option> 
                <option value= "Medium">Medium</option> 
                <option value= "Large">Large</option>  
            </select>
        </label>

        <br></br>
        
        <label>
            Select your toppings
            <br></br>
            sausage
            <input className = "sausagebox" type = "checkbox" name = "sausage" checked = {formValues.toppings.sausage} onChange = {onCheckboxChange}/>
            <br></br>
            bacon
            <input className = "baconbox" type = "checkbox" name = "bacon" checked = {formValues.toppings.bacon} onChange = {onCheckboxChange}/>
            <br></br>
            peppers
            <input className = "peppersbox" type = "checkbox" name = "peppers" checked = {formValues.toppings.peppers} onChange = {onCheckboxChange}/>
            <br></br>
            onions
            <input className = "onionsbox" type = "checkbox" name = "onions" checked = {formValues.toppings.onions} onChange = {onCheckboxChange}/>
            <br></br>
        </label>

        <label>
            Are there any special instructions?
            <input className = "specialtab" type = "text" name = "special" onChange = {onInputChange} value = {formValues.special}/>
        </label>
        <br></br>

        <button className = "submitbutton">submit</button>

    </form>
</div>
)}
export default Form;
