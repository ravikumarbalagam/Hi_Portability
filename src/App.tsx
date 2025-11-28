import { RouterProvider } from "react-router";
import { router } from "./utils/routes";
import { Toaster } from "sonner@2.0.3";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;