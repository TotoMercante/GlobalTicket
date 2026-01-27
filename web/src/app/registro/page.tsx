import { auth0 } from "@/auth0";
import RegisterForm from "./RegisterForm";
import { getProfileApi, ResponseError } from "@/api";
import { redirect } from "next/navigation";

export default auth0.withPageAuthRequired(async function RegistroPage() {
  await getProfileApi()
    .profileControllerGetProfile()
    .catch((err) => {
      if (err instanceof ResponseError) {
      } else {
        console.error(err);
        throw err;
      }
    })
    .then((user) => {
      if (user) {
        console.log(user);
        redirect("/");
      }
    });

  return (
    <div className="container is-max-desktop">
      <h1 className="title">Registro</h1>
      <RegisterForm />
    </div>
  );
});
