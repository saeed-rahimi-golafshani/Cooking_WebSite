/**
 * @swagger 
 *  components:
 *      schemas: 
 *          Add_Episode:
 *              type: object
 *              required: 
 *                  -   recipevideoId
 *                  -   title
 *                  -   text
 *                  -   Video_Recipe
 *                  -   type
 *              properties:
 *                  recipevideoId: 
 *                      type: string
 *                      description: the recipevideoId
 *                      example: 6403548e530901e984e7de91
 *                  title: 
 *                      type: string
 *                      description: the title of Recipe Episode
 *                      example: session 1
 *                  text:
 *                      type: string
 *                      description: the text of Recipe Episode
 *                      example: the best session
 *                  Video_Recipe: 
 *                      type: string
 *                      description: the file of Recipe Episode Video
 *                      format: binary
 *                  type:
 *                      type: string
 *                      description: the Recipe Episode Type (unlock / lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock     
 *          Edit_Episode:
 *              type: object
 *              properties:
 *                  title: 
 *                      type: string
 *                      description: the title of episode
 *                      example: session 1
 *                  text:
 *                      type: string
 *                      description: the text of episode
 *                      example: the best session
 *                  Video_Recipe: 
 *                      type: string
 *                      description: the file of video
 *                      format: binary
 *                  type:
 *                      type: string
 *                      description: the episode type (unlock / lock)
 *                      enum:
 *                          -   unlock
 *                          -   lock    
 */

/**
 * @swagger 
 *  /admin/recipe_episode/create:
 *      post: 
 *          tags: [AdminAuthentication_RecipeEpisode]
 *          summary: add Episode of Chapter
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Add_Episode'
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/PublicDefinition'                
 */
/**
 * @swagger 
 *  /admin/recipe_episode/update/{episodeId}:
 *      patch: 
 *          tags: [AdminAuthentication_RecipeEpisode]
 *          summary: edit Episode of Chapter
 *          parameters: 
 *              -   in: path
 *                  name: episodeId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  multipart/form-data:
 *                      schema:
 *                          $ref: '#/components/schemas/Edit_Episode'
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/PublicDefinition'                
 */
/**
 * @swagger 
 *  /admin/recipe_episode/remove/{episodeId}:
 *      delete: 
 *          tags: [AdminAuthentication_RecipeEpisode]
 *          summary: delete Episode of Video
 *          parameters: 
 *              -   in: path
 *                  name: episodeId
 *                  type: string
 *                  required: true
 *          responses:
 *              201:
 *                  description: success
 *                  content:
 *                      application/json:
 *                          schema: 
 *                              $ref: '#/definitions/PublicDefinition'                
 */