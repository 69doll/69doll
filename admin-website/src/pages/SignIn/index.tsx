import type React from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import css from "./style.module.scss";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Logo from "../../components/Logo";
import { signIn } from "@/request/auth";
import { useRefreshCurrentUser } from "@/Context/CurrentUser";

const SignIn: React.FC = () => {
  const nav = useNavigate()
  const refreshCurrentUser = useRefreshCurrentUser()
  const { mutateAsync } = useMutation({
    mutationFn: signIn,
    async onSuccess (data) {
      if (data.code === 200) {
        await refreshCurrentUser()
        nav('/dashboard')
      }
    },
  })
  const login = async (formData: FormData) => {
    await mutateAsync(formData)
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
