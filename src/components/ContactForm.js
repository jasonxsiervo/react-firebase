import React, { useState, useEffect } from 'react';

const ContactForm = ({ addOrEdit, currentId, contactObjects }) => {
    const initialFieldValues = {
        fullname: '',
        mobile: '',
        email: '',
        address: ''
    }

    var [values, setValues] = useState(initialFieldValues);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addOrEdit(values);
    }

    useEffect(() => {
        if (currentId === '') {
            setValues({
                ...initialFieldValues
            })
        } else {
            setValues({
                ...contactObjects[currentId]
            })
        }
    }, [currentId])

    return (
        <div>
            <form autoComplete="off" onSubmit={handleFormSubmit}>
                <div className="form-group input-group col-md-6">
                    <div className="input-group-prepend">
                        <div className="input-group-text">
                            <i className="fas fa-user"></i>
                        </div>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name"
                        name="fullname"
                        value={values.fullname}
                        onChange={handleInputChange}
                    >
                    </input>
                </div>
                <div className="form-row">
                    <div className="form-group input-group col-md-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-mobile-alt"></i>
                            </div>
                        </div>
                        <input
                            className="form-control"
                            placeholder="Mobile Number"
                            name="mobile"
                            value={values.mobile}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group input-group col-md-3">
                        <div className="input-group-prepend">
                            <div className="input-group-text">
                                <i className="fas fa-envelope"></i>
                            </div>
                        </div>
                        <input
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            value={values.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            placeholder="Address"
                            name="address"
                            value={values.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-control">
                        <input type="submit" value={currentId ? 'Update' : 'Save'} className="btn btn-primary btn-block" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ContactForm;
