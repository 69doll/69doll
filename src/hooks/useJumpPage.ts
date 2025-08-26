import { useNavigate, useParams } from "react-router-dom";
import { NavigateRealPath } from "../routes";

// DropTail removes the last argument from a function's parameter list
type DropTail<T extends (...args: any[]) => any> =
  T extends (...args: [...infer Head, any]) => any ? Head : never;

export default function useJumpPage() {
  const navigate = useNavigate()
  const { lang } = useParams()
  return {
    INDEX: () => navigate(NavigateRealPath.INDEX(), { replace: true }),
    NOT_FOUND: () => navigate(NavigateRealPath.NOT_FOUND(), { replace: true }),
    HOME: (...args: DropTail<typeof NavigateRealPath.HOME>) => navigate(NavigateRealPath.HOME(...args, { lang }), { replace: true }),
    FORGOT: (...args: DropTail<typeof NavigateRealPath.FORGOT>) => navigate(NavigateRealPath.FORGOT(...args, { lang }), { replace: true }),
    SIGNIN: (...args: DropTail<typeof NavigateRealPath.SIGNIN>) => navigate(NavigateRealPath.SIGNIN(...args, { lang }), { replace: true }),
    SIGNUP: (...args: DropTail<typeof NavigateRealPath.SIGNUP>) => navigate(NavigateRealPath.SIGNUP(...args, { lang }), { replace: true }),
    CARTS: (...args: DropTail<typeof NavigateRealPath.CARTS>) => navigate(NavigateRealPath.CARTS(...args, { lang }), { replace: true }),
    DOLLS: (...args: DropTail<typeof NavigateRealPath.DOLLS>) => navigate(NavigateRealPath.DOLLS(...args, { lang }), { replace: true }),
    DOLL_DETAIL: (...args: DropTail<typeof NavigateRealPath.DOLL_DETAIL>) => navigate(NavigateRealPath.DOLL_DETAIL(...args, { lang }), { replace: true }),
    FACES: (...args: DropTail<typeof NavigateRealPath.FACES>) => navigate(NavigateRealPath.FACES(...args, { lang }), { replace: true }),
    FACE_DETAIL: (...args: DropTail<typeof NavigateRealPath.FACE_DETAIL>) => navigate(NavigateRealPath.FACE_DETAIL(...args, { lang }), { replace: true }),
    TORSOS: (...args: DropTail<typeof NavigateRealPath.TORSOS>) => navigate(NavigateRealPath.TORSOS(...args, { lang }), { replace: true }),
    TORSO_DETAIL: (...args: DropTail<typeof NavigateRealPath.TORSO_DETAIL>) => navigate(NavigateRealPath.TORSO_DETAIL(...args, { lang }), { replace: true }),
    ACCESSORIES: (...args: DropTail<typeof NavigateRealPath.ACCESSORIES>) => navigate(NavigateRealPath.ACCESSORIES(...args, { lang }), { replace: true }),
    ACCESSORY_DETAIL: (...args: DropTail<typeof NavigateRealPath.ACCESSORY_DETAIL>) => navigate(NavigateRealPath.ACCESSORY_DETAIL(...args, { lang }), { replace: true }),
  }
}
