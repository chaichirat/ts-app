import { useLocation, useNavigate, useParams, useRoutes } from "react-router";
import { PageUser } from "../../pages/user/PageUser";
import { PageProduct } from "../../pages/product/PageProduct";
import { paths } from "../../constans/path";
import { useMemo } from "react";
import queryString from "query-string";
import { PageHome } from "../../pages/home/PageHome";
import { PageSignIn } from "../../pages/sign in/PageSignIn";
import { PageProfile } from "../../pages/profile/PageProfile";
import { PageProfile2 } from "../../pages/profile2/PageProfile2";
import { PageProfile4 } from "../../pages/profile4/PageProfile4";
import { PageProfile5 } from "../../pages/profile5/PageProfile5";
import { PageProfile6 } from "../../pages/profile6/PageProfile6";
import { PageProfile8 } from "../../pages/profile8/PageProfile8";
import { PageProfile7 } from "../../pages/profile7/PageProfile7";
import { PageProfile9 } from "../../pages/profile9/PageProfile9";
import { PageProfile11 } from "../../pages/profile11/PageProfile11";
import { PageProfile10 } from "../../pages/profile10/PageProfile10";
import { PageProfile3 } from "../../pages/profile3/PageProfile3";

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
    {
      path: paths.profile2,
      element: <PageProfile2 />,
    },
    {
      path: paths.profile3,
      element: <PageProfile3 />,
    },
    {
      path: paths.profile4,
      element: <PageProfile4 />,
    },
    {
      path: paths.profile5,
      element: <PageProfile5 />,
    },
    {
      path: paths.profile6,
      element: <PageProfile6 />,
    },
    {
      path: paths.profile7,
      element: <PageProfile7 />,
    },
    {
      path: paths.profile8,
      element: <PageProfile8 />,
    },
    {
      path: paths.profile9,
      element: <PageProfile9 />,
    },
    {
      path: paths.profile10,
      element: <PageProfile10 />,
    },
    {
      path: paths.profile11,
      element: <PageProfile11 />,
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
