const pool = require('../services/database');

exports.getAllBooks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM book');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM book WHERE bookid = $1', [req.params.bookid]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { bookid, booktitle, authorname, booklanguage, publicationyear, pages } = req.body;
        const result = await pool.query(
            'INSERT INTO book (bookid, booktitle, authorname, booklanguage, publicationyear, pages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [bookid, booktitle, authorname, booklanguage, publicationyear, pages]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const { bookid, booktitle, authorname, booklanguage, publicationyear, pages } = req.body;
        const result = await pool.query(
            'UPDATE book SET bookid = $1, booktitle = $2, authorname = $3, booklanguage = $4, publicationyear = $5, pages = $6 WHERE bookid = $7 RETURNING *',
            [bookid, booktitle, authorname, booklanguage, publicationyear, pages, req.params.bookid]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM book WHERE bookid = $1', [req.params.bookid]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBooksByTitle = async (req, res) => {
    try {
        const { booktitle } = req.query;
        const result = await pool.query('SELECT * FROM book WHERE booktitle = $1', [req.params.booktitle]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'No books found with this title' });
        }
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBooksByAuthor = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM book WHERE authorname = $1', [req.params.authorname]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBooksByLanguage = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM book WHERE booklanguage = $1', [req.params.booklanguage]);
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllWishlists = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM wishlist');
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWishlistById = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM wishlist WHERE wishlistid = $1', [req.params.wishlistid]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Wishlist not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createWishlist = async (req, res) => {
    try {
        const { wishlistid, customername, booktitle } = req.body;
        const result = await pool.query(
            'INSERT INTO wishlist (wishlistid, customername, booktitle) VALUES ($1, $2, $3) RETURNING *',
            [wishlistid, customername, booktitle]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateWishlist = async (req, res) => {
    try {
        const { wishlistid, customername, booktitle } = req.body;
        const result = await pool.query(
            'UPDATE wishlist SET customername = $2, booktitle = $3 WHERE wishlistid = $1 RETURNING *',
            [wishlistid, customername, booktitle, req.params.wishlistid]
        );
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Wishlist not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteWishlist = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM wishlist WHERE wishlistid = $1', [req.params.wishlistid]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Wishlist not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWishlistByCustomer = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM wishlist WHERE customername = $1', [req.params.customername]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getWishlistByBook = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM wishlist WHERE booktitle = $1', [req.params.booktitle]);
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};