import { React, useState, useEffect } from "react";
import config from "../../config.json";
import data from '../../data.json';
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const _ = require('lodash'); 

// Function for formating the date into mm-dd-yyyy
function formatDate(date) {
  let moment = require('moment')
  if(!((moment(date, "YYYY-MM-DD", true).isValid())))
  {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
  }
  else
  {
    return date
  }
}


// function is helping to get the value out of data.json
const getCorrespondingValue = (fieldId, fieldType, defaultData) => {
  let value;
  // getting the data array in the data.json
  const data = defaultData.data;
  //looping over the array and get the value of each object
  // that has the id === field.id
  data.forEach((element) => {
    if (element.fieldId === fieldId) {
      // checking for the type here if the given type
      // is data we will call the format date function
      if (fieldType == "date") {
        value = formatDate(element.value);
      } else {
        value = element.value;
      }
    }
  });

  return value;
};

const getFields = (configState, defaultData) => {
  return configState.fields.map((field, key) => {
    let fieldType;
    const value = defaultData ? getCorrespondingValue(field.id, field.type, defaultData): null;
    if (field.type === "select") {
      fieldType = (
        <select id={field.id} className='mb-3 form-select' label={field.name} defaultValue={value}>
          {field.options.map((options, key) => (
            <option id={key} value={options.value}>
              {options.name}
            </option>
          ))}
        </select>
      );
    } else {
      fieldType = (
        <Input
          id={field.id}
          className='mb-3'
          type={field.type}
          defaultValue={value}
          aria-describedby="my-helper-text"
        />
      );
    }
    //maybe create a function that returns the state
    return (
      <FormControl>
        <FormLabel className='text-dark'><strong>{field.name.toUpperCase()}</strong></FormLabel>
        {fieldType}
      </FormControl>
    );
  });
};

const Form = () => {
  const [configState, setConfigState] = useState(null);
  const [defaultData, setDefaultData] = useState(null);


  useEffect(() => {
    setDefaultData(data);
    setConfigState(config);
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const formElements = Array.from(form.elements);
    const formData = formElements.reduce((acc, input)=>{
      return {...acc, [input.id]:input.value}
    }, {});

    fetch('api/write', {
      method:'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    setTimeout( function() { location.reload()}, 500);
    
  };
  
  return (
    <form className='w-75 p-3 bg-light' onSubmit={submitHandler}>
      {configState && (
        <div className='d-flex flex-column'>
          <div id={config.id} className="m-2"><h2>{config.formName}</h2></div>
          <FormControl className='m-2'>{getFields(configState, defaultData)}</FormControl>
          <Button className='w-25 m-2 bg-success' variant="contained" type="submit">Save</Button>
        </div>
      )}
    </form>
    
  );
};

export default Form;