const noteModel = require('../models/note.model');



// Create and Save a new Note
exports.createNote = async (req, res)=>{
    let document = new noteModel(req.body)
    try{
        let doc = await document.save();
        if(doc){
            res.status(200).send({sucess : true, message : "Note added successfully"});
        }
        else{
            res.status(404).send({sucess : false, message : "Something went wrong"})
        }
    }catch(err){
        return res.status(500).send({sucess : false, message : err.message})
    }
}

// Retrieve and return all notes from the database.
exports.findAll = async (req, res)=>{
    try{
        let docs = await noteModel.find();
        if(docs)
        res.status(201).send({sucess : true, message : docs});
        else
        res.status(401).send({sucess : false, message : "Something went wrong"})
    } catch(err){
        return res.status(500).send({sucess : false, message :err.message})
    }
}

// Find a single note with a noteId
exports.findOne = async (req, res)=>{
    try{
        let note = await noteModel.findById({_id: req.params.id});
        if(note)
        res.status(201).send({sucess : true, note : note});
        else
        res.status(401).send({sucess : false, message : "Not found Product"})
    }catch(err){
        return res.status(500).send({sucess : false, message :err.message})
    }
}


// Update a note identified by the noteId in the request
exports.updateById = async (req, res)=>{
    try{
        let note = await noteModel.findByIdAndUpdate(req.params.id, req.body, {new : true});
        if(note)
        res.status(200).send({sucess: true, message:"Updated sucessfully"});
        else
        res.status(404).send({sucess: false, message: "Product not found"});
    }catch(err){
        return res.status(500).send({sucess: false, message: err.message});
    }
}

// Delete a note with the specified noteId in the request
exports.deleteById = async (req, res) =>{
    try{
        let notes = await noteModel.findByIdAndRemove(req.params.id);
        if(notes)
            res.status(200).send({sucess: true, message : "Deleted Successfully"});
        else
        res.status(401).send({sucess: false, message: "Note not found"});
    }catch(err){
        return res.status(500).send({sucess: false, message: err.message});
    }
}


// exports.create = (req, res)=>{
//     // Validate request
//     if(!req.body.create){
//         return res.status(400).send({message: "Note content can not be empty"});
//     }
//      // Create a Note
//      const note = new Note({
//          title: req.body.title,
//          content: req.body.content
//      });
//      // Save Note in the database
//      note.save()
//      .then(data =>{
//         res.send(data);
//      }).catch(err =>{
//          res.status(500).send({message: err.message})
//      })
// }

// Retrieve and return all notes from the database.
// exports.findAll = (req, res)=>{
//     note.find()
//     .then(notes => {
//         res.send(notes);
//     }).catch(err =>{
//         res.status(500).send({message: err.message})
//     })
// };

// Find a single note with a noteId
// exports.findOne = (req, res)=>{
//     note.findById(req.params.noteId)
//     .then(note =>{
//         if(!note){
//             return res.status(404).send({ message: "Note not found with id " + + req.params.noteId})
//         }
//         res.send(note);
//     }).catch(err =>{
//         if(err.kind === 'ObjectId'){
//             return res.status(404).send({ message:"Note not found with id " + req.params.noteId})
//         }
//     })
//     return res.status(500).send({ message: "Error retrieving note with id " + req.params.noteId})
// };

// // Update a note identified by the noteId in the request
// exports.update = (req, res)=>{
//     // Validate Request
//     if(!req.params.content){
//         return res.status(400).send({ message: "Note content can not be empty"})
//     }
//     // Find note and update it with the request body
//     note.findByIdAndUpdate(req.params.noteId, {title: req.body.title,content: req.body.content}, {new : true})
//     .then(note => {
//         if(!note){
//             return res.status(404).send({message: "Note not found with id " + req.params.noteId})
//         }
//         res.send(note)
//     }).catch(err => {
//         if(err.kind === 'ObjectId'){
//             return res.status(404).send({ message: "Note not found with id " + req.params.noteId})
//         }
//         return res.status(500).send({ message: "Error updating note with id " + req.params.noteId})
//     })

// }

// // Delete a note with the specified noteId in the request
// exports.delete = (req, res)=>{
//     note.findByIdAndRemove(req.params.noteId)
//     .then(note=>{
//         if(!note){
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });
//         }
//         res.send({message: "Note deleted successfully!"});
//     }).catch(err=>{
//         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
//             return res.status(404).send({
//                 message: "Note not found with id " + req.params.noteId
//             });                
//         }
//         return res.status(500).send({
//             message: "Could not delete note with id " + req.params.noteId
//         });
//     })
// };