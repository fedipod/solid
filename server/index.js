const solid = require('solid-server');

const port = process.env.PORT || 3000;
const serverUri = process.env.RENDER_EXTERNAL_URL || `http://localhost:${port}`;

const ldp = solid.createServer({port,serverUri});

ldp.listen(port, () => {
    console.log(`Listening on port ${port} url: ${serverUri}`)
});
