import { useState } from "react";

export default function App() {
    return (
        <div className="container">
            <div className="row">
                <div className="my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Search Input</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1"></input>
                </div>
            </div>
        </div>
    );
};