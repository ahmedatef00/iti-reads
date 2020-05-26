import React, { useState } from "react";
import StarRatingComponent from "react-star-rating-component";
import Shelves from "./changeShelf";
import axios from 'axios';

const BookData = (props) => {
    const { index, item } = props;
    const [rating, setRating] = useState(item.myRate);

    const onStarClick = async (nextValue) => {
        setRating(nextValue);
        console.log(rating, nextValue);
        
        try {
            await axios.patch('http://localhost:5000/users/mybooks/edit',
                { itemID: item._id, fieldName: "myRate", fieldValue: nextValue },
                {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem("token")
                    }

                });

        } catch (error) {
            console.log(error);

        }
    };
    return (
        <tr key={index}>
            <th>{item.book.cover}</th>
            <td>{item.book.name}</td>
            <td>
                {item.book.author.firstName[0].toUpperCase() +
                    ". " +
                    item.book.author.lastName}
            </td>
            <td>
                <StarRatingComponent
                    name="avgRate"
                    editing={false}
                    starCount={5}
                    value={item.book.averageRating}
                />
            </td>
            <td>
                <StarRatingComponent
                    name="myRate"
                    starCount={5}
                    value={rating}
                    onStarClick={onStarClick}
                />
            </td>
            <td>
                <Shelves
                    currentItemID={item._id}
                    currentShelf={item.shelf}
                    handleShelfChange={props.handleShelfChange}
                />
            </td>
        </tr>
    );
};

export default BookData;
