import {useState} from 'react';

export const useForm = (inputValues={}) => {
  console.log(values);

  const [values, setValues] = useState(inputValues);


  const handleChange = (event) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };
  return {values, handleChange, setValues};
};

