import React from "react";
import Header from "../layout/Header";
import { Link } from "react-router-dom";
import NotFoundImage from "../assets/404.png";

const NotFound = () => {
  return (
    <div className="relative z-10 flex flex-1 flex-col overflow-auto">
      <Header style="font-bold " title="404" />
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">
          404 - Page Not Found
        </h1>
        <p className="mt-4 text-center text-lg text-gray-600">
          Oops! It seems that the page you're looking for doesn't exist.
        </p>
        <img
          src={NotFoundImage}
          alt="Not Found Illustration"
          className="mt-4 w-1/2 max-w-md"
        />
        <div className="mt-6 flex flex-col items-center">
          <Link to="/" className="mb-2 text-blue-600 hover:underline">
            Go Back to Homepage
          </Link>
          <Link to="/contact" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
