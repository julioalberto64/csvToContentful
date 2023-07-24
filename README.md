### pre

1. install contentful-cli (https://www.contentful.com/developers/docs/tutorials/cli/)
```bash
npm install -g contentful-cli
```

2. authenticate
```bash
contentful login
```

3. configure <code>config/import.json</code>


### steps

1. npm install (or yarn install)

2. download csv file to inputs/data.csv

3. convert csv to json 
contentType must be the contentType id
```bash
node clearData.js {contentType}

node clearData.js lyPackages

```


4. finally, import data  to contentful space
```bash
contentful space import --config config/import.json
```
