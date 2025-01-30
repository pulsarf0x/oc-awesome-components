import {ComplexFormValueInterface} from "../interfaces/complex-form-value";

export class ComplexFormValue implements ComplexFormValueInterface {
  personalInfo!: { firstName: string; lastName: string };
  email?: { email: string; confirm: string };
  contactPreference!: string;
  phone?: string;
  loginInfo!: { username: string; password: string; confirmPassword: string };
}
