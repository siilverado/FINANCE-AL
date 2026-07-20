export default interface RegisterResponse {
    DNI: string;
    address: string;
    id: string;
    phone: string;
    firstName: string;
    user?: USER
}
interface USER {
    
    email: string;
    id: string;
    owner?: any;
}