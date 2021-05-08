import moment from "moment"
import MemberMongo from "../../models/member.model.js"
import PaymentMongo from "../../models/payment.model.js"
import PlanMongo from "../../models/plan.model.js"
import CommonsUtil from "../../utils/commons.util.js"

export default class PaymentController {

    static async create(req, res) {

      const memberEmail = req.body.email
      const member = await MemberMongo.findOne({ email: memberEmail })
      
      if(!member){
        res.json("No existe un socio con el email: " + memberEmail)
        return
      }
      if(member.activePayment && new Date(member.activePayment.end).getTime() >= Date.now()){
        res.json("El socio ya ha realizado un pago actualmente vigente.")
        return
      }
      const plan = PlanMongo.findOne({ name: req.body.subscriptionType})
      if(plan){
        res.json("El plan solicitado no existe.")
        return
      }

      const newPayment = new PaymentMongo({
        memberId : member._id,
        type: req.body.subscriptionType,
        price : plan.price,
        start: moment().format(),
        end: CommonsUtil.getDateFromSubscriptionType(req.body.subscriptionType)
      })

      newPayment.save()
        .catch(err => res.status(500).json('Error: ' + err))

      member.activePayment = newPayment

      member.save()
        .then(() => res.json("Pago realizado con éxito."))
        .catch(err => res.status(500).json('Error: ' + err))
    }
}