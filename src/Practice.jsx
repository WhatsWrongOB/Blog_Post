import React, { useState } from 'react';

const Practice = () => {

    const [img, setImg] = useState('');
    const [text, setText] = useState('');
    const [search, setSearch] = useState('');
    const [upload, setUpload] = useState([]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const addText = () => {
        if (text !== '') {
            setUpload([...upload, { text, img }]);
            setText('');
            setImg('');
        }
        else {
            alert('Please Add some text before posting')
        }
    };

    const deletePost = (index) => {
        const deletedPost = [...upload];
        deletedPost.splice(index, 1);
        setUpload(deletedPost);
    };

    const editPost = (index) => {
        const updatedPost = [...upload];
        const editedText = prompt('Edit post', updatedPost[index].text);

        if (editedText !== null && editedText !== undefined) {
            updatedPost[index] = { ...updatedPost[index], text: editedText };
            setUpload([...updatedPost]);
        }
    };

    const filteredBlogPost = upload.filter((post) => {
        const check = post.text.toLowerCase().includes(search.toLowerCase())
        return check
    })

    return (
        <div className='wrapper'>

            <input
                id='search'
                type="search"
                placeholder='Search post'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="container">

                <h1>My blog</h1>

                <input
                    type="text"
                    className='text'
                    placeholder='Add text'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <input
                    type="file"
                    className='file'
                    accept="image/*"
                    onChange={handleImageChange}
                />

                <button onClick={() => addText()} className='post_btn'>Post</button>

                {
                    upload.length === 0 || filteredBlogPost.length === 0 ? (<h3>No post found</h3>) : (

                        filteredBlogPost.map((item, index) => (
                            <div className="post" key={index}>
                                <img src={item.img} alt="img" />
                                <p>{item.text}</p>
                                <button onClick={() => deletePost(index)}>Delete</button>
                                <button onClick={() => editPost(index)}>Edit</button>
                            </div>
                        ))

                    )}
            </div>
        </div>
    );
};

export default Practice;
