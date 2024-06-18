import Header from "../components/Header";
import { useRouteError } from "react-router-dom";

const Error = ({ message, onCallsheet, onResetError }) => {
  const error = useRouteError();
  let errorMessage;

  if (message) {
    errorMessage = message;
  } else {
    errorMessage = error?.data.message || "An unexpected error occurred";
  }

  const handleClick = () => {
    if (onResetError) {
      onResetError();
    }
  };
  if (!onCallsheet) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-screen bg-orange-500">
          <div className="bg-white p-10 rounded shadow-md text-center">
            <h1 className="text-xl font-bold">An error occurred</h1>

            <p className="text-gray-700 mt-4">{errorMessage}</p>
          </div>
        </div>
      </>
    );
  }

  if (onCallsheet) {
    return (
      <>
        <div
          className="bg-white p-10 rounded shadow-md text-center"
          onClick={handleClick}
        >
          <h1 className="text-xl font-bold">An error occurred</h1>

          <p className="text-gray-700 mt-4">{errorMessage}</p>
        </div>
      </>
    );
  }
};

export default Error;
