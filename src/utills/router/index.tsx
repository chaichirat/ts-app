import { useLocation, useNavigate, useParams, useRoutes } from "react-router";
import { PageUser } from "../../pages/user/PageUser";
import { PageProduct } from "../../pages/product/PageProduct";
import { paths } from "../../constans/path";
import { useMemo } from "react";
import queryString from "query-string";
import { PageHome } from "../../pages/home/PageHome";
import { PageSignIn } from "../../pages/sign in/PageSignIn";
import { PageProfile } from "../../pages/profile/PageProfile";

export const Router = () => {
  return useRoutes([
    {
      path: paths.signIn,
      element: <PageSignIn />,
    },
    {
      path: paths.home,
      element: <PageHome />,
    },
    {
      path: paths.users,
      element: <PageUser />,
    },
    {
      path: paths.product,
      element: <PageProduct />,
    },
    {
      path: paths.profile,
      element: <PageProfile />,
    },
  ]);
};

export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  return useMemo(
    () => ({
      query: {
        ...queryString.parse(location.search.slice(1)),
        ...params,
      },
      back: () => navigate(-1),
      forward: () => navigate(1),
      reload: () => window.location.reload(),
      push: (href: string, options?: any) => navigate(href, options),
      replace: (href: string) => navigate(href, { replace: true }),
    }),
    [navigate, location.search, params]
  );
}
