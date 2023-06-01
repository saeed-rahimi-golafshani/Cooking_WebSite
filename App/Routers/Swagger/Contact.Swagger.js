
/**
 * @swagger
 *  definitions:
 *      ListOfContact:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      contact:
 *                          type: array
 *                          items: 
 *                              type: object
 *                              properties:
 *                                  _id: 
 *                                      type: string
 *                                      example: "644d5a5423e3338c8447d88d"
 *                                  phone: 
 *                                      type: string
 *                                      example: "011-88888888"
 *                                  email:
 *                                      type: string
 *                                      example: "seee@gmail.com"
 *                                  address:
 *                                      type: string
 *                                      example: "مازندران، نور "
 *                                  fax: 
 *                                      type: string
 *                                      example: "011-88888888"  
 *      UpdateOfContact:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      messaege: 
 *                          type: string
 *                          example: "آیتم مورد نظر با موفقیت به روز رسانی شد"
 *      DeleteOfContact:
 *          type: object
 *          properties:
 *              statusCode:     
 *                  type: integer
 *                  example: 200
 *              data: 
 *                  type: object
 *                  properties: 
 *                      messaege: 
 *                          type: string
 *                          example: "آیتم مورد نظر با موفقیت حذف شد"
 */
/**
 * @swagger 
 *  components:
 *      schemas:
 *          CreateContact: 
 *              type: object
 *              required: 
 *                  -   phone
 *                  -   email
 *                  -   address
 *              properties: 
 *                  phone: 
 *                      type: string
 *                      description: the phone of Contact
 *                  email: 
 *                      type: string
 *                      description: the email of Contact
 *                  address: 
 *                      type: string
 *                      description: the address of Contact
 *                  fax: 
 *                      type: string
 *                      description: the fax of Contact
 *          UpdateContact: 
 *              type: object
 *              properties: 
 *                  phone: 
 *                      type: string
 *                      description: the phone of Contact
 *                  email: 
 *                      type: string
 *                      description: the email of Contact
 *                  address: 
 *                      type: string
 *                      description: the address of Contact
 *                  fax: 
 *                      type: string
 *                      description: the fax of Contact
 */
/**
 * @swagger 
 *  /admin/contact/create: 
 *      post: 
 *          tags: [AdminAuthentication_Contact]
 *          summary: create contact In admin panel
 *          description: create contact in admin panel
 *          requestBody:
 *              required: true
 *              content: 
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/CreateContact'             
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateContact'
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
 *  /admin/contact/list: 
 *      get: 
 *          tags: [AdminAuthentication_Contact]
 *          summary: list contact In admin panel
 *          description: list contact in admin panel
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/ListOfContact'            
 */
/**
 * @swagger 
 *  /admin/contact/update/{id}: 
 *      patch: 
 *          tags: [AdminAuthentication_Contact]
 *          summary: update contact In admin panel
 *          description: update contact in admin panel
 *          parameters: 
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true
 *          requestBody:
 *              content:          
 *                  application/x-www-form-urlencoded:
 *                      schema: 
 *                          $ref: '#/components/schemas/UpdateContact'     
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateContact'
 *          responses: 
 *                  200:
 *                      description: OK
 *                      content:
 *                          application/json:
 *                              schema:
 *                                  $ref: '#/definitions/UpdateOfContact'                 
 */
/**
 * @swagger 
 *  /admin/contact/delete/{id}: 
 *      delete: 
 *          tags: [AdminAuthentication_Contact]
 *          summary: delete contact In admin panel
 *          description: delete contact in admin panel
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
 *                                  $ref: '#/definitions/DeleteOfContact'                 
 */