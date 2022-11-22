# Song viewer service

This is a REST service API created using [fastify](https://github.com/fastify). This API exposes the endpoints needed by [Song viewer](https://github.com/lasmil/song-viewer) for it to function. 

## Dev

Before running the service, make sure that you have installed the dependencies by running `npm install`.

To run the service locally, run the following command:

```bash
npm start
```

The service will be available at your localhost on port 3001 by default.

If you want to test the service, you can either use [Postman](https://www.postman.com/) or use the React Native app [Song viewer](https://github.com/lasmil/song-viewer).

If you choose to use the React Native app, you will need to change the `BACKEND_API` (in the `.env` file) in the React Native app to point to your localhost. This is not easy to do on emulators or physical devices, but you can use [ngrok](https://ngrok.com/) to expose your localhost to the internet.

## Production

This service is deployed on [Vercel](https://vercel.com). The production version is available at https://song-viewer-service.vercel.app/. The production version is used by the React Native app.

## API
1. POST `/api/getSongDuration`
    - Request body (FormData):
        ```
        {
            "song": <file>
        }
        ```
    - Response body:
        ```JSON
        {
            "duration": <number>
        }
        ```

2. POST `/api/getFrequencyArray`
    - Request headers:
        ```
        {
            "songpart": <number>,
            "totalparts": <number>
        }
        ```
    - Request body (FormData):
        ```
        {
            "song": <file>,
        }
        ```
    - Response body:
        ```JSON
        {
            "frequencyArray": <number[]>
        }
        ```

3. GET `/api/health`
    - Response body:
        ```JSON
        {
            "status": "ok"
        }
        ```
    - this is not used at the moment but will be used in the future to check the health of the service

## Future work

- Add tests
- Add authentication - currently the service is not protected and anyone can access it (maybe use an API key)
- Add a database - currently the service is always running an expensive query to get the pitch data for a song. This is not ideal and it would be better to store the pitch data in a database and only run the expensive query once.
- Optimize the frequency extraction algorithm - currently the algorithm is not very efficient and it takes a long time to extract the frequencies for a song. It would be better to optimize the algorithm so that it is faster
- Filter out the frequencies that are not needed - currently the algorithm extracts all the frequencies for a song. It would be better to filter out the frequencies that are not needed (maybe use a threshold)


## Contributing

If you want to contribute to this project feel free to open a PR. If you want to discuss something, open an issue.

## License

This project is licensed under the terms of the [MIT license](https://mit-license.org/).
