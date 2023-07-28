import { useEffect, useState } from "react";
import axios from "axios";
    
export default function App() {
    const [term, setTerm] = useState("");
    const [result, setResult] = useState([]);

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
            setResult(respond.data.query.search);
        };

        const debounceSearch = setTimeout(() => {
            if (term) {
                search();
            };
        }, 1200);

        return () => {
            clearTimeout(debounceSearch);
        }
    }, [term]);
    
    const fetchResult = result.map((el) => {
        return (
            <tr key={el.pageid}>
                <th>-</th>
                <td>{el.title}</td>
                <td><span dangerouslySetInnerHTML={{__html: el.snippet}}></span></td>
            </tr>
        );
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
                            {fetchResult}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};