import Login from "../../../shared/views/auth/login";

const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center">
      <h1 className="title">Login to your Restaurant</h1>
      <Login />
    </div>
  );
};

export default Page;
