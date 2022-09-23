const ContactService = require("../services/contact.service");
const ApiError = require("../api-error");

//Create and save a new contact
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const contactService = new ContactService();
    const contact = await contactService.create(req.body);
    return res.send(contact);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, "An error occurred while creating the contact")
    );
  }
};

// Retrieve all contacts of a user from the database
exports.findAll = async (req, res, next) => {
    let contacts = [];
    try {
        const contactService = new ContactService();
        const { name } = req.query;
        if(name) {
            contacts = await contactService.findByName(name);
        } else{
            contacts = await contactService.all();
        }
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving the contacts')
        );
    }
    return res.send(contacts);
}

// Find a single contact with an id
exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService();
        const contact = await contactService.findById(req.params.id);
        if (!contact){
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send(contact);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        );
    }
};

// Update a contact by the id in the request
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length = 0){
        return next(new ApiError(400, 'Data to update can not be empty'));
    }
    try{
        const contactService = new ContactService();
        const updated = await contactService.update(req.params.id, req.body);
        if(!updated){
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send({
            message: 'Contact was updated successfully'
        });
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving contact with id=${req.params.id}`)
        );
    }
};

// Delete a contact with the specified in the request
exports.delete = async (req, res, next) => {
    try{
        const contactService = new ContactService();
        const deleted = await contactService.delete(req.params.id);
        if(!deleted){
            return next(new ApiError(400, 'Contact not found'));
        }
        return res.send({
            message: 'Contact was deleted successfully'
        });
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, `Error deleting contact with id=${req.params.id}`)
        );
    }
}

// Find all favorite contacts of a user
exports.findAllFavorite = async (req, res, next) => {
    try{
        const contactService = new ContactService();
        const contacts = await contactService.allFavorite();
        return res.send(contacts);
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while retrieving favorite contacts')
        );
    }
};

// Delete all contacts
exports.deleteAll = async (req, res, next) =>{
    try{
        const contactService = new ContactService();
        const deleted = await contactService.deleteAll();
        return res.send({
            message: `${deleted} contacts were deleted successfully`,
        });
    }catch(error){
        console.log(error);
        return next(
            new ApiError(500, 'An error occurred while removing favorite contacts')
        );
    }
};




// exports.create = (req, res) => {
//     return res.send({
//         message: 'create handler'
//     });
// };

// exports.findAll = (req, res) => {
//   return res.send({
//     message: "findAll handler",
//   });
// };

// exports.findOne = (req, res) => {
//   return res.send({
//     message: "findOne handler",
//   });
// };
// exports.update = (req, res) => {
//   return res.send({
//    message: "update handler",
//   });
// };
// exports.delete = (req, res) => {
//   return res.send({
//     message: "delete handler",
//   });
// };
// exports.deleteAll = (req, res) => {
//   return res.send({
//     message: "deleteAll handler",
//   });
// };
// exports.findAllFavorite = (req, res) => {
//   return res.send({
//     message: "findAllFavorite handler",
//   });
// };
