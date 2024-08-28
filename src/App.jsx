import { useCallback, useEffect, useState , useRef} from "react";

import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(6);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);

  const passwordRef=useRef()

  const PassGenerator = useCallback(() => {
    let pass=""
    let str = "ASDFGHJKLZXCVBNMQWERTYUIOPasdfghjklzxcvbnmwertyuiop";

    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "!@#$%^&*()/?";
    }

    for (let i = 1; i <=length; i++) {
      let randomValue = Math.floor(Math.random ()* str.length+1);
      pass+= str.charAt(randomValue);
      ;
    }
    setPassword(pass);
  }, [ length, number,character,setPassword]);

  const PasswordCopy=useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
  },[password])


  useEffect(()=>{
    PassGenerator()
  },[length, number, character, PassGenerator])

  return (
    <>
      <div className="w-1/2 m-auto p-10 mt-10 bg-gray-600 shadow-lg rounded-lg">
        <h1 className="text-4xl font-light text-white">
          Password Generator
        </h1>

        <input
          className="p-3 h-10 w-96 my-10 rounded-md "
          readOnly
          type="text"
          value={password}
          ref={passwordRef}
        />

        <button className="bg-blue-600 h-10 w-20 ml-5 rounded-md" onClick={PasswordCopy}>Copy</button>

        <div>
          <div className="text-orange-600  font-semibold flex gap-5 ">
            <input type="range" min={5} max={50} value={length} onChange={(e)=>{
              setLength(e.target.value)
            }} className="cursor-pointer" />
            <label className="text-orange-600"> length:{length}</label>
            <input type="checkBox" defaultChecked={number } onChange={()=>{
              setNumber((prev)=>!prev)
            }} />
            <label >Number </label>
            <input type="checkBOx" onChange={()=>{
              setCharacter((prev)=>!prev)
            }}  />
            <label>Character </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
