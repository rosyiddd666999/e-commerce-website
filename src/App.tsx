/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import axiosInstance from "./api/axiosConfig";
import TestApi from "./pages/TestApi";

function App() {
  useEffect(() => {
    // Test koneksi
    const testConnection = async () => {
      try {
        console.log("Testing API connection...");
        const response = await axiosInstance.get("/api/products");
        console.log("API Response:", response.data);
      } catch (error: any) {
        console.error("API Error:", error.response || error);
      }
    };

    testConnection();
  }, []);

  return (
    <div className="App">
      <TestApi />
    </div>
  );
}
export default App;
