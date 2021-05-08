import ClassMongo from "../../models/class.model.js"
import MemberMongo from "../../models/member.model.js"
import mongoose from "mongoose"

export default class ClassController {

    static async find(req, res) {
      ClassMongo.find()
        .lean()
        .then(classEntity => res.json(classEntity))
        .catch(err => res.status(500).json('Error: ' + err))
    }

    static async enroll(req, res) {
      const memberEmail = req.body.email
      const member = await MemberMongo.findOne({ email: req.body.email })
      const classEntity = await ClassMongo.findOne({ name: req.body.className })
      
      if(member){
        if(classEntity){
          if(new Date(member.activePayment.end).getTime() >= Date.now()){
            member.classesEnrolled.push(req.body.className)

            member.save()
              .then(() => res.json('¡Socio inscripto a la clase con éxito!'))
              .catch(err => res.status(500).json('Error: ' + err))
          } else {
            res.json(`El socio con el email: ${memberEmail} no ha realizado el pago de la cuota.`)
          }
        } else {
          res.json("La clase especificada no existe.")
        }
      } else {
        res.json("No existe un socio con el email: " + memberEmail)
      }
    }

    static async dropOut(req, res) {
      const memberEmail = req.body.email
      const className = req.body.className
      const member = await MemberMongo.findOne({ email: req.body.email })
      
      if(member){
        if(member.classesEnrolled.some(element => {
          return element === className
        })){
          let pos = member.classesEnrolled.indexOf(className)
          member.classesEnrolled.splice(pos, 1)

          member.save()
            .then(() => res.json("Socio dado de baja de la clase."))
            .catch(err => res.status(500).json('Error: ' + err))
        } else {
          res.json(`El socio con el email: ${memberEmail} no se encuentra inscripto en la clase ${className}`)
        }
      } else {
        res.json("No existe un socio con el email: " + memberEmail)
      }
    }

    static async findById(req, res) {
      try {
        const classEntity = await ClassMongo.findById(req.params.id).lean();
        if (!classEntity) {
          res.status(404).json('Error: Clase no encontrada.')
        } else {
          res.json(classEntity);
        }
        
      } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de la clase inválido.')
        }
      }
    }
    
    static async create(req, res) {
      const newClass = new ClassMongo(req.body)
      newClass.save()
        .then(() => res.json('¡Clase guardada!'))
        .catch(err => res.status(400).json('Error: ' + err))
    }

    static async update(req, res) {
      try {
        const result = await ClassMongo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        // const classEntity = await ClassMongo.findById(req.params.id);
        if (!result) {
          res.status(404).json('Error: Clase no encontrada.')
        }
        res.json('Clase actualizada!')
      } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de clase inválida.')
        }
      }
    }
    
    static async delete(req, res) {
      try {
        const result = await ClassMongo.findByIdAndDelete(req.params.id)
        if (!result) {
          res.status(404).json('Error: Clase no encontrada.')
        }
        res.json('Clase borrada.')
      } catch (error) {
        console.log(error.message);
        if (error instanceof mongoose.CastError) {
          res.status(400).json('Error: Id de clase inválida.')
        }
      }
    }
}