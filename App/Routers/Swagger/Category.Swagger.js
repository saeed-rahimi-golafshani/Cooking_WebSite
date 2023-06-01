/**
 * @swagger 
 *  components:
 *      schemas:
 *          CreateCategory: 
 *              type: object
 *              required: 
 *                  -   title
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of Category
 *                  parent: 
 *                      type: string
 *                      description: the parent of Category
 *          UpdateCategory: 
 *              type: object
 *              properties: 
 *                  title: 
 *                      type: string
 *                      description: the title of category
 */

/**
 * @swagger 
 *  /admin/category/create: 
 *      post: 
 *          tags: [AdminAuthentication_Category]
 *          summary: create category  In admin panel
 *          description: create category in admin panel
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/CreateCategory'             
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateCategory'
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
 *  /admin/category/list:
 *      get: 
 *          tags: [AdminAuthentication_Category]
 *          summary: List Of Category  In admin panel
 *          description: List Of Category in admin panel
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger 
 *  /admin/category/list-all-category:
 *      get: 
 *          tags: [AdminAuthentication_Category]
 *          summary: List Of Category  In admin panel
 *          description: List Of Category in admin panel
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */ 

/**
 * @swagger 
 *  /admin/category/list-child-parent/{parent}:
 *      get: 
 *          tags: [AdminAuthentication_Category]
 *          summary: List Of Category  In admin panel
 *          description: List Of Category in admin panel
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *          responses: 
 *              200:
 *                  description: OK
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/PublicDefinition'
 */ 

 /**
 * @swagger 
 *  /admin/category/update/{id}: 
 *      patch: 
 *          tags: [AdminAuthentication_Category]
 *          summary: update category with Id
 *          description: update category in admin panel
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/UpdateCategory'             
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateCategory'
 *          responses: 
 *                  200:
 *                      description: OK
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
 *  /admin/category/remove/{id}: 
 *      delete: 
 *          tags: [AdminAuthentication_Category]
 *          summary: delete category with Id
 *          description: delete category in admin panel
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
 *                                  $ref: '#/definitions/PublicDefinition'
 */