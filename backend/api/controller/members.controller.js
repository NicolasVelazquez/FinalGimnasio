import MemberMongo from "../../models/member.model.js"
import Utils from "../../utils/members.utils.js"
import mongoose from "mongoose"

export default class MembersController {

    static async find(req, res) {
      MemberMongo.find()
        .lean()
        .then(members => res.json(members))
        .catch(err => res.status(400).json('Error: ' + err))
    }

    static async findById(req, res) {
      try {
        const member = await MemberMongo.findById(req.params.id).lean();
        if (!member) {
          res.status(404).json('Error: Socio no encontrado.')
        } else {
          res.json(member);
        }
        
      } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de socio inválido.')
        }
      }
    }

    static async create(req, res) {
        const newMember = new MemberMongo()
        Utils.populateMember(newMember, req.body)

        newMember.save()
            .then(() => res.json('¡Socio guardado!'))
            .catch(err => res.status(400).json('Error: ' + err))
    }

    static async update(req, res) {
      try {
        const member = await MemberMongo.findById(req.params.id);
        if (!member) {
          res.status(404).json('Error: Socio no encontrado.')
        } else {
          Utils.populateMember(member, req.body)
          member.save()
            .then(() => res.json('¡Socio actualizado!'))
            .catch(err => res.status(500).json('Error: ' + err))
        }
      } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de socio inválido.')
        }
      }
    }
    
    static async delete(req, res) {
      try {
        const member = await MemberMongo.findById(req.params.id).lean();
        if (!member) {
          res.status(404).json('Error: Socio no encontrado.')
        } else {
          Utils.populateMember(member, req.body)
          MemberMongo.findByIdAndDelete(req.params.id)
            .then(() => res.json('Socio borrado.'))
            .catch(err => res.status(500).json('Error: ' + err))
        }
      } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de socio inválido.')
        }
      }
    }
    
}