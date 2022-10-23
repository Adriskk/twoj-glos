export default interface RegisterDto {
  name: string;
  surname: string;
  email: string;
  city: string;
  pesel: string;
  phone: string;
  password: string;
  re_password?: string;
  isGov?: boolean;
}
