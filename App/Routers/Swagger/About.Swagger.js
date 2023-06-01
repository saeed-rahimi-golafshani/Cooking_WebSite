/**
 * @swagger
 *  definitions:
 *      ListOfAbout:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      About:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  title:
 *                                      type: string
 *                                      example: "title of about"
 *                                  text:
 *                                      type: string
 *                                      example: "summary text of about"
 *                                  category: 
 *                                      type: string
 *                                      example: "text of about"
 *                                  image: 
 *                                      type: string
 *                                      example: "image of about"
 *      UpdateOfAbout:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      About:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  messaege: 
 *                                      type: string
 *                                      example: "آیتم مورد نظر با موفقیت به روز رسانی شد"                   
 *      DeleteOfAbout:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      About:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  messaege: 
 *                                      type: string
 *                                      example: "آیتم مورد نظر با موفقیت حذف شد"  
 */
/**
 * @swagger 
 *  components:
 *      schemas:
 *          CreateAbout: 
 *              type: object
 *              required: 
 *                  -   title
 *                  -   text
 *                  -   category
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of About
 *                  text: 
 *                      type: string
 *                      description: the Text of About
 *                  category: 
 *                      type: string
 *                      description: the Text of About
 *                  Image_About: 
 *                      type: string
 *                      format: binary
 *          UpadteAbout: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of About
 *                  text: 
 *                      type: string
 *                      description: the Text of About
 *                  category: 
 *                      type: string
 *                      description: the Text of About
 *                  Image_About: 
 *                      type: string
 *                      format: binary
 */
/**
 * @swagger 
 *  /admin/about/create: 
 *      post: 
 *          tags: [AdminAuthentication_About]
 *          summary: create About In admin panel
 *          description: create About in admin panel
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/CreateAbout'             
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateAbout'
 *          responses: 
 *                  201:
 *                      description: CREATED
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition'
 * 
 *                
 *                         
 *                 
 */
/**
 * @swagger 
 *  /admin/about/list:
 *      get:
 *          tags: [AdminAuthentication_About]
 *          summary: get list of about without courseId
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfAbout'
 */
/**
 * @swagger 
 *  /admin/about/update/{id}: 
 *      patch: 
 *          tags: [AdminAuthentication_About]
 *          summary: update About In admin panel
 *          description: update About in admin panel
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:              
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpadteAbout'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/UpdateOfAbout'
 * 
 *                
 *                         
 *                 
 */
/**
 * @swagger 
 *  /admin/about/delete/{id}: 
 *      delete: 
 *          tags: [AdminAuthentication_About]
 *          summary: delete About In admin panel
 *          description: delete About in admin panel
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/DeleteOfAbout'
 * 
 *                
 *                         
 *                 
 */