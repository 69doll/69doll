import type React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import css from "./style.module.scss";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Logo from "../../components/Logo";
import { getCurrentUser, getCurrentUserCacheKeys } from "@/request/user";
import { AuthProvider } from "@/provider/auth";
import { signIn } from "@/request/auth";

const SignIn: React.FC = () => {
  const nav = useNavigate()
  const { data: currentUser, refetch: refetchCurrentUser } = useQuery({
    queryKey: getCurrentUserCacheKeys(),
    queryFn: () => getCurrentUser(),
    enabled: false,
  })
  useEffect(() => {
    if (currentUser?.code === 200) {
      AuthProvider.setUser(currentUser.data)
      nav('/dashboard')
    }
  }, [currentUser])
  const { mutateAsync } = useMutation({
    mutationFn: signIn,
    async onSuccess (data) {
      if (data.code === 200) {
        await refetchCurrentUser()
      }
    },
  })
  const login = async (formData: FormData) => {
    mutateAsync(formData)
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
