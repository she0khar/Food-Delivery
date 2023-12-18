import { useRouteError } from "react-router-dom";

const Error = () => {
    const err = useRouteError();
    return <div className="p-10">
        <h1 className="text-center text-3xl font-extrabold text-red-600">Oops!!</h1>
        <h2 className=" text-xl text-center font-bold">{err.statusText}</h2>
    </div>
}
export default Error;