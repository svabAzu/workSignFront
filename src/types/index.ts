export interface RegisterFormValues {
  name: string;
  last_name: string;
  password?: string;
  email: string;
  phone: string;
  avatar_url: File | null;
  specialties: number[];
  dni: string;
  ID_type_user: number;
}

export interface OperatorWorkload {
  userId: number;
  name: string;
  lastName: string;
  taskCount: number;
}
