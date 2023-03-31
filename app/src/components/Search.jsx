
import React, { useState, useEffect  } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { createClient, gql, Provider, useQuery } from 'urql';
import './style.css';
import Giph from "./Giph.jsx";

const client = createClient({
    url: 'http://localhost:8080/v1/graphql',
});

const KeyCodes = {
    comma: 188,
    enter: 13
};

const initial = [{
    "id": "cat",
    "text": "cat"
},
    {
        "id": "dog",
        "text": "dog"
    },
    {
        "id": "elephant",
        "text": "elephant"
    },
    {
        "id": "lion",
        "text": "lion"
    },
    {
        "id": "monkey",
        "text": "monkey"
    }];

const delimiters = [KeyCodes.comma, KeyCodes.enter];
export default function Search(props) {

    const [tags, setTags] = React.useState(initial);
    const [suggestions, setSuggestions] = React.useState(initial);

    useEffect(() => {
        const query = gql`
        {
           gifs(distinct_on: category) {
                category
            }
        }
`;

        client.query(query).toPromise().then(result => {
            setTags(result.data.gifs.map(gif => {
                return{
                    id: gif.category,
                    text: gif.category
                };
            }));
            setSuggestions(result.data.gifs.map(gif => {
                return{
                    id: gif.category,
                    text: gif.category
                };
            }));
        }).catch(error => {
            console.error(error);
        });
    }, []);

    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        // re-render
        setTags(newTags);
    };

    const handleTagClick = (index) => {
        console.log('The tag at index ' + index + ' was clicked');
    };
    return (
        <div className="app">
            <div>
                <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    delimiters={delimiters}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    inputFieldPosition="bottom"
                    minQueryLength={1}
                    autocomplete
                    editable
                />
            </div>
            <Giph tags ={tags.map((obj) => obj.text)}/>
        </div>
    );

}