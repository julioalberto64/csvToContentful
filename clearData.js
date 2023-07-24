import fs from "fs";
import csv from "fast-csv";

const entries = [];
const lang = "es";


const contentType = process.argv[2];

if (!contentType) {
    throw Error('content type required ar argument')
}

const originPath = "./inputs/data.csv";
const targetPath = "./inputs/data.json";

fs.createReadStream(originPath)
    .pipe(csv.parse({ headers: true }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
        Object.keys(row).forEach((key) => {
            if(key  =='productId'){
                row[key] = { [lang]: row[key] };
            }else{
                row[key] = { [lang]: isNaN(row[key])? row[key]: JSON.parse(row[key]) };
            }

        });
        entries.push({
            fields: row,
            sys: {
                contentType: {
                    sys: {
                        type: "Link",
                        linkType: "ContentType",
                        id: contentType,
                    },
                },
            },
        });
    })
    .on("end", () => {
        fs.writeFileSync(targetPath, JSON.stringify({ entries }, null, 2));
        console.log("success!");
    });
