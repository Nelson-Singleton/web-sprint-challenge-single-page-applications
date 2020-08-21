import React, {useState, useEffect} from "react";
import axios from 'axios'
import * as yup from 'yup'
import Form from './Form'
import { Route, Switch, Link } from 'react-router-dom'

//initial variables *******************************************************
const initialFormValues = {
  name: "",
  size: "",
  toppings: {
    sausage: false,
    bacon: false,
    peppers: false,
    onions: false,
  },
  special: "",  
}

const initialFormError = {
  name: "",
  size: "",
  toppings: "",
  special: "",
}

const initialOrders = []
const initialDisabled = true

const App = () => {

//states***********************************************************
const [orders, setOrders] = useState(initialOrders)
const [formValues, setFormValues] = useState(initialFormValues)
const [formErrors, setFormErrors] = useState(initialFormError)
const [disabled, setDisabled] = useState(initialDisabled)

//Post function to update orders and reset form********************************************
const postNewOrder = newOrder => {

  axios.post('https://reqres.in/api/users', newOrder)
    .then(res => {
      
      setOrders([...orders, res.data])
      console.log(res.data)
      
    })
    .catch(err => {
      
    })
    .finally(() => {
      setFormValues(initialFormValues)
    })    
}

//function where the checkbox changes the state of the entire form.************************************************************ 

const checkboxChange = (name, isChecked) => {
  

  setFormValues({...formValues,
     toppings: {
      ...formValues.toppings,
      [name]: isChecked,
    }
  })
}

//function to submit form data to a variable, and send variable data as a post request *********************************************************************
const submit = () => {
  
  const newOrder = {
    name: formValues.name,
    size: formValues.size,
    toppings: Object.keys(formValues.toppings).filter(topping => formValues.toppings[topping]),
    special: formValues.special,
  }
  console.log (newOrder)
    
    postNewOrder(newOrder)
}

//schema************************************************************************
const formSchema = yup.object().shape({
  
  name: yup
  .string()
  .min(2, 'Name must be at least 2 characters long')  
  .required('Name is Required'),

  size: yup
  .string()
  .oneOf(['small', 'medium', 'large'], 'Select a pizza size')
  .required('You must select a pizza size'),

  special: yup
  .string(),  
  

  name: yup
  .string()  
  .required('Username is Required'),

})

//validation************************************************************************
const inputChange = (name, value) => {
 
  yup
    .reach(formSchema, name)
    //we can then run validate using the value
    .validate(value)
    // if the validation is successful, we can clear the error message
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    })
    /* if the validation is unsuccessful, we can set the error message to the message 
      returned from yup (that we created in our schema) */
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
      })
    })

  setFormValues({
    ...formValues,
    [name]: value // NOT AN ARRAY
    
  })
}

useEffect(() => {
  
  formSchema.isValid(formValues)
    .then(valid => {
      setDisabled(!valid);
    })
}, [formValues])

  return (
    <div>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
    
    {/* <Link to = "/form" component = { Form } >
      <div>Click here for pizza</div>
    </Link>

    <Route exact path="/" component={App}/>
    <Route path="/form" component={Form}/> */}
    
       
        {/* <Route path='/form' component = {Form}>     
          <Form />  
        </Route>
        <Route path = '/' component = {App}>
          <App />  
        </Route>       */}

<Form 
formValues= {formValues}  
disabled= {disabled}
formErrors = {formErrors}
orders = {orders}

inputChange= {inputChange}
checkboxChange= {checkboxChange}
submit= {submit}
/>
          
    </div>


  
)

}
export default App;
