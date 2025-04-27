import React,{useEffect, useState} from 'react'
import { deletePreorder, listPreorders } from '../services/PreordersService'
import{useNavigate} from 'react-router-dom'


const ListPreorderComponent = () => {

    const [Preorders, setPreorders] = useState([])

    const navigator = useNavigate()
    
    useEffect(() => {
        getAllPreorders();

    }, [])

    function addNewpreorder(){
      navigator('/add-preorder')
    }

    function updatePreorders(id){
        navigator(`/edit-preorders/${id}`)

    }
    function getAllPreorders(){
        listPreorders().then((response) => {
            setPreorders(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function removePreorder(id){
        console.log(id);

        deletePreorder(id).then((response) => {
            getAllPreorders();

        }).catch(error => {
            console.error(error);
        })

    }

  return (
    <div className="container bg-light-green py-4  background-gradient">
        <h1 className="text-white mb-4 text-center">List of Preorders</h1>
  
  <div className="d-flex justify-content-end mb-3">
    <button className="btn" style={{ backgroundColor: '#1a3e2a', color: '#fff' }} onClick={addNewpreorder}>Pre Oders</button>  
    
  </div>

  <div className="table-responsive">
    <table className="table table-striped table-bordered align-middle">
      <thead className="table-success text-center">
        <tr>
          <th>Preorders ID</th>
          <th>Customer Name</th>
          <th>Product Name</th>
          <th>Unit Price</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          Preorders.map((Preorders) => (
            <tr key={Preorders.id} className="text-center">
              <td>{Preorders.id}</td>
              <td>{Preorders.customer_name}</td>
              <td>{Preorders.product_name}</td>
              <td>{Preorders.unit_price}</td>
              <td>{Preorders.quantity}</td>
              <td>{Preorders.price}</td>
              <td>{Preorders.date}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-info btn-sm" onClick={() => updatePreorders(Preorders.id)}>Update</button>
                  <button className="btn btn-danger btn-sm" onClick={() => removePreorder(Preorders.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
</div>

  )
}

export default ListPreorderComponent