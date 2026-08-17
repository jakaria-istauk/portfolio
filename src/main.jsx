import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/v2.css'
import App from './App.jsx'

const container = document.getElementById('root')

const app = (
  <StrictMode>
    <App path={window.location.pathname} />
  </StrictMode>
)

// A production build ships prerendered markup inside #root, so hydrate it
// rather than throwing it away and rendering again. `npm run dev` serves an
// empty container, which takes the other path.
if (container.hasChildNodes()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
