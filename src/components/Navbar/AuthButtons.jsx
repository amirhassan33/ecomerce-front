import { Link } from 'react-router-dom'

const AuthButtons = () => {
    return (
        <div className="py-4 flex justify-center items-center gap-4 flex-wrap">
            <Link className="btn btn-neutral btn-outline" to="/register">
                Create Account
            </Link>
            <div className="hidden lg:block">|</div>
            <Link className="btn btn-neutral btn-outline" to="/login">
                Initialize
            </Link>
        </div>
    )
}

export default AuthButtons
