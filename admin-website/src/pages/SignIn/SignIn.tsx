import type React from "react";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { CircleX, Eye, EyeClosed } from "lucide-react";
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
import useFormItemState from "@/hooks/useFormItemState";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import useIsQuerying from "@/hooks/useIsQuerying";
import { Spinner } from "@/components/ui/spinner";

const SignIn: React.FC = () => {
  const isQuerying = useIsQuerying()
  const nav = useNavigate()
  const refreshCurrentUser = useRefreshCurrentUser()
  const [
    email,
    setEmail,
    { errors: emailErrors, validate: emailValidate, appendError: appendEmailError },
  ] = useFormItemState(getRememberUser() ?? '', {
    validators: [
      (value) => !value ? '还没有填账号' : undefined,
      (value) => /\w+@\w+\.\w+/.test(value) ? undefined : '必须是邮箱地址',
    ],
  })
  const [
    password,
    setPassword,
    { errors: passwordErrors, validate: passwordValidate, appendError: appendPasswordError },
  ] = useFormItemState('', {
    validators: [
      (value) => !value ? '还没有填密码' : undefined,
    ],
  })
  const [remember, setRemember] = useState(hasRememberUser())
  const [passwordInputType, setPasswordInputType] = useState<'password' | 'text'>('password')
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
        appendEmailError('账号或密码有误')
        appendPasswordError('账号或密码有误')
      }
    },
  })
  const login = async () => {
    if ([emailValidate(), passwordValidate()].every(Boolean)) {
      await mutateAsync({ email, password })
    }
  }

  const inputIconProps = {
    variant: 'ghost',
    size: 'icon-xs',
  } as const

  return <>
    <form action={login} className={css.container}>
      <Logo />
      <FormWrapper>
        <FormItem label="账号" errors={emailErrors}>
          <InputGroup>
            <InputGroupInput
              placeholder="账号"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isQuerying}
              aria-invalid={!!emailErrors.length}
              tabIndex={1}
            />
            <Doll69If display={email}>
              <InputGroupAddon align='inline-end'>
                <InputGroupButton
                  {...inputIconProps}
                  onClick={() => setEmail('')}
                >
                  <CircleX />
                </InputGroupButton>
              </InputGroupAddon>
            </Doll69If>
          </InputGroup>
        </FormItem>
        <FormItem label="密码" errors={passwordErrors}>
          <InputGroup>
            <InputGroupInput
              placeholder="密码"
              name="password"
              type={passwordInputType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isQuerying}
              aria-invalid={!!passwordErrors.length}
              tabIndex={2}
              onKeyDown={(e) => e.key === 'Enter' && login()}
            />
            <Doll69If display={password}>
              <InputGroupAddon align='inline-end'>
                {
                  passwordInputType === 'password' ? <>
                    <InputGroupButton
                      {...inputIconProps}
                      onClick={() => setPasswordInputType('text')}
                    >
                      <EyeClosed />
                    </InputGroupButton>
                  </> : <>
                    <InputGroupButton
                      {...inputIconProps}
                      onClick={() => setPasswordInputType('password')}
                    >
                      <Eye />
                    </InputGroupButton>
                  </>
                }
                <InputGroupButton
                  {...inputIconProps}
                  onClick={() => setPassword('')}
                >
                  <CircleX />
                </InputGroupButton>
              </InputGroupAddon>
            </Doll69If>
          </InputGroup>
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
