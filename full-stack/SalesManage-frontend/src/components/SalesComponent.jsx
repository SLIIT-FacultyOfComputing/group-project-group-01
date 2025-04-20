import React, { useState, useEffect } from 'react'
import { createSale, getSale, updateSale } from '../services/SalesService'
import { useNavigate, useParams } from 'react-router-dom'

const SalesComponent = () => {
    const [customer_name, setCustomerName] = useState('')
    const [product_name, setProductName] = useState('')
    const [unit_price, setUnitPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [date, setDate] = useState('')

    const { id } = useParams()
    const [errors, setErrors] = useState({
        customer_name: '',
        product_name: '',
        unit_price: '',
        quantity: '',
        price: '',
        date: ''
    })

    const navigator = useNavigate()

    useEffect(() => {
        if (id) {
            getSale(id).then((response) => {
                setCustomerName(response.data.customer_name)
                setProductName(response.data.product_name)
                setUnitPrice(response.data.unit_price)
                setQuantity(response.data.quantity)
                setPrice(response.data.price)
                setDate(response.data.date)
            }).catch(error => {
                console.error(error)
            })
        }
    }, [id])

    function saveOrupdateSale(e) {
        e.preventDefault()

        if (validateForm()) {
            const sale = { customer_name, product_name, unit_price, quantity, price, date }
            console.log(sale)

            if (id) {
                updateSale(id, sale).then((response) => {
                    console.log(response.data)
                    navigator('/sales')
                }).catch(error => {
                    console.error(error)
                })
            } else {
                createSale(sale).then((response) => {
                    console.log(response.data)
                    navigator('/sales')
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    }

    function validateForm() {
        let valid = true
        const errorscopy = { ...errors }

        if (customer_name.trim()) {
            errorscopy.customer_name = ''
        } else {
            errorscopy.customer_name = 'Customer name is required'
            valid = false
        }

        if (product_name.trim()) {
            errorscopy.product_name = ''
        } else {
            errorscopy.product_name = 'Product name is required'
            valid = false
        }

        if (String(quantity).trim()) {
            errorscopy.quantity = ''
        } else {
            errorscopy.quantity = 'Quantity is required'
            valid = false
        }

        if (String(price).trim()) {
            errorscopy.price = ''
        } else {
            errorscopy.price = 'Price is required'
            valid = false
        }

        setErrors(errorscopy)
        return valid
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center mb-4'>Update Sale</h2>
        } else {
            return <h2 className='text-center mb-4'>Add Sale</h2>
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light-green">
        <div className="row w-100">
        <div className="card col-md-6 mx-auto shadow-lg rounded-4 bg-light-green card-body-custom">
            {pageTitle()}
            <div className="card-body p-4">
                <form>
                    <div className="form-group mb-3">
                        <label className="form-label text-green">Customer Name</label>
                        <input
                            type="text"
                            placeholder="Enter customer name"
                            name="customer_name"
                            value={customer_name}
                            className={`form-control ${errors.customer_name ? 'is-invalid' : ''}`}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                        {errors.customer_name && <div className="invalid-feedback">{errors.customer_name}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label text-green">Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            name="product_name"
                            value={product_name}
                            className={`form-control ${errors.product_name ? 'is-invalid' : ''}`}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                        {errors.product_name && <div className="invalid-feedback">{errors.product_name}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label text-green">Unit Price</label>
                        <input
                            type="text"
                            placeholder="Enter unit price"
                            name="unit_price"
                            value={unit_price}
                            className="form-control"
                            onChange={(e) => setUnitPrice(e.target.value)}
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label text-green">Quantity</label>
                        <input
                            type="text"
                            placeholder="Enter quantity"
                            name="quantity"
                            value={quantity}
                            className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label text-green">Price</label>
                        <input
                            type="text"
                            placeholder="Enter price"
                            name="price"
                            value={price}
                            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
                    </div>

                    <div className="form-group mb-4">
                        <label className="form-label text-green">Date</label>
                        <input
                            type="text"
                            placeholder="Enter date"
                            name="date"
                            value={date}
                            className="form-control"
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    <button className="btn btn-green w-100" onClick={saveOrupdateSale}>Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
    )
}
export default SalesComponent
