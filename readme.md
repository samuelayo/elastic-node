# Real-time Search Engine with Node.js, Vue.js and Elasticsearch

## Getting Started

- Clone this repo
```
git clone https://github.com/samuelayo/elastic-node.git


```
- change directory into the newly cloned repo
```
cd elastic-node
```
- Install required node.js libraries
```
npm install
```
Now the first part of your environment is set up. However, elasticsearch itself is missing from your setup. You will need to install elasticsearch itself. 
There are different ways to install Elastic search. If you are using a debian linux operating system, you could just download the `.deb` file and install using `dpkg`.
```bash
//download the deb package
curl -L -O https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.6.4.deb
//install the deb package using dpkg
sudo dpkg -i elasticsearch-5.6.4.deb
```
For other distributions/operating systems, you can find a guide on how to install elasticsearch [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)
Elasticsearch is not started automatically after installation. Elasticsearch can be started and stopped using the service command:
```bash
sudo -i service elasticsearch start
sudo -i service elasticsearch stop
```
To configure Elasticsearch to start automatically when the system boots up, run the following commands:
```bash
sudo /bin/systemctl daemon-reload
sudo /bin/systemctl enable elasticsearch.service
```
After running the above command, Elasticsearch can be started and stopped as follows:
```bash
sudo systemctl start elasticsearch.service
sudo systemctl stop elasticsearch.service
```
To check the status of Elasticsearch:
```bash
sudo service elasticsearch status
```

##  Solving `CORS` issue 

To solve this issue, locate your Elasticsearch config file (For Debian/ubuntu, it can be found at `/etc/elasticsearch/elasticsearch.yml`. For other operating systems, find out where it is located [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/settings.html)) and add the following to the bottom of the file:**
```yaml
http.cors.enabled : true
http.cors.allow-origin : "*"
```
After that is done, restart your elasticsearch instance
```bash
sudo service elasticsearch restart
```

## Test the DEMO

- Serve the app

```
node index.js
```

- Test the Server side search
Navigate to `http://localhost:3001/`

- Test the Client side Search
Navigate to `http://localhost:3001/v2`


