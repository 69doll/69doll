import type React from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Doll69If } from "shared";
import { toast } from "sonner";
import { Button } from "../../components/ui/button";
import Logo from "../../components/Logo";
import css from "./style.module.scss";
import { signIn } from "@/request/auth";
import useRefreshCurrentUser from "@/Context/CurrentUser/useRefreshCurrentUser";
import FormWrapper from "@/components/Form/FormWrapper";
import FormItem from "@/components/Form/FormItem";
import { getRememberUser, hasRememberUser, setRememberUser } from "@/store/rememberEmail";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import useIsQuerying from "@/hooks/useIsQuerying";
import { Spinner } from "@/components/ui/spinner";
import ActionInput, { ActionInputActions } from "@/components/Input/ActionInput";
import useErrors from "@/hooks/useErrors";

const SignIn: React.FC = () => {
  const isQuerying = useIsQuerying()
  const nav = useNavigate()
  const refreshCurrentUser = useRefreshCurrentUser()
  const [email, setEmail] = useState(getRememberUser() ?? '')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(hasRememberUser())
  const [passwordInputType, setPasswordInputType] = useState<'password' | 'text'>('password')
  const {
    validate,
    errorMap,
    hasError,
    setError,
  } = useErrors({ email, password }, {
    email: [
      (value) => !value ? '还没有填账号' : undefined,
      (value) => /\w+@\w+\.\w+/.test(value) ? undefined : '必须是邮箱地址',
    ],
    password: [
      (value) => !value ? '还没有填密码' : undefined,
    ],
  })
  const { mutateAsync } = useMutation({
    mutationFn: signIn,
    async onSuccess (data) {
      if (data.code === 200) {
        if (remember) {
          setRememberUser(email)
        }
        await refreshCurrentUser()
        toast.info('欢迎回来~')
        nav('/dashboard')
      }
      if (data.code === 400) {
        setError('email', '账号或密码有误')
        setError('password', '账号或密码有误')
      }
    },
  })
  const login = async () => {
    if (validate()) {
      await mutateAsync({ email, password })
    }
  }

  return <>
    <form action={login} className={css.container}>
      <Logo />
      <FormWrapper>
        <FormItem label="账号" errors={errorMap['email']}>
          <ActionInput
            placeholder="账号"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isQuerying}
            aria-invalid={hasError('email')}
            tabIndex={1}
            actions={email ? ActionInputActions.Clear(() => setEmail('')) : []}
          />
        </FormItem>
        <FormItem label="密码" errors={errorMap['password']}>
          <ActionInput
            placeholder="密码"
            name="password"
            type={passwordInputType}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isQuerying}
            aria-invalid={hasError('password')}
            tabIndex={2}
            onKeyDown={(e) => e.key === 'Enter' && login()}
            actions={password ? [
              passwordInputType === 'password' ? ActionInputActions.EyeClosed(() => setPasswordInputType('text')) : ActionInputActions.Eye(() => setPasswordInputType('password')),
              ActionInputActions.Clear(() => setPassword(''))
            ] : []}
          />
        </FormItem>
      </FormWrapper>
      <Label htmlFor="remember">
        <Checkbox
          className="p-0! rounded-none! text-black!"
          id="remember"
          checked={remember}
          onCheckedChange={(checked) => typeof checked === 'boolean' && setRemember(checked)}
          disabled={isQuerying}
        />
        记住账号?
      </Label>
      <Button
        variant='outline'
        onClick={() => login()}
        disabled={isQuerying}
      >
        <Doll69If display={isQuerying}>
          <Spinner />
        </Doll69If>
        <Doll69If display={!isQuerying}>
          登陆
        </Doll69If>
      </Button>
    </form>
  </>
}

export default SignIn
