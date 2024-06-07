const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Welcome to the Book API');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
