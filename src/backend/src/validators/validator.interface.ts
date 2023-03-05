interface Validator<T> {
  validate: (entity: T) => ValidationResult;
}

interface ValidationResult {
  isValid: boolean;
  errors: Array<string>;
}

export default Validator;

export { Validator, ValidationResult };
