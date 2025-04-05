import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
/*   <StrictMode> */
    <App />
/*   </StrictMode>, */
)

// not use StrictMode in DEV and UAT because it is 2 times call /profile/view API 
// In production use StrictMode no issue for /profile/view api 
