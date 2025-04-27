import { useNavigate } from "react-router-dom";

function Button(props){
    const navigate = useNavigate();
    return(
        <button onClick={()=>{navigate(`/${props.children}`)}} className="px-6 py-4 w-1/2 bg-amber-700 text-amber-950 font-bold text-2xl drop-shadow-md drop-shadow-black shadow- rounded-md hover:bg-amber-800 active:bg-amber-900">{props.children}</button>
    )
}

export default Button;