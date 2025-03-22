
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BillProvider } from './context/BillContext.tsx'

createRoot(document.getElementById("root")!).render(
  <BillProvider>
    <App />
  </BillProvider>
);
