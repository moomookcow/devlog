import Layout from "@/components/layout/Layout";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Layout showSidebar={false}>
      <HomePage />
    </Layout>
  );
}

export default App;
