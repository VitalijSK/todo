import fs from 'fs';

class Main {
    home(req, res){
        res.writeHead(200, {'Content-Type': 'text/html'});
        const myReadStream = fs.createReadStream('./public/index.html', 'utf8');
        myReadStream.pipe(res);
    }
};
export const main = new Main();