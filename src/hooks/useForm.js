import { useState, useEffect } from 'react';

const useForm = initialState => {
  const [values, setValues] = useState(initialState);

  const handleChange = event => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  useEffect(() => {
    return () => setValues({ ...initialState });
  }, [initialState]);

  return [values, handleChange];
};

export default useForm;
