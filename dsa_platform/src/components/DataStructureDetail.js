import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './DSviewall.css';

function DataStructureDetail() {
    const { name } = useParams();
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`/api/data-structure/${name}`)
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

export default DataStructureDetail;
