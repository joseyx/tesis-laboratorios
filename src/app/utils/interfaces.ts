export interface UserInterface {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  image: string;
}

export interface CitaInterface {
  id: number;
  paciente: {
    name: string;
  }
  date: string;
  description: string;
  resultado: string;
  estado: string;
}
