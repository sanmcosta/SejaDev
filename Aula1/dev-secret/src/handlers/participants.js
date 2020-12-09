const {v4: uuidv4} = require('uuid')

require('../resources/db/connection')()

const SecretModel = require('../resources/db/models/secret')

module.exports.create = async (event,context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const {id: secretId} = event.pathParameters
  const {name,email} = JSON.parse(event.body)
  const externalId = uuidv4()

  try {
    const result = await SecretModel.updateOne(
        {
         externalId: secretId,
         'participants.email'   : {$ne:email}//impede email duplicado
        },
        {
            $push: {//insere o participante no array
                participants: {
                    externalId,
                    name,
                    email,
                }
            }
        }
    )

    if (!result.nModified) {//se não modificou nada, gera exceção silenciosa
        throw new Error()
    }

    return {
        statusCode: 201,
        body: JSON.stringify({
            succes: true,
            id: externalId,
        })
    }
  }catch (error) {
    return {
      statusCode : 500,
      body: JSON.stringify({
        success: false,
        }),
    }
  }
}
module.exports.delete = async (event,context) => {
  context.callbackWaitsForEmptyEventLoop = false

  const {id: secretId,participantId} = event.pathParameters
  const adminKey = event.headers['admin-key']

  try {
     const result = await SecretModel.updateOne(
         {
             externalId: secretId,
             adminKey,
         },
         {
             $pull: {
                 participants: {
                     externalId: participantId,
                 }
             } 
         }
     )

     if (!result.nModified) {
         throw new Error()
     }

     return {
         statusCode: 204,
     }
  }catch (error) {
     return {
       statusCode: 500,
       body: JSON.stringify({
         success: false,
        }),
    }
  }
}