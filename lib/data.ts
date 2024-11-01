// user data 
const users = [
  {
    name: "andres",
    email: "andres@atomatic.io",
    password: "Asdasd121!",
    image: '',
  },
  
]

export type User = (typeof users)[number]

export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email)
}