import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DSviewall.css';

function AlgorithmDetail() {
    const { name } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`https://platform-dsa-1.onrender.com/api/algorithm/${name}`)
            .then(response => response.json())
            .then(data => setContent(data.content))
            .catch(error => console.error('Error fetching data:', error));
    }, [name]);

    return (
        <div className="dataStructureDetail">
            <div className='dsname'>{name}</div>
            <div className='dscontent' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}

export default AlgorithmDetail;
