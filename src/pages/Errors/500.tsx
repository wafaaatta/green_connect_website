import ErrorPage from "./ErrorPage";

export default function Custom500() {
  return <ErrorPage statusCode={500} />
}