/**
 * @swagger
 *  components: 
 *      schemas:
 *          Types:
 *              type: string
 *              enum:
 *                  -   free
 *                  -   cash
 *                  -   special
 */
/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Create_RecipeVideo:
 *              type: object
 *              required: 
 *                  -   title
 *                  -   short_text
 *                  -   text
 *                  -   Image_RecipeVideo
 *                  -   category
 *                  -   tags
 *                  -   region_food
 *                  -   price
 *                  -   discount
 *                  -   type
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of RecipeVideo
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of RecipeVideo
 *                  text: 
 *                      type: string
 *                      description: the text of RecipeVideo
 *                  category: 
 *                      type: string
 *                      description: the category for RecipeVideo
 *                  price: 
 *                      type: number
 *                      description: the price for RecipeVideo
 *                  discount: 
 *                      type: string
 *                      description: the discount for RecipeVideo
 *                  type: 
 *                      $ref: '#/components/schemas/Types'
 *                  region_food:
 *                      type: string
 *                      description: the category for RecipeVideo    
 *                  tags: 
 *                      type: array
 *                      description: the tags of RecipeVideo
 *                  Image_RecipeVideo: 
 *                      type: string
 *                      format: binary
 *                  source: 
 *                      type: array
 *                      description: the source of RecipeVideo
 *          Update_RecipeVideo:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of RecipeVideo
 *                  short_text: 
 *                      type: string
 *                      description: the summery of text of RecipeVideo
 *                  text: 
 *                      type: string
 *                      description: the text of RecipeVideo
 *                  category: 
 *                      type: string
 *                      description: the category for RecipeVideo
 *                  price: 
 *                      type: number
 *                      description: the price for RecipeVideo
 *                  discount: 
 *                      type: string
 *                      description: the discount for RecipeVideo
 *                  type: 
 *                      $ref: '#/components/schemas/Types'
 *                  region_food:
 *                      type: string
 *                      description: the category for RecipeVideo    
 *                  tags: 
 *                      type: array
 *                      description: the tags of RecipeVideo
 *                  Image_RecipeVideo: 
 *                      type: string
 *                      format: binary
 *                  source: 
 *                      type: array
 *                      description: the source of RecipeVideo
 */
/**
 * @swagger 
 *  /admin/recipe_video/create:
 *      post:
 *          tags: [AdminAuthentication_RecipeVideo]
 *          summary: create RecipeVideo document 
 *          consumer: 
 *              -   multipart/form-data
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/Create_RecipeVideo'
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
 *  /admin/recipe_video/list:
 *      get: 
 *          tags: [AdminAuthentication_RecipeVideo]
 *          summary: get listof Recipe Video without Id
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
 *  /admin/recipe_video/list/{id}:
 *      get: 
 *          tags: [AdminAuthentication_RecipeVideo]
 *          summary: get listof Recipe Video with Id
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
 *  /admin/recipe_video/update/{id}:
 *      patch:
 *          tags: [AdminAuthentication_RecipeVideo]
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
 *                          $ref: '#/components/schemas/Update_RecipeVideo'
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
 *  /admin/recipe_video/remove/{id}:
 *      delete:
 *          tags: [AdminAuthentication_RecipeVideo]
 *          summary: delete recipe video document 
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
