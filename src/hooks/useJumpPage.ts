import { useNavigate, useParams } from "react-router-dom";
import { NavigateRealPath } from "../routes";

export default function useJumpPage() {
  const navigate = useNavigate()
  const { lang } = useParams()
  return {
    INDEX: () => navigate(NavigateRealPath.INDEX(), { replace: true }),
    NOT_FOUND: () => navigate(NavigateRealPath.NOT_FOUND(), { replace: true }),
    HOME: (...args: Parameters<typeof NavigateRealPath.HOME>) => navigate(NavigateRealPath.HOME({ ...(args[0] ?? {}), lang }), { replace: true }),
    FORGOT: (...args: Parameters<typeof NavigateRealPath.FORGOT>) => navigate(NavigateRealPath.FORGOT({ ...(args[0] ?? {}), lang }), { replace: true }),
    SIGNIN: (...args: Parameters<typeof NavigateRealPath.SIGNIN>) => navigate(NavigateRealPath.SIGNIN({ ...(args[0] ?? {}), lang }), { replace: true }),
    SIGNUP: (...args: Parameters<typeof NavigateRealPath.SIGNUP>) => navigate(NavigateRealPath.SIGNUP({ ...(args[0] ?? {}), lang }), { replace: true }),
    CARTS: (...args: Parameters<typeof NavigateRealPath.CARTS>) => navigate(NavigateRealPath.CARTS({ ...(args[0] ?? {}), lang }), { replace: true }),
    DOLLS: (...args: Parameters<typeof NavigateRealPath.DOLLS>) => navigate(NavigateRealPath.DOLLS({ ...(args[0] ?? {}), lang }), { replace: true }),
    DOLL_DETAIL: (...args: Parameters<typeof NavigateRealPath.DOLL_DETAIL>) => navigate(NavigateRealPath.DOLL_DETAIL({ ...(args[0] ?? {}), lang }), { replace: true }),
    FACES: (...args: Parameters<typeof NavigateRealPath.FACES>) => navigate(NavigateRealPath.FACES({ ...(args[0] ?? {}), lang }), { replace: true }),
    FACE_DETAIL: (...args: Parameters<typeof NavigateRealPath.FACE_DETAIL>) => navigate(NavigateRealPath.FACE_DETAIL({ ...(args[0] ?? {}), lang }), { replace: true }),
    TORSOS: (...args: Parameters<typeof NavigateRealPath.TORSOS>) => navigate(NavigateRealPath.TORSOS({ ...(args[0] ?? {}), lang }), { replace: true }),
    TORSO_DETAIL: (...args: Parameters<typeof NavigateRealPath.TORSO_DETAIL>) => navigate(NavigateRealPath.TORSO_DETAIL({ ...(args[0] ?? {}), lang }), { replace: true }),
    ACCESSORIES: (...args: Parameters<typeof NavigateRealPath.ACCESSORIES>) => navigate(NavigateRealPath.ACCESSORIES({ ...(args[0] ?? {}), lang }), { replace: true }),
    ACCESSORY_DETAIL: (...args: Parameters<typeof NavigateRealPath.ACCESSORY_DETAIL>) => navigate(NavigateRealPath.ACCESSORY_DETAIL({ ...(args[0] ?? {}), lang }), { replace: true }),
  }
}
