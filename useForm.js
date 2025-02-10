import { useState } from "react";

export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value, // Propiedades Computadas de JS
    });
  };

  const onResetForm = () => setFormState(initialForm);

  return {
    ...formState,
    formState,
    onInputChange,
    onResetForm,
  };
};

/*
La razón de incluir ...formState en el retorno del custom hook es para desestructurar directamente las propiedades del estado al utilizar el hook.
ejemplo de uso:   
const { description, onInputChange, onResetForm } = useForm({description: "",});
*/
