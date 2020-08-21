import React, {useState, useEffect} from "react";
import axios from 'axios'
import * as yup from 'yup'
import Form from './Form'
import Home from './Home'
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
  .required('You must select a pizza size'),

  special: yup
  .string(),  

})

//validation************************************************************************
const inputChange = (name, value) => {
 
  yup
    .reach(formSchema, name)
    
    .validate(value)
    
    .then(valid => {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    })
    
    .catch(err => {
      setFormErrors({
        ...formErrors,
        [name]: err.errors[0],
      })
    })

  setFormValues({
    ...formValues,
    [name]: value 
    
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
      
      <nav>
      <p><Link to="/">Home</Link></p>
      <Link to="/pizza">Click here to order</Link>
      </nav>
      <br></br>
    

<Switch>

<Route path='/pizza'>
<Form 
formValues= {formValues}  
disabled= {disabled}
formErrors = {formErrors}
orders = {orders}

inputChange= {inputChange}
checkboxChange= {checkboxChange}
submit= {submit}
/>
</Route>

<Route exact path = '/'>
  <Home />  
</Route>


</Switch> 
<h2>Open orders</h2>
  {orders.map(order =>{
    return(
      <pre key = {order.id}>
        <h3>{JSON.stringify(order)}</h3>
        
     </pre>
    )
  })
  
  }         
    </div>


  
)

}
export default App;
