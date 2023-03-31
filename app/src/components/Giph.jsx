import React, { useState, useEffect } from 'react';
import { useQuery} from "urql";

const Giph = ({ tags }) => {
    const [objects, setObjects] = useState([]);
    const [currentObject, setCurrentObject] = useState(null);

    const [result, reexecuteQuery] = useQuery({
        query: `
      query MyQuery($_in: [String!]) {
          gifs(where: {category: {_in: $_in}}, limit: 10, offset: 10000) {
            id
            category
            url
          }
        }
    `,
        variables: { _in: tags },
        pause: !tags,
    });

    useEffect(() => {
        if (!result.data) return;
        setObjects(result.data.gifs);
    }, [result.data]);

    useEffect(() => {
        console.log([objects])
        if (!objects.length) return;
        setCurrentObject(objects[Math.floor(Math.random() * objects.length)]);
    }, [objects]);

    useEffect(() => {
        const interval = setInterval(() => {
            reexecuteQuery();
        }, 100);

        return () => clearInterval(interval);
    }, [reexecuteQuery]);

    if (result.fetching) return <div>Loading...</div>;
    if (result.error) return <div>Error: {result.error.message}</div>;
    if (!currentObject) return <div>No objects found.</div>;

    return (
        <div>
            <h2>{currentObject.category}</h2>
            <img src={currentObject.url} alt={currentObject.category} />
        </div>
    );
};

export default Giph;