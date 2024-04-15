const data = require('./ak.js');
const fs = require('fs');
const path = require('path');

function start() {
    const projectListingRelation = {};

    data.forEach(item => {
        if(!projectListingRelation[item.project]){
            projectListingRelation[item.project] = [];
        }

        const listings = item.developerSales;
        projectListingRelation[item.project].push(...listings);
    })

    fs.writeFileSync(path.join(__dirname, 'projectListingRelation.ts'), `export default const projectRelation = ${JSON.stringify(projectListingRelation)}`);

}
start();