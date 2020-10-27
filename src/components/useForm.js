import React, { useState } from 'react'

const useForm = (initialFieldValues, validate) => {
    const [values,setValues] = useState(initialFieldValues)
    const [errors,setErrors] = useState({});


    const handleInputChange = e => {
        console.log('e. target',e.target)
        const {name,value} = e.target;
        const fieldValue = {[name]: value}
        setValues({
            ...values,
            [name] : value
        })
        validate(fieldValue)
    }

    const inputLabel = React.useRef(null);
    const[labelWidth,setLabelWidth] = React.useState(0);
    React.useEffect(()=>{
        setLabelWidth(inputLabel.current.offsetWidth)
    },[]);

    return{
        values,
        setValues,
        handleInputChange,
        inputLabel,
        labelWidth,
        setLabelWidth,
        errors,
        setErrors
}


}

export default useForm;