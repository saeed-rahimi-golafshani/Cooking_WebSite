/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Blog:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   Image_Blog
 *                  -   category
 *                  -   tags
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of blog
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of blog
 *                  text: 
 *                      type: string
 *                      description: the text of blog
 *                  category: 
 *                      type: array
 *                      description: the category for fprienkey of blog
 *                  tags: 
 *                      type: array
 *                      description: the tags of blog
 *                  Image_Blog: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  source: 
 *                      type: array
 *                      description: the source of blog
 *          UpdateBlog:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of blog
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of blog
 *                  text: 
 *                      type: string
 *                      description: the text of blog
 *                  category: 
 *                      type: array
 *                      description: the category for fprienkey of blog
 *                  tags: 
 *                      type: array
 *                      description: the tags of blog
 *                  Image_Blog: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  source: 
 *                      type: array
 *                      description: the source of blog
 */
/**
 * @swagger
 *  definitions:
 *      ListOfblog:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      Blog:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  author: 
 *                                      type: string
 *                                      example: "author of blog"
 *                                  title:
 *                                      type: string
 *                                      example: "title of blog"
 *                                  text:
 *                                      type: string
 *                                      example: "summary text of blog"
 *                                  short_text:
 *                                      type: string
 *                                      example: "summary text of blog"
 *                                  category: 
 *                                      type: string
 *                                      example: "text of blog"
 *                                  images: 
 *                                      type: array
 *                                      items: 
 *                                          type: string
 *                                          example: "image of blog" 
 *                                  tags: 
 *                                      type: array
 *                                      items: 
 *                                          type: string
 *                                          example: "tags of blog"
 *                                  source: 
 *                                      type: array
 *                                      items: 
 *                                          type: string
 *                                          example: "source of blog"
 */

/**
 * @swagger 
 *  /admin/blog/create:
 *      post:
 *          tags: [AdminAuthentication_Blog]
 *          summary: create blog document 
 *          consumer: 
 *              -   multipart/form-data
 *              -   application/x-www-form-data-urlencoded
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/Blog'
 *          responses: 
 *                  201:
 *                      description: CREATED
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition' 
 */
/**
 * @swagger 
 *  /admin/blog/list:
 *      get: 
 *          tags: [AdminAuthentication_Blog]
 *          summary: get listof blog without Id
 *          responses: 
 *                  201:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfblog'
 */
/**
 * @swagger 
 *  /admin/blog/list/{id}:
 *      get: 
 *          tags: [AdminAuthentication_Blog]
 *          summary: get listof blog with Id
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  201:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfblog'
 */
/**
 * @swagger 
 *  /admin/blog/update/{id}:
 *      patch:
 *          tags: [AdminAuthentication_Blog]
 *          summary: upadte blog document 
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody:
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/UpdateBlog'
 *          responses: 
 *                  201:
 *                      description: CREATED
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition' 
 */
/**
 * @swagger 
 *  /admin/blog/remove/{id}:
 *      delete:
 *          tags: [AdminAuthentication_Blog]
 *          summary: delete blog document 
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          responses: 
 *                  201:
 *                      description: CREATED
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/PublicDefinition' 
 */