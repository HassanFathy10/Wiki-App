import { useEffect, useState } from 'react';
import usePrevState from './hooks/usePrevState';
import axios from 'axios';

export default function App() {
    const [term, setTerm] = useState('React.js');
    const [result, setResult] = useState([]);
    const prevTerm = usePrevState(term);
    

    useEffect(() => {
        const search = async () => {
            const respond = await axios.get('https://en.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: term,
                },
            });
            setResult(respond.data.query.search);
        };
        if (!result.length) {
            if (term) {
                search();
            }
        } else if (prevTerm !== term) {
            const debounceSearch = setTimeout(() => {
                if (term) {
                    search();
                }
            }, 2000);
            return () => {
                clearTimeout(debounceSearch);
            };
        }
    }, [term, result.length, prevTerm]);

    const fetchResult = result.map((el) => {
        return (
            <tr key={el.pageid}>
                <td className='text-primary fw-bold'>-</td>
                <td>{el.title}</td>
                <td>
                    <span dangerouslySetInnerHTML={{ __html: el.snippet }} />
                </td>
            </tr>
        );
    });

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <div className='my-3'>
                        <label htmlFor='exampleFormControlInput1' className='form-label fs-3 fw-bold'>
                            Search Input
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            id='exampleFormControlInput1'
                            onChange={(e) => setTerm(e.target.value)}
                            value={term}
                        />
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='col'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col' className='text-primary'>#</th>
                                <th scope='col' className='text-primary'>Title</th>
                                <th scope='col' className='text-primary'>Description</th>
                            </tr>
                        </thead>
                        <tbody>{fetchResult}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};