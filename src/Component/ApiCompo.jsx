import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ApiCompo = () => {
     const Navigate = useNavigate();

     const [data, setData] = useState([]);
     const [userData, setUserData] = useState({
          name: "",
          age: "",
          salary: "",
     });

     const [uid, setUid] = useState("");

     const handleChange = (e) => {
          const { name, value } = e.target;
          setUserData({ ...userData, [name]: value });
     };

     useEffect(() => {

          fetchData();
     }, [])

     const fetchData = async () => {
          try {
               // const { data: response } = await axios.get("http://localhost:3000/users");
               await fetch("http://localhost:3000/users")
                    .then(res => res.json())
                    .then(json => setData(json))
          } catch (error) {
               console.error(error.message);
          }
     }


     const saveData = () => {
          if (uid !== "") {
               fetch(`http://localhost:3000/users/${uid}`, {
                    method: "PUT",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
               })
                    .then((response) => response.json())
                    .then(json => console.log(json))
               fetchData();

          } else {
               fetch("http://localhost:3000/users", {
                    method: "POST",
                    headers: {
                         "Content-Type": "application/json"
                    },
                    body: JSON.stringify(userData)
               })
                    .then((response) => response.json())
                    .then(json => console.log(json))
          }
          Navigate("/user");

     }

     const DeleteData = (id) => {
          fetch("http://localhost:3000/users/" + id, {
               method: "DELETE",
               headers: {
                    "Content-Type": "application/json"
               },
               body: JSON.stringify(userData)
          })
               .then(response => response.json())
               .then(json => console.log(json))
          fetchData();

     }

     const editData = (id) => {
          setUid(id)
          fetch("http://localhost:3000/users/" + id, {
               method: "PATCH",
               headers: {
                    "Content-Type": "application/json"
               },
               //  body: JSON.stringify(userData)
          })
               .then((response) => response.json())
               .then(json => setUserData(json))
          //  Navigate("/user")         
     }

     const Save = () => {


     }

     return (
          <div>
               <h2>Api Demo</h2>
               <form name="apiform" onSubmit={saveData} method="post" className=" pt-4 " >
                    <label htmlFor="Name">Name: </label>
                    <input className="px-2 mx-2" type="text" id="name" name="name" value={userData.name}
                         onChange={handleChange} />
                    <br />   <br />
                    <label htmlFor="Age">Age: </label>
                    <input className="px-2 mx-2" type="number" id="age" name="age" value={userData.age}
                         onChange={handleChange} /> <br /><br />
                    <label htmlFor="Salary">Salary: </label>
                    <input type="number" className="px-2 mx-2" id="salary" name="salary" value={userData.salary}
                         onChange={handleChange} /><br />
                    <button className="btn btn-info mt-4 mb-4" type="submit" value={uid !== '' ? "Update" : Save}>
                         Save Data</button>
               </form>
               <table className="border border-primary h-auto w-auto m-auto mt-5">
                    <tr>
                         <th className="border border-primary ps-2 text-center px-3">Id</th>
                         <th className="border border-primary ps-2 text-center px-3">Name</th>
                         <th className="border border-primary ps-2 text-center px-3">AGE</th>
                         <th className="border border-primary ps-2 text-center px-3">SALARY</th>
                         <th className="border border-primary ps-2 text-center px-3">ACTION</th>
                    </tr>

                    {
                         data.map((i, index) => {
                              return (
                                   <tr key={index}>
                                        <td className="border border-primary ps-2 text-center px-3">{index + 1}</td>
                                        <td className="border border-primary ps-2 text-center px-3">{i.name}</td>
                                        <td className="border border-primary ps-2 text-center px-3">{i.age}</td>
                                        <td className="border border-primary ps-2 text-center px-3">{i.salary}</td>
                                        <td className="border border-primary ps-2 text-center px-3">
                                             <button className="btn btn-info px-3 " type="button"
                                                  onClick={() => editData(i.id)}>Edit</button>
                                             <button className="btn btn-primary px-3 ms-2a" type="button"
                                                  onClick={() => DeleteData(i.id)}>Delete</button>
                                        </td>
                                   </tr>
                              );
                         })
                    }

               </table >

          </div >

     );

};
export default ApiCompo;


