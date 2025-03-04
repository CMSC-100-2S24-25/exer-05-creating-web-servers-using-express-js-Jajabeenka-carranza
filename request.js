import needle from 'needle';

const book1 = {
    book_name: "Harry Potter and the Philosopher's Stone",
    isbn: "978-0-7475-3269-9",
    author: "J.K Rowling",
    year_published: "1997"
}

const book2 = {
    book_name: "Harry Potter and the Chamber of Secrets",
    isbn: "0-7475-3849-2",
    author: "J.K Rowling",
    year_published: "1998"
}

const book3 = {
    book_name: "The Little Prince",
    isbn: "978-0156012195",
    author: "Antoine Saint-Exupery",
    year_published: "1943"
}

// needle.get('http://localhost:3000/', (err, res) => {
//     console.log(res.body);
// })

needle.post(
    'http://localhost:3000/add-book',
    book1,
    (err, res) => {
        console.log(res.body);
    }
)

needle.post(
    'http://localhost:3000/add-book',
    book2,
    (err, res) => {
        console.log(res.body);
    }
)

needle.post(
    'http://localhost:3000/add-book',
    book3,
    (err, res) => {
        console.log(res.body);
    }
)