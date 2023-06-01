/**
 * @swagger
 *  definitions:
 *      ListOfRegion:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      Region:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "6403548e530901e984e7de91"
 *                                  title:
 *                                      type: string
 *                                      example: "title of Region"
 *      UpdateOfRegion:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      Region:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  messaege: 
 *                                      type: string
 *                                      example: "آیتم مورد نظر با موفقیت به روز رسانی شد" 
 *      DeleteOfRegion:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      Region:
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
 *          Create_City:
 *              type: object
 *              required: 
 *                  -   title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Region(City)
 *          Update_City:
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Region(City)
 */
/**
 * @swagger 
 *  /admin/region_categories/create:
 *      post:
 *          tags: [AdminAuthentication_Region]
 *          summary: create Region document 
 *          consumer: 
 *              -   multipart/form-data
 *              -   application/x-www-form-data-urlencoded
 *          requestBody: 
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:         
 *                          $ref: '#/components/schemas/Create_City'
 *                  application/x-www-form-urlencoded:
 *                      schema:         
 *                          $ref: '#/components/schemas/Create_City'
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
 *  /admin/region_categories/list:
 *      get:
 *          tags: [AdminAuthentication_Region]
 *          summary: get all region 
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfRegion'
 */
/**
 * @swagger 
 *  /admin/region_categories/update/{id}: 
 *      patch: 
 *          tags: [AdminAuthentication_Region]
 *          summary: update Region In admin panel
 *          description: update Region in admin panel
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:              
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/Update_City'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/UpdateOfRegion'                
 */
/**
 * @swagger 
 *  /admin/region_categories/remove/{id}: 
 *      delete: 
 *          tags: [AdminAuthentication_Region]
 *          summary: delete Region In admin panel
 *          description: delete Region in admin panel
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
 *                                  $ref: '#/definitions/DeleteOfRegion'                
 */