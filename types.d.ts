interface LoginFormInterface {
  email: string;
  password: string;
  fullName: string
}

type LoginFormMode = 'login' | 'register'