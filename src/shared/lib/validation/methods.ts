import { addMethod, StringSchema } from 'yup';

const phoneRegex = /^((8|\+7)[- ]?)?(\(?\d{3}\)?[- ]?)?[\d\- ]{7,10}$/;

addMethod(StringSchema, 'phoneRu', function format() {
  return this.matches(phoneRegex, {
    message: 'Введите корректный номер телефона',
  });
});
