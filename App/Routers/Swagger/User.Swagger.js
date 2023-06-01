/**
 * @swagger
 *  components:
 *      schemas:
 *          Update-Profile:
 *              type: object
 *              properties:
 *                  firstname:
 *                      type: string
 *                      description: the first_name of user
 *                      example: Erfan
 *                  lastname:
 *                      type: string
 *                      description: the last_name of user
 *                      example: Yousefi
 *                  email:
 *                      type: string
 *                      description: the email of user
 *                      example: erfanyousefi@gmail.com
 *                  username:
 *                      type: string
 *                      example: erfanyousefi
 *                      description: the username of user
 *                  birthday:
 *                      type: string
 *                      example: 16/5/1368
 *                      description: the birthday of user
 *                  address:
 *                      type: string
 *                      example: nourr
 *                      description: the address of user
 *                  aboutme:
 *                      type: string
 *                      example: من مهندس هستم
 *                      description: the address of user  
 */
/**
 * @swagger
 *  definitions:
 *      ListOfUsers:
 *          type: object
 *          properties:
 *              statusCode: 
 *                  type: integer
 *                  example: 200
 *              data:
 *                  type: object
 *                  properties:
 *                      users:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                      example: "62822e4ff68cdded54aa928d"
 *                                  first_name:
 *                                      type: string
 *                                      example: "user first_name"
 *                                  last_name:
 *                                      type: string
 *                                      example: "user last_name"
 *                                  username:
 *                                      type: string
 *                                      example: "username"
 *                                  email:
 *                                      type: string
 *                                      example: "the_user_email@example.com"
 *                                  mobile:
 *                                      type: string
 *                                      example: "09332255768"
 *                                  roles:
 *                                      type: string
 *                                      example: "09332255768"
 */

/**
 * @swagger
 *  /admin/user/list:
 *      get:
 *          tags: [AdminAuthentication_User]
 *          summary: get all of users
 *          parameters:
 *              -   in: query
 *                  name: search
 *                  type: string
 *                  description: search in user first_name, last_name, username, mobile, email
 *          responses :
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/definitions/ListOfUsers'
 */

/**
 * @swagger
 *  /admin/user/update-profile:
 *      patch:
 *          tags: [AdminAuthentication_User]
 *          summary: update user detail and profile
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded: 
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *                  multipart/form-data: 
 *                      schema:
 *                          $ref: '#/components/schemas/Update-Profile'
 *          responses:
 *              200:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/PublicDefinition'
 */
/**
 * @swagger
 *  /admin/user/profile:
 *      get:
 *          tags: [AdminAuthentication_User]
 *          summary: get user profile
 *          responses :
 *              200:
 *                  description: success
 */