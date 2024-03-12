import React  from 'react';
import Spinner from 'react-bootstrap/Spinner';
import "bootstrap/dist/css/bootstrap.min.css";


export default function Loader() {
    return (
        <div className="px-3">
            <div className="text-center">
                <Spinner animation="border"  role="status" />
                <div className="h3 mt-3">Loading...</div>
            </div>
        </div>

    )
}