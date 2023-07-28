import { useEffect, useState } from "react";
import axios from "axios";
    
export default function App() {
    const [term, setTerm] = useState("");
    const [result, setResult] = useState("");

    useEffect(() => {
        const search = async () => {
            const respond = await axios.get("https://en.wikipedia.org/w/api.php", {
                params: {
                    action: "query",
                    list: "search",
                    origin: "*",
                    format: "json",
                    srsearch: term,
                },
            });
        };
        if (term) {
            search();
        };
    });

    return (
        <div className="container">
            <div className="row">
                <div className="my-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Search Input</label>
                    <input type="text" className="form-control" id="exampleFormControlInput1" onChange={(e) => setTerm(e.target.value)} value={term}></input>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Title</th>
                                <th scope='col'>Desc</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope='row'>1</th>
                                <td>title</td>
                                <td>Desc</td>
                            </tr>
                            <tr>
                                <th scope='row'>1</th>
                                <td>title</td>
                                <td>Desc</td>
                            </tr>
                            <tr>
                                <th scope='row'>1</th>
                                <td>title</td>
                                <td>Desc</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};