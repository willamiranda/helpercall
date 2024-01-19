import { Link } from "react-router-dom";
import './error.css'

function Error() {
    return (
        <div className="not-found">
            <h1>404</h1>
            <h2>Pagia não encontrada</h2>
            <Link to="/">Voltar para inicio</Link>
        </div>
    )
}
export default Error;