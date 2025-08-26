import { useNavigate } from "react-router-dom";
import { NavigatePath } from "../routes";
import useCurrentLanguage from "./useCurrentLanguage";

type DropFirst<T extends (...args: any[]) => any> = T extends (first: any, ...args: infer U) => any ? U : never;

export default function useJumpPage() {
  const navigate = useNavigate()
  const [currentLanguage] = useCurrentLanguage();
  return {
    INDEX: () => navigate(NavigatePath.INDEX(), { replace: true }),
    NOT_FOUND: () => navigate(NavigatePath.NOT_FOUND(), { replace: true }),
    HOME: (...args: DropFirst<typeof NavigatePath.HOME>) => navigate(NavigatePath.HOME(currentLanguage, ...args), { replace: true }),
    FORGOT: (...args: DropFirst<typeof NavigatePath.FORGOT>) => navigate(NavigatePath.FORGOT(currentLanguage, ...args), { replace: true }),
    SIGNIN: (...args: DropFirst<typeof NavigatePath.SIGNIN>) => navigate(NavigatePath.SIGNIN(currentLanguage, ...args), { replace: true }),
    SIGNUP: (...args: DropFirst<typeof NavigatePath.SIGNUP>) => navigate(NavigatePath.SIGNUP(currentLanguage, ...args), { replace: true }),
    CARTS: (...args: DropFirst<typeof NavigatePath.CARTS>) => navigate(NavigatePath.CARTS(currentLanguage, ...args), { replace: true }),
    DOLLS: (...args: DropFirst<typeof NavigatePath.DOLLS>) => navigate(NavigatePath.DOLLS(currentLanguage, ...args), { replace: true }),
    DOLL_DETAIL: (...args: DropFirst<typeof NavigatePath.DOLL_DETAIL>) => navigate(NavigatePath.DOLL_DETAIL(currentLanguage, ...args), { replace: true }),
    FACES: (...args: DropFirst<typeof NavigatePath.FACES>) => navigate(NavigatePath.FACES(currentLanguage, ...args), { replace: true }),
    FACE_DETAIL: (...args: DropFirst<typeof NavigatePath.FACE_DETAIL>) => navigate(NavigatePath.FACE_DETAIL(currentLanguage, ...args), { replace: true }),
    TORSOS: (...args: DropFirst<typeof NavigatePath.TORSOS>) => navigate(NavigatePath.TORSOS(currentLanguage, ...args), { replace: true }),
    TORSO_DETAIL: (...args: DropFirst<typeof NavigatePath.TORSO_DETAIL>) => navigate(NavigatePath.TORSO_DETAIL(currentLanguage, ...args), { replace: true }),
    ACCESSORIES: (...args: DropFirst<typeof NavigatePath.ACCESSORIES>) => navigate(NavigatePath.ACCESSORIES(currentLanguage, ...args), { replace: true }),
    ACCESSORY_DETAIL: (...args: DropFirst<typeof NavigatePath.ACCESSORY_DETAIL>) => navigate(NavigatePath.ACCESSORY_DETAIL(currentLanguage, ...args), { replace: true }),
  }
}
