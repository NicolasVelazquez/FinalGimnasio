// import MemberMongo from "../../models/member.model.js"
// import mongoose from "mongoose"

export default class PaymentController {

    static async create(req, res) {
      if(req.body.memberIdExist){
        if(!req.body.memberActive){
          res.json("Pago realizado con éxito.")
        } else {
          res.json("El socio ya ha realizado un pago actualmente vigente.")
        }
      } else {
        res.json("El socio no existe.")
      }
    }
    
}