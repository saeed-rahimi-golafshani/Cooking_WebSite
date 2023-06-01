const express = require("express");
const path = require("path");
const morgan = require("morgan");
const http = require("http");
const { default: mongoose } = require("mongoose");
const createHttpError = require("http-errors");
const { AllApiRoutes } = require("./Routers/Router");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const cors = require("cors");

module.exports = class Application{
    #app = express();
    #PROT;
    #DB_URL;
    constructor(Port, Db_Url){
        this.#PROT = Port;
        this.#DB_URL = Db_Url;
        this.configApplication();
        this.initRedis();
        this.connectedToMongoDb();
        this.createServer();
        this.createRoutes();
        this.errorHandler();
    }
    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended: true}));
        this.#app.use(express.static(path.join(__dirname, "..", "Public")));
        this.#app.use(cors());
        this.#app.use(morgan("dev"));
        this.#app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(
            swaggerJsDoc({
                swaggerDefinition: {
                    openapi: "3.0.0",
                    info : {
                        title: "Cooking Website",
                        version: "2.0.0",
                        description: "یک وب سایت خوش مزه، به وب سایت سرآشپز خوش آمدید"
                    },
                    servers : [{
                        url : `http://localhost:${this.#PROT}`
                    }],
                    components:{
                        securitySchemes:{
                            BearerAuth:{
                                type: "http",
                                scheme: "bearer",
                                bearerFormat: "JWT" 
                            }
                        }
                    },
                    security: [{BearerAuth: []}]
                },
                apis: ["./App/Routers/**/*.js"]
            }), 
            {explorer: true}
            )
            )
    }
    initRedis(){
        require("./Utills/Init.Redis")
    }
    createServer(){ 
        http.createServer(this.#app).listen(this.#PROT, () =>{
            console.log("Run >< http://localhost:" + this.#PROT);
        }) 
    } 
    connectedToMongoDb(){
        mongoose.set('strictQuery', 'false')
        mongoose.connect(this.#DB_URL, (error) => {
            if(!error) return console.log("Application is connected to mongoDb...");
            return console.log("Application is not connected to mongoDb...");
        })
    }
    createRoutes(){
        this.#app.use(AllApiRoutes)
    }
    errorHandler(){
        this.#app.use((req, res, next) =>{
            next(createHttpError.NotFound("آدرس صفحه مورد نظر یافت نشد"))
        })
        this.#app.use((error, req, res, next) => {
            const servererror = createHttpError.InternalServerError();
            const statusCode = error?.status || servererror.status ;
            const message = error?.message || servererror.message
            return res.status(statusCode).send({
                errors : {
                    statusCode,
                    message
                }
            })
        })
    }
}   