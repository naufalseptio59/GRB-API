const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

router.get('/book', controller.getAllBooks);
router.get('/book/id/:bookid', controller.getBookById);
router.post('/book', controller.createBook);
router.put('/book/:bookid', controller.updateBook);
router.delete('/book/:bookid', controller.deleteBook);
router.get('/book/title/:booktitle', controller.getBooksByTitle);
router.get('/book/author/:authorname', controller.getBooksByAuthor);
router.get('/book/language/:booklanguage', controller.getBooksByLanguage);
router.get('/wishlist', controller.getAllWishlists);
router.get('/wishlist/id/:wishlistid', controller.getWishlistById);
router.post('/wishlist', controller.createWishlist);
router.put('/wishlist/:wishlistid', controller.updateWishlist);
router.delete('/wishlist/:wishlistid', controller.deleteWishlist);
router.get('/wishlist/customer/:customername', controller.getWishlistByCustomer);
router.get('/wishlist/book/:booktitle', controller.getWishlistByBook);

module.exports = router;
