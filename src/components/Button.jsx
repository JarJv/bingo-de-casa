import { useNavigate } from "react-router-dom";

function Button(props){
    const navigate = useNavigate();
    return(
        <button onClick={()=>{navigate(`/${props.children}`)}} className="px-6 py-4 w-1/2 bg-amber-200 text-amber-950 text-2xl drop-shadow-md drop-shadow-black shadow- rounded-md">{props.children}</button>
    )
}

export default Button;