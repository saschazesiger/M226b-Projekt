'use client'


export default function Panel(props) {

    function logout(){
        localStorage.removeItem("jwt");
        props.getLogin({state: "loggedout"})
    }


  return (
    <>
        <button onClick={logout}>Logout</button>
      <br /> <br /> <br />
    </>
  );
}
