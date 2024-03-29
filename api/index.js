require('dotenv').config()

const express = require('express')
const { cors, jsonBodyParser } = require('./utils')
const { helloApiHandler, authenticateAdminHandler, registerAdminHandler, updateAdminEmailHandler, updateAdminPasswordHandler, deleteAdminHandler, 
  createUpdateHandler, modifyUpdateHandler, deleteUpdateHandler, toggleUpdateVisibilityHandler, seeUpdateHandler, seeUpdateListHandler,
createEventHandler, modifyEventHandler, deleteEventHandler, toggleEventVisibilityHandler, seeEventHandler, seeEventListHandler,
createLyricPostHandler, modifyLyricPostHandler, deleteLyricPostHandler, toggleLyricPostVisibilityHandler, seeLyricPostHandler, seeLyricPostListHandler,
createMessageHandler, readMessageHandler, deleteMessageHandler, toggleMessageReadHandler, seeMessageListHandler,
addEmailHandler, deleteEmailHandler} = require('./handlers')

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    const api = express()

    api.use(cors)

    api.get('/', helloApiHandler)

    api.post('/admins/auth', jsonBodyParser, authenticateAdminHandler)

    api.post('/admins', jsonBodyParser, registerAdminHandler)

    api.patch('/admins/email', jsonBodyParser, updateAdminEmailHandler)

    api.patch('/admins/password', jsonBodyParser, updateAdminPasswordHandler)

    api.delete('/admins/delete', jsonBodyParser, deleteAdminHandler)

    api.post('/updates', jsonBodyParser, createUpdateHandler)

    api.patch('/updates/:updateId', jsonBodyParser, modifyUpdateHandler)

    api.delete('/updates/:updateId', deleteUpdateHandler)

    api.patch('/updates/:updateId/visibility', toggleUpdateVisibilityHandler)

    api.get('/updates/:updateId', seeUpdateHandler)

    api.get('/updates', seeUpdateListHandler)

    api.post('/events', jsonBodyParser, createEventHandler)

    api.patch('/events/:eventId', jsonBodyParser, modifyEventHandler)

    api.delete('/events/:eventId', deleteEventHandler)

    api.patch('/events/:eventId/visibility', toggleEventVisibilityHandler)

    api.get('/events/:eventId', seeEventHandler)

    api.get('/events', seeEventListHandler)

    api.post('/lyricPosts', jsonBodyParser, createLyricPostHandler)

    api.patch('/lyricPosts/:lyricPostId', jsonBodyParser, modifyLyricPostHandler)

    api.delete('/lyricPosts/:lyricPostId', deleteLyricPostHandler)

    api.patch('/lyricPosts/:lyricPostId/visibility', toggleLyricPostVisibilityHandler)

    api.get('/lyricPosts/:lyricPostId', seeLyricPostHandler)

    api.get('/lyricPosts', seeLyricPostListHandler)

    api.post('/messages', jsonBodyParser, createMessageHandler)

    api.get('/messages/:messageId', readMessageHandler)

    api.delete('/messages/:messageId', deleteMessageHandler)

    api.patch('/messages/:messageId/status', toggleMessageReadHandler)

    api.get('/messages', seeMessageListHandler)

    api.post('/usersData', jsonBodyParser, addEmailHandler)

    api.delete('/usersData', jsonBodyParser, deleteEmailHandler)

    api.listen(process.env.PORT, () => console.log(`server running in port ${process.env.PORT}`))

  })
  .catch(console.error)