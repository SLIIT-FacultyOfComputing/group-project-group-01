import React,{useEffect, useState} from 'react'
import { deleteSale, listSales } from '../services/SalesService'
import{useNavigate} from 'react-router-dom'


const ListSaleComponent = () => {

    const [sales, setSales] = useState([])

    const navigator = useNavigate()
    
    useEffect(() => {
        getAllSales();

    }, [])

    function addNewSale(){
        navigator('/add-sale')
    }

    function updateSales(id){
        navigator(`/edit-sales/${id}`)

    }
    function getAllSales(){
        listSales().then((response) => {
            setSales(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function removeSale(id){
        console.log(id);

        deleteSale(id).then((response) => {
            getAllSales();

        }).catch(error => {
            console.error(error);
        })

    }

  return (
    <div className="container bg-light-green py-4 rounded shadow">
  <h1 className="text-green mb-4 text-center">List of Sales</h1>

  <div className="d-flex justify-content-end mb-3">
    <button className="btn btn-green" onClick={addNewSale}>Add Sale</button>
  </div>

  <div className="table-responsive">
    <table className="table table-striped table-bordered align-middle">
      <thead className="table-success text-center">
        <tr>
          <th>Sales ID</th>
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
          sales.map((sales) => (
            <tr key={sales.id} className="text-center">
              <td>{sales.id}</td>
              <td>{sales.customer_name}</td>
              <td>{sales.product_name}</td>
              <td>{sales.unit_price}</td>
              <td>{sales.quantity}</td>
              <td>{sales.price}</td>
              <td>{sales.date}</td>
              <td>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-info btn-sm" onClick={() => updateSales(sales.id)}>Update</button>
                  <button className="btn btn-danger btn-sm" onClick={() => removeSale(sales.id)}>Delete</button>
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

export default ListSaleComponent