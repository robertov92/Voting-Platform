module.exports = db => {
  return async(request, response) => {
      const poll = await db.collection('polls').find({
          userId: request.params.userId
      }).toArray()
      return response.json(poll);
      
  }
}