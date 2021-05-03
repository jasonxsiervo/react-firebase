import React, { useState, useEffect } from 'react';
import ContactForm from "./ContactForm";
import firebaseDb from '../firebase';

const Contacts = () => {

    const [contactObjects, setContactObjects] = useState(0);
    const [currentId, setCurrentId] = useState('');

    useEffect(() => {
        console.log('triggered')

        firebaseDb.child('Contacts').on('value', snapshot => {
            if (contactObjects == 0) {
                setContactObjects({
                    ...snapshot.val()
                })
            }
        })
    }, [])

    const addOrEdit = (obj) => {
        console.log(addOrEdit);
        if (!currentId) {
            console.log('save');
            firebaseDb.child('Contacts').push(
                obj,
                err => { if (err) { console.log('error: ', err) } }
            )
        } else {
            console.log('edit');
            firebaseDb.child(`Contacts/${currentId}`).set(
                obj,
                err => { if (err) { console.log('error: ', err) } }
            )
        }
        setCurrentId('');
    }

    const deleteContact = (id) => {
        if (window.confirm('Are you sure you wanted to delete this item?')) {
            firebaseDb.child(`Contacts/${id}`).remove(
                err => { if (err) { console.log('error: ', err) } }
            )
            setCurrentId('');
        }
    }

    return (
        <>
            <div className="jumbotron">
                <h1 className="display-4 text-center">Contact Registration</h1>
            </div>
            <div className="row">
                <div className="col-md-5">
                    <ContactForm {...({ addOrEdit, currentId, contactObjects })} />
                </div>
                <div className="col-md-7">
                    <table className="table table-borderless table-stripped">
                        <thead className="thad-light">
                            <tr>
                                <th>Full Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    return (
                                        <tr key={id}>
                                            <td>{contactObjects[id].fullname}</td>
                                            <td>{contactObjects[id].mobile}</td>
                                            <td>{contactObjects[id].email}</td>
                                            <td>
                                                <a className="btn text-primary" onClick={() => setCurrentId(id)}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                </a>
                                                <a className="btn text-danger" onClick={() => deleteContact(id)}>
                                                    <i className="fas fa-trash-alt"></i>
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default Contacts;
