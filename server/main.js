import express from 'express';
import compression from 'compression'
import { sitemap } from './sitemap.js'
import { handler } from '../build/handler.js';

async function main() {
    const app = express();
    app.use(compression());
    app.use(await sitemap());
    app.use(handler);
    app.use(function (req, res, next) {
        res.setHeader('Cache-Control', 'max-age 3600, must-revalidate');
        next();
    });
    app.listen(3000, () => {
        console.log('Listening on http://0.0.0.0:3000');
    });
}

main();