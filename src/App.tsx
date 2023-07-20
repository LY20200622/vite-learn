import States from "./components/StudyTailwind/States.tsx";
import Responsive from "./components/StudyTailwind/Responsive.tsx";
import Dark from "./components/StudyTailwind/Dark.tsx";
import Custom from "./components/StudyTailwind/Custom.tsx";
import Directives from "./components/StudyTailwind/Directives.tsx";
import Reuse from "./components/StudyTailwind/Reuse.tsx";

function App() {
  return (
    <div>
      <div className="text-center">
        ENV DIY KEY: {import.meta.env.VITE_MY_KEY}
      </div>
      <States />
      <Responsive />
      <Dark />
      <Reuse />
      <Custom />
      <Directives />
    </div>
  );
}

export default App;
