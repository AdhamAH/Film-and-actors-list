# Film-and-actors-list
 
## Run the app as docker image:

To build the containers, run

````shell
docker-compose build
````
In order to be able to build it, you need to provide this info in `.env`
file, this is an example :
````dotenv
NODE_ENV= development
CLIENT_URL = http://localhost
PORT = 4000
KEY = 66556A586E3272357538782F413F4428472D4B6150645367566B597033733676
IV = f054600ba4d142e5bd99fceff053c778
SECRET = 5266556A586E3272357538782F412544
````
Then you can use `docker-compose up` to see the logs or `docker-compose up -d`

### To run a specific container 
If you want to only run one of the container like the `redis` container for example run
````shell
docker-compose up redis
````

### To stop
All the containers `docker-compose down`

or to stop specific container `docker-compose down client`

### After making changes
If you make changes to one of the builds you need to rebuild. SO if changes made to the server you need to run 

`docker-compose build server`