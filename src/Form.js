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

//update state when entering data into form************************************************************
const onInputChange = evt => {
    const { name, value } = evt.target
    inputChange(name, value)
}

return(
<div>
    Form
</div>
)}
export default Form;
