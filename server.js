const express = require('express');
const app = express();
const route = require('./routes/route');

app.use(express.json());
app.use('/api', route);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to Good Reading Bookstore');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
