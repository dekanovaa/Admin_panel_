
import './Loginpage.css'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Loginpage() {
    const notify = () => toast("Default Notification !")
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin`, {
            method: 'POST',
            body:JSON.stringify({
                phone_number: phone,
                password:password

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        })
        .then((item) => item.json())
        .then((res) => {
            if(res?.success === true){
            localStorage.setItem("access_token", res?.data?.tokens?.accessToken?.token)
            navigate("/Homepage")
            toast.success("Success Notification !", {
    
              });
            }
            else{
                setError(true)
                navigate("/")
                
      toast.error("Error Notification !", {
        
      });
            }
        })
    }
  

  return (
    <div className="login">
        <div className="container login__container">
            <h1 className="login__title">Login</h1>
            <form id="loginform" onSubmit={handleSubmit}>
                <label>Phone number</label><br/>
                <input onChange={(e) => setPhone(e?.target?.value)} type="text" placeholder="+998" required/><br/>
                <label> Password</label><br/>
                <input onChange={(e) => setPassword(e?.target?.value)} type="text" placeholder="password" required/><br/>
                {error ? "Siz admin emassiz" : ""}
                <button  onClick={notify} id="login__btn" type="submit">Submit</button>
                <Link className="login__link" to="/Registratsion">Registratsion</Link>
            </form>
        </div>
      
    </div>
  )
}

export default Loginpage
