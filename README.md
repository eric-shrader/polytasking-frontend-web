# polytasking-frontend-web

This is the web client code for my full-stack web app, Polytasking. It is an app that keeps track of people's tasks and helps people manage their lives.

# tech stack

the front end is built using React. It is a single-page application(SPA) using react-router-dom for routing. The Auth0 platform with OpenID Connect and OAuth 2.0 authorization code grant flow with PKCE is used with their React SDK for authentication and authorization. Font Awesome is used for icons. Animate.css is used for transitions and CSS loader is used for loaders. If you adapt this project for yourself, you will need to set up an account on Auth0, configure the authentication and authorization using their dashboard, and replace the domain and client ID with yours. Alternatively, you can use a different solution for authentication and authorization.

# deployment

The web client is deployed using AWS Cloudfront as a CDN with the static files stored in a S3 bucket. If you decide to adapt and deploy your own version of the project, you may use the same model I use or feel free to deploy however you would like. (:
