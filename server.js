import express from 'express';
import { appendFileSync } from 'node:fs';
import fs from 'fs';

// instantiate the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => { console.log("Server started at port 3000")} );

//find by isbn and author
app.get('/find-by-isbn-author', (req, res) => {
    //destructure request body
    const {isbn, author} = req.query

    //read the file synchronously
    try {
        const data = fs.readFileSync('books.txt', 'utf8');
        const lines = data.split("\n");

        //if isbn is present then we only need to find one book since isbn is unique
        if (isbn) {
            //iterate
            lines.forEach((lines, index) => {
                var details = lines.split(",");
                //if isbn matches then we create an object named book with all the book details
                if (isbn == details[1]) {
                    const book = {
                        book_name: details[0],
                        isbn,
                        author,
                        year_published: details[3]
                    }
                    //send book
                    res.send(book);
                }
            })
        }
        //if no isbn then we send an empty object
        else {
            res.send({});
        }
    }
    //if file doesn't exist then return success: false
    catch (err) {
        res.send({ success: false })
    }

    
    

});

//find by isbn and author
app.get('/find-by-author', (req, res) => {
    //destructure request body
    const {author} = req.query

    //read the file synchronously
    try {
        const data = fs.readFileSync('books.txt', 'utf8');
        const lines = data.split("\n");

        //container of all results
        var result = [];

        //check if author is not null
        if (author) {
            //iterate
            lines.forEach((lines, index) => {
                var details = lines.split(",");
                //if author matches then we create an object named book with all the book details
                if (author == details[2]) {
                    const book = {
                        book_name: details[0],
                        isbn: details[1],
                        author,
                        year_published: details[3]
                    }

                    result.push(book);
                }
            })
        }
        //send the array of objects
        res.send({books: result});
    }
    //if file doesn't exist then return success: false
    catch (err) {
        res.send({ success: false })
    }
});

app.post('/add-book', (req, res) => {

    //destructure request body
    const {book_name, isbn, author, year_published} = req.body;
    //check if all are non-empty or null
    if (book_name && isbn && author && year_published) {
        //append to books.txt
        appendFileSync('books.txt', `${book_name},${isbn},${author},${year_published}\n`);
        res.send({ success: true });
    }
    else {
        res.send({ success: false });
    }

})