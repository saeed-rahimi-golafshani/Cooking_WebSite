/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Create_Recipe:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   Image_Recipe
 *                  -   category
 *                  -   tags
 *                  -   Region_food
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Recipe
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of Recipe
 *                  text: 
 *                      type: string
 *                      description: the text of Recipe
 *                  category: 
 *                      type: string
 *                      description: the category for Recipe
 *                  Region_food:
 *                      type: string
 *                      description: the category for Recipe    
 *                  tags: 
 *                      type: array
 *                      description: the tags of Recipe
 *                  Image_Recipe: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  source: 
 *                      type: array
 *                      description: the source of Recipe
 *          Update_Recipe:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Recipe
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of Recipe
 *                  text: 
 *                      type: string
 *                      description: the text of Recipe
 *                  category: 
 *                      type: string
 *                      description: the category for Recipe
 *                  Region_food:
 *                      type: string
 *                      description: the category for Recipe    
 *                  tags: 
 *                      type: array
 *                      description: the tags of Recipe
 *                  Image_Recipe: 
 *                      type: array
 *                      items:
 *                          type: string
 *                          format: binary
 *                  source: 
 *                      type: array
 *                      description: the source of Recipe
 */
/**
 * @swagger
 *  definitions:
 *      List_Recipe:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      ListOfRecipe:
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
 *                                  region_food:
 *                                      type: string
 *                                      example: "Region_food of Recipe"
 *                                  recipe_number:
 *                                      type: string
 *                                      example: "recipe_number of Recipe"
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
 *  /admin/recipe/create:
 *      post:
 *          tags: [AdminAuthentication_Recipe]
 *          summary: create Recipe document 
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/Create_Recipe'
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
 *  /admin/recipe/list:
 *      get: 
 *          tags: [AdminAuthentication_Recipe]
 *          summary: get listof Recipe without Id
 *          parameters: 
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: text for search in title, short_tex of (Recipe)
 *          responses: 
 *                  201:
 *                      description: success
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/List_Recipe'
 */
/**
 * @swagger 
 *  /admin/recipe/list/{id}:
 *      get: 
 *          tags: [AdminAuthentication_Recipe]
 *          summary: get listof Recipe with Id
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
 *                                  $ref: '#/definitions/List_Recipe'
 */
/**
 * @swagger 
 *  /admin/recipe/update/{id}:
 *      patch:
 *          tags: [AdminAuthentication_Recipe]
 *          summary: upadte recipe document 
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
 *                          $ref: '#/components/schemas/Update_Recipe'
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
 *  /admin/recipe/delete/{id}:
 *      delete:
 *          tags: [AdminAuthentication_Recipe]
 *          summary: delete recipe document 
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