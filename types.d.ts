interface LoginFormInterface {
  email: string;
  password: string;
  fullName: string
}

type LoginFormMode = 'login' | 'register'

interface ProductInterface {
    id: number,
    name: string,
    description:string,
    full_description: string,
    picture_url: string,
    price: string,
    created_at: string
}

interface LoginResponseInterface {
  email: string;
  refresh: string;
  access: string;
}