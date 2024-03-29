const { validators: { validateId }, errors: {ExistenceError} } = require('com')
const { Administrator, Message } = require('../../data/models')

module.exports = (adminId, messageId) => {
    validateId(adminId, 'administrator id')
    validateId(messageId, 'message id')

    return Administrator.findById(adminId)
    .then(admin => {
        if (!admin) throw new ExistenceError(`Admin does not exist`)
        return Message.findById(messageId)
            .then(message => {
                if (!message) throw new ExistenceError(`This message does not exist`)
                else{
                    return message
                }
            })
    })
}