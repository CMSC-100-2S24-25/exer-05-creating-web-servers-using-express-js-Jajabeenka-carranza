import express from 'express';
import { appendFileSync } from 'node:fs';

// instantiate the server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(3000, () => { console.log("Server started at port 3000")} );

app.get('/find-by-isbn-author', (req, res) => {
    // res.send("Hello");
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