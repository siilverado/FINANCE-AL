export class UserDTO {
  id: string;
  email: string;
  role: 'user' | 'owner';
  owner?: any;
}
