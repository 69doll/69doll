import type React from "react";
import css from './style.module.scss'
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import Logo from "../Logo";
import SHA1 from 'crypto-js/sha1'

const SignIn: React.FC = () => {
  const nav = useNavigate()
  const login = async (formData: FormData) => {
    const body = Object.fromEntries([...formData.entries()])
    body.password = SHA1(body.password as string).toString()
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (data.code === 200) {
      nav('/')
    }
  }
  return <>
    <form action={login} className={css.container}>
      <Logo />
      <Input placeholder="账号" name="email" />
      <Input placeholder="密码" name="password" type="password" />
      <Button variant='outline' type='submit'>登陆</Button>
    </form>
  </>
}

export default SignIn
