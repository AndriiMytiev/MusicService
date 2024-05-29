import { useState } from "react";

export const useRegistrationValidator = (
  validate: (value: string) => string | null,
) => {
  const [shouldValidate, setShouldValidate] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const activateValidator = (value: string) => {
    setShouldValidate(true);
    setValidationError(validate(value));
  };

  const performValidation = (value: string) => {
    if (shouldValidate) {
      setValidationError(validate(value));
    }
  };

  return {
    validationError,
    activateValidator,
    performValidation,
  };
};
