
const { User, image } = require('../models')

exports.getUser = async (req, res, next, id) => {
    await User.findByPk(id).then(User => {
        if(User){
            req.User = User;
            next()
        }else{
            throw Error
        }
    }).catch(err => {
        return res.status(400).json({
            success: false,
            message: "User does not exists."
        })
    })
}
exports.create = async (req, res) => {
    console.log(req.body)
    console.log(req.file)

    await User.create(req.body).then(User => {
    if (req.file) {
        // imagetypeid: DataTypes.INTEGER,
        imagevalues = {
            path: req.file.path,
            mimetype: req.file.path,
            extra: req.file.path
    }
    let image_value = image.create(imagevalues).then().catch()
    }
        res.status(200).json({
            success: true,
            message: 'User added successfully',
            result: User
        })
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while adding the User',
                Error: error 
            })
        })
}
exports.findOne = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "User fetched successfully.",
            result: req.Users
        })
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Error fetching User.",
            Error: error
        })
    }
}
exports.findAll = async (req, res) => {
    await User.findAll()
    .then(User => {
        if(User.length){
            res.status(200).json({
                success: true,
                message: 'All Users fetched successfully',
                result: User
            })
        } else {
            res.status(400).json({
                success: false,
                message: 'No Users found',
                result: User
            })
        }
    }).catch(error => {
            res.status(400).json({
                success: false,
                message: 'Something went wrong while fetching User',
                Error: error
            })
        })
}
exports.update = async (req, res) => {
    await User.update(req.body, {where: {id: req.params.UserId}})
    .then(User => {
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            result: User
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while updaing User",
            Error: error
        })
    })
}
exports.delete = async (req, res) => {
    await User.destroy({where: {id: req.params.UserId}})
    .then(User => {
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            result: User
        })
    }).catch(error => {
        res.status(400).json({
            success: false,
            message: "Something went wrong while deleting User",
            Error: error
        })
    })
}